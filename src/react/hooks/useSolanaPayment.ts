import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Signer } from '@solana/web3.js';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, getAccount, createTransferInstruction } from '@solana/spl-token';
import { env } from '@/types/core';
import { getSolanaTokenAddress, getTokenPriceUSD } from '@/core/utils';

export const useSolanaPayment = (env: env) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, disconnect } = useWallet();

    const handleSolanaPayment = async ({
        amount,
        recipientWalletAddress,
        token = 'SOL'
    }: {
        amount: string;
        recipientWalletAddress: string;
        token?: 'SOL' | 'USDC' | 'USDT';
    }): Promise<{ payerAddress: string; transactionHash: string; feeHash: string }> => {
        try {
            console.log('Starting Solana payment process...');
            if (!publicKey) throw new Error('Wallet not connected');

            const parsedUSDAmount = parseFloat(amount);
            if (isNaN(parsedUSDAmount) || parsedUSDAmount <= 0) throw new Error("Invalid amount");
            console.log('Parsed USD amount:', parsedUSDAmount);

            const feePercentage = 0.004; // 0.4%
            const feeInUSD = parsedUSDAmount * feePercentage;
            const netAmountInUSD = parsedUSDAmount - feeInUSD;
            console.log('Fee in USD:', feeInUSD);
            console.log('Net amount in USD:', netAmountInUSD);

            const feeWalletAddress = new PublicKey("3aqGrakv3GVEGjswyLwSa9CrDu7dYTZS1WxoLKctn4ZK");
            const recipientPubkey = new PublicKey(recipientWalletAddress);
            console.log('Recipient address:', recipientWalletAddress);
            console.log('Fee wallet address:', feeWalletAddress.toString());

            let transaction = new Transaction();

            if (token === 'SOL') {
                console.log('Processing native SOL transfer...');
                // Convert USD to SOL
                const solPrice = await getTokenPriceUSD('SOL');
                if (!solPrice) throw new Error('Failed to get SOL price');
                console.log('Current SOL price:', solPrice);

                const netAmountInSOL = netAmountInUSD / solPrice;
                const feeInSOL = feeInUSD / solPrice;
                console.log('Net amount in SOL:', netAmountInSOL);
                console.log('Fee in SOL:', feeInSOL);

                // Native SOL transfer
                const amountInLamports = Math.round(netAmountInSOL * LAMPORTS_PER_SOL);
                const feeInLamports = Math.round(feeInSOL * LAMPORTS_PER_SOL);
                console.log('Amount in lamports:', amountInLamports);
                console.log('Fee in lamports:', feeInLamports);

                transaction.add(
                    SystemProgram.transfer({
                        fromPubkey: publicKey,
                        toPubkey: recipientPubkey,
                        lamports: amountInLamports,
                    }),
                    SystemProgram.transfer({
                        fromPubkey: publicKey,
                        toPubkey: feeWalletAddress,
                        lamports: feeInLamports,
                    })
                );
            } else {
                console.log(`Processing ${token} token transfer...`);
                // SPL Token transfer (USDC/USDT)
                const tokenMint = new PublicKey(getSolanaTokenAddress(env, token));
                console.log('Token mint address:', tokenMint.toString());
                const decimals = 6; // Both USDC and USDT use 6 decimals

                const amountInSmallestUnit = Math.round(netAmountInUSD * 10 ** decimals);
                const feeInSmallestUnit = Math.round(feeInUSD * 10 ** decimals);
                console.log('Amount in smallest unit:', amountInSmallestUnit);
                console.log('Fee in smallest unit:', feeInSmallestUnit);

                // Get or create sender's token account
                const senderTokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
                console.log('Sender token account:', senderTokenAccount.toString());

                // Get or create recipient's token account
                const recipientTokenAccount = await getAssociatedTokenAddress(tokenMint, recipientPubkey);
                console.log('Recipient token account:', recipientTokenAccount.toString());

                // Get or create fee wallet's token account
                const feeTokenAccount = await getAssociatedTokenAddress(tokenMint, feeWalletAddress);
                console.log('Fee wallet token account:', feeTokenAccount.toString());

                // Check if recipient's token account exists
                console.log('Checking if recipient token account exists...');
                const recipientAccountInfo = await connection.getAccountInfo(recipientTokenAccount);
                if (!recipientAccountInfo) {
                    console.log('Creating recipient token account...');
                    transaction.add(
                        createAssociatedTokenAccountInstruction(
                            publicKey,
                            recipientTokenAccount,
                            recipientPubkey,
                            tokenMint
                        )
                    );
                }

                // Check if fee wallet's token account exists
                console.log('Checking if fee wallet token account exists...');
                const feeAccountInfo = await connection.getAccountInfo(feeTokenAccount);
                if (!feeAccountInfo) {
                    console.log('Creating fee wallet token account...');
                    transaction.add(
                        createAssociatedTokenAccountInstruction(
                            publicKey,
                            feeTokenAccount,
                            feeWalletAddress,
                            tokenMint
                        )
                    );
                }

                // Verify sender has enough tokens
                console.log('Verifying sender token balance...');
                const senderAccount = await getAccount(connection, senderTokenAccount);
                if (BigInt(senderAccount.amount) < BigInt(amountInSmallestUnit + feeInSmallestUnit)) {
                    throw new Error('Insufficient token balance');
                }
                console.log('Sender has sufficient balance');

                // Use transfer instruction from SPL token library
                transaction.add(
                    createTransferInstruction(
                        senderTokenAccount,
                        recipientTokenAccount,
                        publicKey,
                        amountInSmallestUnit
                    ),
                    createTransferInstruction(
                        senderTokenAccount,
                        feeTokenAccount,
                        publicKey,
                        feeInSmallestUnit
                    )
                );
            }

            console.log('Getting latest blockhash...');
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            console.log('Sending transaction...');
            const signature = await sendTransaction(transaction, connection);
            console.log('Transaction sent with signature:', signature);

            // Wait for confirmation with timeout and blockhash validity check
            console.log('Waiting for transaction confirmation...');
            const confirmation = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight
            });

            if (confirmation.value.err) {
                throw new Error('Transaction failed to confirm');
            }
            console.log('Transaction confirmed successfully');

            return {
                payerAddress: publicKey.toString(),
                transactionHash: signature,
                feeHash: signature // Same transaction contains both transfers
            };
        } catch (error: any) {
            console.error("Transaction error:", error);
            throw error;
        } finally {
            disconnect();
        }
    };

    return { handleSolanaPayment };
}; 