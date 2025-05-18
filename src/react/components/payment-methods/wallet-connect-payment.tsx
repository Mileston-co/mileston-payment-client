"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { LoaderIcon, Wallet } from "lucide-react";
import { evmType, Token, WalletConnectPaymentProps } from "@/types";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { handlePayWithEVMWalletConnect } from "@/core";
import { useSavePayment, useSuiPayment, useSolanaPayment } from "@/react/hooks";
import { usePaymentContext } from "../PaymentContext";
import { getSupportedNetworks, getSupportedTokens } from "./utils";

export function WalletConnectPayment({
  onPaymentComplete,
  onPaymentError,
  buttonText = "Connect Wallet & Pay",
  buttonClassName,
  recipientWalletAddress,
  amount,
  paymentLinkId,
  env = "test",
  paymentType
}: WalletConnectPaymentProps) {
  const tokens = getSupportedTokens(recipientWalletAddress)
  const networks = getSupportedNetworks(recipientWalletAddress)

  const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0]?.id || "");
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const currentAccount = useCurrentAccount();
  const { publicKey: solanaPublicKey } = useSolanaWallet();
  const { handleSuiPayment } = useSuiPayment(env);
  const { handleSolanaPayment } = useSolanaPayment(env);
  const { triggerSavePayment } = useSavePayment();
  const { businessid } = usePaymentContext()

  const [loading, setLoading] = useState(false);

  // Filter tokens based on selected network
  const availableTokens = tokens.filter((token) => token.networkId === selectedNetwork);

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
    setSelectedToken("");
  };

  const { sui, avax, base, eth, arb, pol, solana } = recipientWalletAddress;

  const handlePayWithWallet = async () => {
    try {
      setLoading(true);

      if (selectedNetwork === "sui") {
        const { payerAddress, transactionHash } = await handleSuiPayment({
          recipientWalletAddress: sui,
          amount,
        });

        await triggerSavePayment(paymentType, {
          paymentLinkId,
          payer: payerAddress,
          recipientWalletAddress: sui,
          amount: amount.toString(),
          userUUID: businessid,
          transactionSignature: transactionHash,
          chain: "sui",
          env,
        },
          selectedToken === 'ETH' || selectedToken === 'POL' || selectedToken === 'AVAX' || selectedToken === 'SOL' ? selectedToken : undefined
        );

        if (onPaymentComplete) {
          onPaymentComplete(selectedNetwork, selectedToken);
        }
      } else if (selectedNetwork === "solana") {
        const { payerAddress, transactionHash, feeHash } = await handleSolanaPayment({
          recipientWalletAddress: solana,
          amount,
          token: selectedToken as 'SOL' | 'USDC' | 'USDT'
        });

        await triggerSavePayment(paymentType, {
          paymentLinkId,
          payer: payerAddress,
          recipientWalletAddress: solana,
          amount: amount.toString(),
          userUUID: businessid,
          transactionSignature: transactionHash,
          feeSignature: feeHash,
          chain: "solana",
          env,
        },
          selectedToken === 'SOL' ? selectedToken : undefined
        );

        if (onPaymentComplete) {
          onPaymentComplete(selectedNetwork, selectedToken);
        }
      } else {
        const { txHash, feeHash, payerAddress } = await handlePayWithEVMWalletConnect({
          env,
          evm: selectedNetwork as evmType,
          recipientAddress: eth ?? base ?? pol ?? avax ?? arb,
          amount,
          token: selectedToken as Token,
        });

        await triggerSavePayment(paymentType, {
          paymentLinkId,
          payer: payerAddress,
          recipientWalletAddress: eth ?? base ?? pol ?? avax ?? arb,
          amount: amount.toString(),
          userUUID: businessid,
          transactionSignature: txHash,
          feeSignature: feeHash,
          chain: selectedNetwork as any,
          env,
        },
          selectedToken === 'ETH' || selectedToken === 'POL' || selectedToken === 'AVAX' ? selectedToken : undefined
        );

        if (onPaymentComplete) {
          onPaymentComplete(selectedNetwork, selectedToken);
        }
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      onPaymentError(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (selectedNetwork === "sui" && currentAccount?.address) {
      setIsWalletConnected(true);
      handlePayWithWallet();
    } else if (selectedNetwork === "solana" && solanaPublicKey) {
      setIsWalletConnected(true);
      handlePayWithWallet();
    }
  }, [currentAccount, solanaPublicKey]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="network">Select Blockchain</Label>
        <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
          <SelectTrigger id="network">
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            {networks.map((network) => (
              <SelectItem key={network.id} value={network.id}>
                <div className="flex items-center gap-2">
                  {network.icon && (
                    <img
                      src={network.icon || "/placeholder.svg?height=16&width=16"}
                      alt={network.name}
                      width={16}
                      height={16}
                    />
                  )}
                  {network.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="token">Select Token</Label>
        <Select value={selectedToken} onValueChange={setSelectedToken} disabled={!selectedNetwork}>
          <SelectTrigger id="token">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {availableTokens.map((token) => (
              <SelectItem key={token.id} value={token.id}>
                <div className="flex items-center gap-2">
                  {token.icon && (
                    <img
                      src={token.icon || "/placeholder.svg?height=16&width=16"}
                      alt={token.symbol}
                      width={16}
                      height={16}
                    />
                  )}
                  {token.symbol} - {token.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center">
        {loading ? (
          <Button className="w-full" disabled>
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </Button>
        ) : selectedNetwork === "sui" ? (
          <ConnectButton
            style={{
              marginBottom: "0rem",
              backgroundColor: "inherit",
              color: "inherit",
              border: "none",
              padding: "0px",
              width: "100%"
            }}
            disabled={isWalletConnected}
            connectText={buttonText}
          />
        ) : selectedNetwork === "solana" ? (
          <WalletMultiButton
            style={{
              marginBottom: "0rem",
              backgroundColor: "inherit",
              color: "inherit",
              border: "none",
              padding: "0px",
              width: "100%"
            }}
            disabled={isWalletConnected}
          >
            {buttonText}
          </WalletMultiButton>
        ) : (
          <Button
            className={`w-full ${buttonClassName || ""}`}
            disabled={!selectedNetwork || !selectedToken}
            onClick={handlePayWithWallet}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
