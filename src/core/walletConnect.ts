import {
    http,
    createPublicClient,
    createWalletClient,
    custom,
    encodeFunctionData,
} from 'viem';
import 'viem/window';
import {
    sepolia,
    mainnet,
    avalanche,
    avalancheFuji,
    polygon,
    polygonAmoy,
    base,
    baseSepolia,
    arbitrum,
    arbitrumSepolia
} from 'viem/chains';
import { env, evmType, PayWithWalletConnect } from '../types';

function getChain(env: env, evm: evmType) {
    const chains = {
        avax: {
            prod: avalanche,
            test: avalancheFuji
        },
        base: {
            prod: base,
            test: baseSepolia
        },
        pol: {
            prod: polygon,
            test: polygonAmoy
        },
        arb: {
            prod: arbitrum,
            test: arbitrumSepolia
        },
        eth: {
            prod: mainnet,
            test: sepolia
        }
    };

    return chains[evm][env];
}

function getUsdcEVMContractAddress(env: env, evm: evmType) {
    const addresses = {
        avax: {
            prod: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
            test: "0x5425890298aed601595a70AB815c96711a31Bc65"
        },
        base: {
            prod: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            test: "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
        },
        pol: {
            prod: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
            test: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582"
        },
        arb: {
            prod: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            test: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
        },
        eth: {
            prod: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            test: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
        }
    };

    return addresses[evm][env];
}

const USDC_ABI = [
    {
        constant: false,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
    },
];

export async function handlePayWithEVMWalletConnect(
    {
        env,
        evm,
        recipientAddress,
        amount,
        token
    }: PayWithWalletConnect
) {
    try {
        const chain = getChain(env, evm);
        console.log("Creating clients....");
        const publicClient = createPublicClient({
            chain,
            transport: http()
        });

        const walletClient = createWalletClient({
            chain,
            transport: custom(window.ethereum!)
        });

        console.log("Requesting connection approval...");
        const [address] = await walletClient.requestAddresses();

        const feePercentage = 0.0004;
        const amountToSend = Number(amount);
        const fee = amountToSend * feePercentage;
        const netAmountToSend = amountToSend - fee;

        let tokenAddress: `0x${string}` | null = null;
        let decimals = 18; // Default to 18 decimals for native tokens

        if (token === 'USDC' || token === 'USDT') {
            tokenAddress = getUsdcEVMContractAddress(env, evm) as `0x${string}`;
            decimals = 6; // USDC and USDT typically have 6 decimals
        }

        const netAmountToSendInWei = BigInt(netAmountToSend * 10 ** decimals);
        const feeInWei = BigInt(fee * 10 ** decimals);
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
                hash: receipt1.transactionHash,
                payerAddress: address
            };
        } else if (token === 'USDC' || token === 'USDT') {
            console.log("Encoding data for token transfer...");

            const data1 = encodeFunctionData({
                abi: USDC_ABI,
                functionName: 'transfer',
                args: [recipientAddress, netAmountToSendInWei],
            });

            const data2 = encodeFunctionData({
                abi: USDC_ABI,
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
                hash: receipt1.transactionHash,
                payerAddress: address
            };
        } else {
            throw new Error(`Unsupported token type: ${token}`);
        }
    } catch (error: any) {
        console.log("An error occurred while performing transaction with EVM wallet connect", error.message);
        throw error;
    }
}