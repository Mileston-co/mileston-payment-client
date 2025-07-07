import {
    http,
    createPublicClient,
    createWalletClient,
    custom,
    encodeFunctionData,
} from 'viem';
import 'viem/window';
import { PayWithWalletConnect } from '../types';
import { 
    getChain, 
    getUsdcEVMContractAddress, 
    usdcABI,
    usdtABI,
    getUsdtEVMContractAddress,
    getTokenPriceUSD
} from './utils';

/**
 * Handles payment transactions using EVM-compatible wallets via WalletConnect.
 * Supports both native tokens (e.g., AVAX, POL, ETH) and ERC-20 tokens (e.g., USDC, USDT).
 *
 * @param {PayWithWalletConnect} params - The payment parameters.
 * @param {string} params.env - The environment (e.g., "test", "prod").
 * @param {string} params.evm - The EVM chain identifier (e.g., "eth", "pol").
 * @param {string} params.recipientAddress - The recipient's wallet address.
 * @param {string} params.amount - The amount to send (in token units, not Wei).
 * @param {string} params.token - The token type (e.g., "AVAX", "ETH", "USDC", "USDT").
 *
 * @returns {Promise<{ txHash: string; feeHash: string; payerAddress: string }>} - A promise that resolves with the transaction hash and payer's address.
 *
 * @throws {Error} - Throws an error if the transaction fails or an unsupported token type is provided.
 *
 * @remarks
 * - For native tokens, two transactions are sent: one to the recipient and one for the fee.
 * - For ERC-20 tokens, two token transfer transactions are encoded and sent.
 * - The fee is calculated as 0.04% of the total amount.
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
 * console.log(result.txhash, result.payerAddress);
 * ```
 */

export async function handlePayWithEVMWalletConnect({
    env,
    evm,
    recipientAddress,
    amount,
    token,
}: PayWithWalletConnect): Promise<{ txHash: string; feeHash: string; payerAddress: string }> {
    try {
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

        const feePercentage = 0.004;
        const amountInUSD = Number(amount);
        const feeInUSD = amountInUSD * feePercentage;
        const netAmountInUSD = amountInUSD - feeInUSD;

        let tokenAddress: `0x${string}` | null = null;
        let decimals = 18; // Default to 18 decimals for native tokens
        let netAmountToSendInWei: bigint;
        let feeInWei: bigint;

        if (token === 'USDC') {
            tokenAddress = getUsdcEVMContractAddress(env, evm) as `0x${string}`;
            decimals = 6; // USDC typically has 6 decimals
            // Fix floating-point precision issues for USDC
            const netAmountInWei = Math.round(netAmountInUSD * 10 ** decimals);
            const feeAmountInWei = Math.round(feeInUSD * 10 ** decimals);
            netAmountToSendInWei = BigInt(netAmountInWei);
            feeInWei = BigInt(feeAmountInWei);
        } else if (token === 'USDT') {
            tokenAddress = getUsdtEVMContractAddress(env, evm) as `0x${string}`;
            decimals = 6; // USDT typically has 6 decimals
            // Fix floating-point precision issues for USDT
            const netAmountInWei = Math.round(netAmountInUSD * 10 ** decimals);
            const feeAmountInWei = Math.round(feeInUSD * 10 ** decimals);
            netAmountToSendInWei = BigInt(netAmountInWei);
            feeInWei = BigInt(feeAmountInWei);
        } else if (token === 'AVAX' || token === 'POL' || token === 'ETH') {
            // Fetch token price in USD
            const price = await getTokenPriceUSD(token);
            if (!price) {
                throw new Error(`Unable to fetch price for token: ${token}`);
            }

            const netAmountInToken = netAmountInUSD / price;
            const feeInToken = feeInUSD / price;

            // Fix floating-point precision issues by using a more robust approach
            const netAmountInWei = Math.round(netAmountInToken * 10 ** decimals);
            const feeAmountInWei = Math.round(feeInToken * 10 ** decimals);
            
            netAmountToSendInWei = BigInt(netAmountInWei);
            feeInWei = BigInt(feeAmountInWei);
        } else {
            throw new Error(`Unsupported token type: ${token}`);
        }

        console.log({ feeInWei, netAmountToSendInWei });

        const feeWalletAddress = "0xEC891A037F932493624184970a283ab87398e0A6";

        if (token === 'AVAX' || token === 'POL' || token === 'ETH') {
            console.log("Sending native token transaction...");

            const hash1 = await walletClient.sendTransaction({
                account: address,
                to: recipientAddress as `0x${string}`,
                value: netAmountToSendInWei,
            });

            console.log({ hash1 });
            console.log("Sending fee transaction...");

            const hash2 = await walletClient.sendTransaction({
                account: address,
                to: feeWalletAddress,
                value: feeInWei,
            });

            console.log({ hash2 });
            console.log("Awaiting receipts...");

            const receipt1 = await publicClient.waitForTransactionReceipt({ hash: hash1 });
            const receipt2 = await publicClient.waitForTransactionReceipt({ hash: hash2 });

            console.log("Receipts received...");
            return {
                txHash: receipt1.transactionHash,
                feeHash: receipt2.transactionHash,
                payerAddress: address,
            };
        } else if (token === 'USDC' || token === 'USDT') {
            console.log("Encoding data for token transfer...");

            const abi = token === 'USDC' ? usdcABI : usdtABI;

            const data1 = encodeFunctionData({
                abi,
                functionName: 'transfer',
                args: [recipientAddress, netAmountToSendInWei],
            });

            const data2 = encodeFunctionData({
                abi,
                functionName: 'transfer',
                args: [feeWalletAddress, feeInWei],
            });

            console.log("Sending first token transaction...");

            const hash1 = await walletClient.sendTransaction({
                account: address,
                to: tokenAddress!,
                data: data1,
            });

            console.log({ hash1 });
            console.log("Sending second token transaction...");

            const hash2 = await walletClient.sendTransaction({
                account: address,
                to: tokenAddress!,
                data: data2,
            });

            console.log({ hash2 });
            console.log("Awaiting receipts...");

            const receipt1 = await publicClient.waitForTransactionReceipt({ hash: hash1 });
            const receipt2 = await publicClient.waitForTransactionReceipt({ hash: hash2 });

            console.log("Receipts received...");
            return {
                txHash: receipt1.transactionHash,
                feeHash: receipt2.transactionHash,
                payerAddress: address,
            };
        } else {
            throw new Error(`Unsupported token type: ${token}`);
        }
    } catch (error: any) {
        console.log("An error occurred while performing transaction with EVM wallet connect", error.message);
        throw error;
    }
}
