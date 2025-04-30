import { 
    useSuiClient, 
    useCurrentAccount, 
    useDisconnectWallet, 
    useSignAndExecuteTransaction 
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/dist/cjs/transactions';
import { getUSDContractAddress } from './utils';
import { env } from '@/types/core';

export const useSuiPayment = (env: env) => {
  const currentAccount = useCurrentAccount();
  const suiClient = useSuiClient();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });

  const handleSuiPayment = async ({
    amount,
    recipientWalletAddress,
  }: {
    amount: string;
    recipientWalletAddress: string;
  }): Promise<{ payerAddress: string; transactionHash: string }> => {
    try {
      if (!currentAccount?.address) throw new Error('Sender wallet not connected');

      console.log("Fetching sender balance from the chain...");

      const { data: coins } = await suiClient.getCoins({
        owner: currentAccount.address,
        coinType: getUSDContractAddress(env),
      });

      const totalBalance = coins.reduce((sum, coin) => sum + parseFloat(coin.balance), 0);
      console.log("Sender coins fetched:", totalBalance);

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) throw new Error("Invalid amount.");
      const checkAmount = BigInt(Math.round(parsedAmount * 10 ** 6));

      const feePercentage = BigInt(4);
      const transactionFee = (checkAmount * feePercentage) / BigInt(1000);
      const amountToSend = checkAmount - transactionFee;

      if (BigInt(totalBalance) < amountToSend + transactionFee)
        throw new Error("Insufficient balance.");

      const feeWallet = "0xb89b50254fe28d9f3f6a57ef54597ac1fe531c9bc038e54b59752f37bb36bcfa";

      const tx = new Transaction();
      const [coin1, coin2] = tx.splitCoins(coins[0].coinObjectId, [amountToSend, transactionFee]);
      tx.transferObjects([coin1], recipientWalletAddress);
      tx.transferObjects([coin2], feeWallet);

      return new Promise((resolve, reject) => {
        signAndExecuteTransaction(
          {
            transaction: tx,
            chain: env === 'test' ? 'sui:testnet' : 'sui:mainnet',
          },
          {
            onSuccess: (result: any) => {
              console.log("Transaction Completed", result);
              disconnect(); // Optional: comment this if you want to stay connected
              resolve({ payerAddress: currentAccount.address, transactionHash: result.digest });
            },
            onError: (error: any) => {
              console.error("Payment error", error);
              disconnect();
              reject(error);
              throw error;
            },
          }
        );
      });
    } catch (error: any) {
      console.error("Transaction error:", error);
      disconnect();
      throw error;
    }
  };

  return { handleSuiPayment };
};

