import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, createAssociatedTokenAccountInstruction, getAccount } from '@solana/spl-token';
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
            if (!publicKey) throw new Error('Wallet not connected');

            const parsedUSDAmount = parseFloat(amount);
            if (isNaN(parsedUSDAmount) || parsedUSDAmount <= 0) throw new Error("Invalid amount");

            const feePercentage = 0.004; // 0.4%
            const feeInUSD = parsedUSDAmount * feePercentage;
            const netAmountInUSD = parsedUSDAmount - feeInUSD;

            const feeWalletAddress = new PublicKey("3aqGrakv3GVEGjswyLwSa9CrDu7dYTZS1WxoLKctn4ZK");
            const recipientPubkey = new PublicKey(recipientWalletAddress);

            let transaction = new Transaction();

            if (token === 'SOL') {
                // Convert USD to SOL
                const solPrice = await getTokenPriceUSD('SOL');
                if (!solPrice) throw new Error('Failed to get SOL price');

                const netAmountInSOL = netAmountInUSD / solPrice;
                const feeInSOL = feeInUSD / solPrice;

                // Native SOL transfer
                const amountInLamports = Math.round(netAmountInSOL * LAMPORTS_PER_SOL);
                const feeInLamports = Math.round(feeInSOL * LAMPORTS_PER_SOL);

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
                // SPL Token transfer (USDC/USDT)
                const tokenMint = new PublicKey(getSolanaTokenAddress(env, token));
                const decimals = 6; // Both USDC and USDT use 6 decimals
                
                const amountInSmallestUnit = Math.round(netAmountInUSD * 10 ** decimals);
                const feeInSmallestUnit = Math.round(feeInUSD * 10 ** decimals);

                // Get or create sender's token account
                const senderTokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
                
                // Get or create recipient's token account
                const recipientTokenAccount = await getAssociatedTokenAddress(tokenMint, recipientPubkey);
                
                // Get or create fee wallet's token account
                const feeTokenAccount = await getAssociatedTokenAddress(tokenMint, feeWalletAddress);

                // Check if recipient's token account exists
                const recipientAccountInfo = await connection.getAccountInfo(recipientTokenAccount);
                if (!recipientAccountInfo) {
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
                const feeAccountInfo = await connection.getAccountInfo(feeTokenAccount);
                if (!feeAccountInfo) {
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
                const senderAccount = await getAccount(connection, senderTokenAccount);
                if (BigInt(senderAccount.amount) < BigInt(amountInSmallestUnit + feeInSmallestUnit)) {
                    throw new Error('Insufficient token balance');
                }

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

            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const signature = await sendTransaction(transaction, connection);
            
            // Wait for confirmation with timeout and blockhash validity check
            const confirmation = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight
            });

            if (confirmation.value.err) {
                throw new Error('Transaction failed to confirm');
            }

            return {
                payerAddress: publicKey.toString(),
                transactionHash: signature,
                feeHash: signature // Same transaction contains both transfers
            };
        } catch (error: any) {
            console.error("Transaction error:", error);
            disconnect();
            throw error;
        }
    };

    return { handleSolanaPayment };
}; 