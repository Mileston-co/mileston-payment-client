import {
    http,
    createPublicClient,
    createWalletClient,
    custom,
    encodeFunctionData,
    decodeEventLog,
} from 'viem';
import 'viem/window';
import { PayWithWalletConnect } from '../types';
import { 
    getChain, 
    getUsdcEVMContractAddress, 
    usdcABI,
    usdtABI,
    getUsdtEVMContractAddress,
    getTokenPriceUSD,
    getEfficientPayProxyContractAddress,
    efficientPayAbi
} from './utils';

/**
 * Handles payment transactions using EVM-compatible wallets via WalletConnect.
 * Uses the EfficientPay smart contract for unified payment processing.
 * Supports both native tokens (e.g., AVAX, POL, ETH) and ERC-20 tokens (e.g., USDC, USDT).
 *
 * @param {PayWithWalletConnect} params - The payment parameters.
 * @param {string} params.env - The environment (e.g., "test", "prod").
 * @param {string} params.evm - The EVM chain identifier (e.g., "eth", "pol").
 * @param {string} params.recipientAddress - The recipient's wallet address.
 * @param {string} params.amount - The amount to send (in USD for native tokens, token units for ERC-20).
 * @param {string} params.token - The token type (e.g., "AVAX", "ETH", "USDC", "USDT").
 *
 * @returns {Promise<{ txHash: string; feeHash: string; payerAddress: string }>} - A promise that resolves with the transaction hash and payer's address.
 *
 * @throws {Error} - Throws an error if the transaction fails or an unsupported token type is provided.
 *
 * @remarks
 * - Uses the EfficientPay smart contract's `pay` function for all transactions.
 * - For native tokens, sends the transaction with value and uses zero address as tokenIn.
 * - For ERC-20 tokens, sends the transaction without value and uses the token contract address.
 * - The smart contract handles fee calculation and distribution internally.
 * - The function uses the `viem` library for interacting with the blockchain.
 *
 * @example
 * ```typescript
 * const result = await handlePayWithEVMWalletConnect({
 *     env: "prod",
 *     evm: "eth",
 *     recipientAddress: "0xRecipientAddress",
 *     amount: "100",
 *     token: "USDC"
 * });
 * console.log(result.txHash, result.payerAddress);
 * ```
 */

// Utility to calculate gas price in wei to target a specific USD fee
async function getUsdTargetGasPrice({
    targetUsd,
    gasEstimate,
    token,
}: { targetUsd: number, gasEstimate: bigint, token: string }) {
    const price = await getTokenPriceUSD(token);
    if (!price) return undefined;
    const gasPriceInEth = targetUsd / (Number(gasEstimate) * price);
    return BigInt(Math.floor(gasPriceInEth * 1e18));
}

// Utility to get EIP-1559 params
function getEIP1559Params(latestBlock: any, customGasPrice?: bigint) {
    if (customGasPrice) {
        return {
            maxFeePerGas: customGasPrice,
            maxPriorityFeePerGas: customGasPrice,
        };
    }
    const maxPriorityFeePerGas = BigInt(1500000000); // 1.5 gwei
    return {
        maxFeePerGas: latestBlock.baseFeePerGas + maxPriorityFeePerGas,
        maxPriorityFeePerGas,
    };
}

export async function handlePayWithEVMWalletConnect({
    env,
    evm,
    recipientAddress,
    amount,
    token,
}: PayWithWalletConnect): Promise<{ txHash: string; feeHash: string; payerAddress: string }> {
    let hasRetriedChainSwitch = false;
    async function runPaymentFlow(): Promise<{ txHash: string; feeHash: string; payerAddress: string }> {
        // Validate input parameters
        if (!env || !evm || !recipientAddress || !amount || !token) {
            throw new Error("Missing required parameters. Please provide env, evm, recipientAddress, amount, and token.");
        }

        if (!window.ethereum) {
            throw new Error("No Ethereum wallet detected. Please install MetaMask or another Web3 wallet.");
        }

        const chain = getChain(env, evm);
        console.log("Creating clients....");
        const publicClient = createPublicClient({
            chain,
            transport: http(),
        });

        const walletClient = createWalletClient({
            chain,
            transport: custom(window.ethereum!),
        });

        console.log("Requesting connection approval...");
        const [address] = await walletClient.requestAddresses();
        
        if (!address) {
            throw new Error("Failed to get wallet address. Please ensure your wallet is connected.");
        }

        // Get the EfficientPay contract address
        const efficientPayAddress = getEfficientPayProxyContractAddress(env, evm);
        console.log("EfficientPay contract address:", efficientPayAddress);

        // Validate amount
        const amountNumber = Number(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
            throw new Error("Invalid amount. Please provide a positive number.");
        }

        // Determine token address and amount
        let tokenInAddress: `0x${string}`;
        let amountInWei: bigint;
        let decimals = 18; // Default for native tokens

        if (token === 'USDC') {
            tokenInAddress = getUsdcEVMContractAddress(env, evm) as `0x${string}`;
            if (!tokenInAddress) {
                throw new Error(`USDC is not supported on ${evm} chain in ${env} environment.`);
            }
            decimals = 6;
            amountInWei = BigInt(Math.round(amountNumber * 10 ** decimals));
        } else if (token === 'USDT') {
            tokenInAddress = getUsdtEVMContractAddress(env, evm) as `0x${string}`;
            if (!tokenInAddress) {
                throw new Error(`USDT is not supported on ${evm} chain in ${env} environment.`);
            }
            decimals = 6;
            amountInWei = BigInt(Math.round(amountNumber * 10 ** decimals));
        } else if (token === 'AVAX' || token === 'POL' || token === 'ETH') {
            // For native tokens, use the zero address
            tokenInAddress = '0x0000000000000000000000000000000000000000' as `0x${string}`;
            
            // Convert USD amount to token amount
            const price = await getTokenPriceUSD(token);
            if (!price) {
                throw new Error(`Unable to fetch price for ${token}. Please try again later or contact support.`);
            }
            
            const amountInToken = amountNumber / price;
            amountInWei = BigInt(Math.round(amountInToken * 10 ** decimals));
        } else {
            throw new Error(`Unsupported token type: ${token}. Supported tokens are: AVAX, POL, ETH, USDC, USDT.`);
        }

        console.log("Token address:", tokenInAddress);
        console.log("Amount in Wei:", amountInWei.toString());

        let approvalGasEstimate: bigint | undefined = undefined;
        // Removed unused vars after DRY refactor

        // For ERC-20 tokens, check and approve allowance
        if (token === 'USDC' || token === 'USDT') {
            console.log("Checking token allowance...");
            
            try {
                // Get token contract
                const tokenContract = {
                    address: tokenInAddress,
                    abi: token === 'USDC' ? usdcABI : usdtABI,
                } as const;
                
                // Check current allowance
                const allowance = await publicClient.readContract({
                    ...tokenContract,
                    functionName: 'allowance',
                    args: [address, efficientPayAddress as `0x${string}`],
                }) as bigint;
                
                console.log("Current allowance:", allowance.toString());
                
                // If allowance is insufficient, approve
                if (allowance < amountInWei) {
                    console.log("Insufficient allowance. Approving tokens...");
                    
                    const approveData = encodeFunctionData({
                        abi: token === 'USDC' ? usdcABI : usdtABI,
                        functionName: 'approve',
                        args: [efficientPayAddress as `0x${string}`, amountInWei],
                    });
                    
                    // Estimate gas for approval
                    approvalGasEstimate = await publicClient.estimateGas({
                        account: address,
                        to: tokenInAddress,
                        data: approveData,
                    });
                    // Detect EIP-1559 support
                    const latestBlock = await publicClient.getBlock({ blockTag: 'latest' });
                    // --- Approval (EIP-1559 logic) ---
                    let approvalGasParams: any = {};
                    if (evm === 'eth') {
                        const targetUsd = 0.60;
                        const gasPrice = await getUsdTargetGasPrice({
                            targetUsd,
                            gasEstimate: approvalGasEstimate,
                            token: 'ETH',
                        });
                        if (gasPrice) {
                            approvalGasParams = getEIP1559Params(latestBlock, gasPrice);
                        }
                    } else if ('baseFeePerGas' in latestBlock && latestBlock.baseFeePerGas) {
                        approvalGasParams = getEIP1559Params(latestBlock);
                    } else {
                        approvalGasParams.gasPrice = await publicClient.getGasPrice();
                    }
                    // Send approval transaction with suggested gas
                    const approveTxParams: any = {
                        account: address,
                        to: tokenInAddress,
                        data: approveData,
                        gas: approvalGasEstimate,
                        ...approvalGasParams,
                    };
                    const approveHash = await walletClient.sendTransaction(approveTxParams);
                    
                    console.log("Approval transaction hash:", approveHash);
                    
                    try {
                        await publicClient.waitForTransactionReceipt({ hash: approveHash });
                        console.log("Approval confirmed!");
                    } catch (approvalError) {
                        throw new Error(`Token approval failed. Please try again. Error: ${approvalError instanceof Error ? approvalError.message : 'Unknown error'}`);
                    }
                } else {
                    console.log("Sufficient allowance already exists.");
                }
            } catch (allowanceError) {
                throw new Error(`Failed to check token allowance. Please ensure you have sufficient ${token} balance. Error: ${allowanceError instanceof Error ? allowanceError.message : 'Unknown error'}`);
            }
        }

        // Encode the pay function call
        const payData = encodeFunctionData({
            abi: efficientPayAbi,
            functionName: 'pay',
            args: [
                recipientAddress as `0x${string}`, // merchant
                tokenInAddress, // tokenIn
                amountInWei, // amountIn
                BigInt(0) // minAmountOut (set to 0 for now)
            ],
        });

        // Estimate gas for payment
        const paymentGasEstimate = await publicClient.estimateGas({
            account: address,
            to: efficientPayAddress as `0x${string}`,
            data: payData,
            value: token === 'AVAX' || token === 'POL' || token === 'ETH' ? amountInWei : BigInt(0),
        });
        // Detect EIP-1559 support for payment
        const latestBlock = await publicClient.getBlock({ blockTag: 'latest' });
        let paymentGasParams: any = {};
        if (evm === 'eth') {
            const targetUsd = 0.60;
            const gasPrice = await getUsdTargetGasPrice({
                targetUsd,
                gasEstimate: paymentGasEstimate,
                token: 'ETH',
            });
            if (gasPrice) {
                paymentGasParams = getEIP1559Params(latestBlock, gasPrice);
            }
        } else if ('baseFeePerGas' in latestBlock && latestBlock.baseFeePerGas) {
            paymentGasParams = getEIP1559Params(latestBlock);
        } else {
            paymentGasParams.gasPrice = await publicClient.getGasPrice();
        }
        // Send the payment transaction with suggested gas
        const paymentTxParams: any = {
            account: address,
            to: efficientPayAddress as `0x${string}`,
            data: payData,
            value: token === 'AVAX' || token === 'POL' || token === 'ETH' ? amountInWei : BigInt(0),
            gas: paymentGasEstimate,
            ...paymentGasParams,
        };
        const hash = await walletClient.sendTransaction(paymentTxParams);

        console.log("Transaction hash:", hash);
        console.log("Awaiting receipt...");

        try {
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            console.log("Transaction confirmed!");
            
            // Get the custom txHash from the PaymentProcessed event
            const contract = {
                address: efficientPayAddress as `0x${string}`,
                abi: efficientPayAbi,
            } as const;

            // Decode the PaymentProcessed event from the transaction logs
            const logs = receipt.logs;
            let customTxHash: string | null = null;

            for (const log of logs) {
                try {
                    const decodedLog = decodeEventLog({
                        abi: efficientPayAbi,
                        data: log.data,
                        topics: log.topics,
                    });

                    if (decodedLog.eventName === 'PaymentProcessed') {
                        customTxHash = (decodedLog.args as any).txHash as string;
                        console.log("Custom txHash from event:", customTxHash);
                        break;
                    }
                } catch (error) {
                    // Skip logs that can't be decoded
                    continue;
                }
            }

            if (!customTxHash) {
                console.warn("Could not find PaymentProcessed event, using blockchain transaction hash");
                customTxHash = receipt.transactionHash;
            }
            
            return {
                txHash: customTxHash, // Use the custom txHash from contract
                feeHash: receipt.transactionHash, // Blockchain transaction hash for fee tracking
                payerAddress: address,
            };
        } catch (receiptError) {
            throw new Error(`Transaction was sent but confirmation failed. Hash: ${hash}. Please check your wallet for transaction status. Error: ${receiptError instanceof Error ? receiptError.message : 'Unknown error'}`);
        }
    }
    try {
        return await runPaymentFlow();
    } catch (transactionError) {
        // Detect chain/network mismatch error
        const errMsg = transactionError instanceof Error ? transactionError.message : String(transactionError);
        if (
            !hasRetriedChainSwitch &&
            (errMsg.includes('chain') || errMsg.includes('network') || errMsg.includes('wrong chain') || errMsg.includes('Unsupported chain') || errMsg.includes('wallet_addEthereumChain'))
        ) {
            hasRetriedChainSwitch = true;
            // Try to switch chain
            try {
                // Get the correct chainId from getChain
                const chain = getChain(env, evm);
                const chainIdHex = '0x' + chain.id.toString(16);
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainIdHex }],
                });
                // Retry the payment flow once
                return await runPaymentFlow();
            } catch (switchError) {
                throw new Error(
                    'You are connected to the wrong network in your wallet. Please switch to the correct network and try again.'
                );
            }
        }
        if (transactionError instanceof Error) {
            if (transactionError.message.includes('insufficient funds')) {
                throw new Error(`Insufficient ${token} balance. Please ensure you have enough tokens to complete the transaction.`);
            } else if (transactionError.message.includes('user rejected')) {
                throw new Error("Transaction was rejected by the user. Please try again.");
            } else if (transactionError.message.includes('network')) {
                throw new Error("Network error. Please check your internet connection and try again.");
            } else {
                throw new Error(`Transaction failed: ${transactionError.message}`);
            }
        } else {
            throw new Error("Transaction failed with an unknown error. Please try again.");
        }
    }
}
