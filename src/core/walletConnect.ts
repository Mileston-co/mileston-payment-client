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
    getUsdtEVMContractAddress
} from './utils';


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

        if (token === 'USDC') {
            tokenAddress = getUsdcEVMContractAddress(env, evm) as `0x${string}`;
            decimals = 6; // USDC typically has 6 decimals
        } else if (token === 'USDT') {
            tokenAddress = getUsdtEVMContractAddress(env, evm) as `0x${string}`;
            decimals = 6; // USDT typically has 6 decimals
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