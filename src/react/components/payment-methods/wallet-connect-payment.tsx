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
import { useSavePayment, useSuiPayment, useSolanaPayment, useSubWallets } from "@/react/hooks";
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
  paymentType,
  userUUID,
  subWalletUuid
}: WalletConnectPaymentProps) {
  const [effectiveWalletAddress, setEffectiveWalletAddress] = useState(recipientWalletAddress);
  
  // Make tokens and networks reactive to effectiveWalletAddress changes
  const tokens = getSupportedTokens(effectiveWalletAddress, env);
  const networks = getSupportedNetworks(effectiveWalletAddress);
  
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const currentAccount = useCurrentAccount();
  const { publicKey: solanaPublicKey } = useSolanaWallet();
  const { handleSuiPayment } = useSuiPayment(env);
  const { handleSolanaPayment } = useSolanaPayment(env);
  const { triggerSavePayment } = useSavePayment();
  const { businessid, apikey } = usePaymentContext()
  const { data: subWalletData, error: subWalletError, loading: fetchingSubWallets, refetch } = useSubWallets({
    apikey,
    businessid: userUUID ?? businessid,
    subWalletUuid: subWalletUuid || '',
    env: env || 'test'
  });

  useEffect(() => {
    const fetchSubWalletData = async () => {
      if (subWalletUuid) {
        try {
          await refetch();
          if (subWalletData?.data?.address) {
            setEffectiveWalletAddress(subWalletData.data.address);
          }
        } catch (error) {
          console.error("Failed to fetch subwallet:", error);
          onPaymentError(new Error("Failed to fetch subwallet data. Payment cannot proceed."));
        }
      }
    };

    fetchSubWalletData();
  }, [subWalletUuid, subWalletData]);

  // Update effectiveWalletAddress when recipientWalletAddress changes (for filtered wallets)
  useEffect(() => {
    if (recipientWalletAddress && Object.keys(recipientWalletAddress).length > 0) {
      console.log('🔍 [WalletConnectPayment] Updating effectiveWalletAddress from recipientWalletAddress');
      setEffectiveWalletAddress(recipientWalletAddress);
    }
  }, [recipientWalletAddress]);

  // Update selected network when effective wallet address changes
  useEffect(() => {
    if (networks.length > 0 && (!selectedNetwork || !networks.find(n => n.id === selectedNetwork))) {
      setSelectedNetwork(networks[0].id);
      setSelectedToken(""); // Reset token selection when network changes
    }
  }, [networks, selectedNetwork]);

  const [loading, setLoading] = useState(false);

  // Filter tokens based on selected network
  const availableTokens = tokens.filter((token) => token.networkId === selectedNetwork);

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
    setSelectedToken("");
  };

  const handleTokenChange = (value: string) => {
    const selectedToken = tokens.find(token => token.id === value);
    if (selectedToken?.testnetUnavailable) {
      // Don't allow selection of unavailable tokens
      return;
    }
    setSelectedToken(value);
  };

  const { sui, avax, base, eth, arb, pol, solana } = effectiveWalletAddress;

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
          userUUID: userUUID ?? businessid,
          transactionSignature: transactionHash,
          chain: "sui",
          env,
          subWalletUuid
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
          userUUID: userUUID ?? businessid,
          transactionSignature: transactionHash,
          feeSignature: feeHash,
          chain: "solana",
          env,
          subWalletUuid
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
          userUUID: userUUID ?? businessid,
          transactionSignature: txHash,
          feeSignature: feeHash,
          chain: selectedNetwork as any,
          env,
          subWalletUuid
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
        <Select value={selectedToken} onValueChange={handleTokenChange} disabled={!selectedNetwork}>
          <SelectTrigger id="token">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {availableTokens.map((token) => (
              <SelectItem key={token.id} value={token.id}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {token.icon && (
                      <img
                        src={token.icon || "/placeholder.svg?height=16&width=16"}
                        alt={token.symbol}
                        width={16}
                        height={16}
                      />
                    )}
                    <span className={token.testnetUnavailable ? "text-gray-500" : ""}>
                      {token.symbol} - {token.name}
                    </span>
                  </div>
                  {token.testnetUnavailable && (
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                        Testnet Unavailable
                      </span>
                      <a 
                        href="https://docs.mileston.co/mileston-sdks/testnet-limitations" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn more
                      </a>
                    </div>
                  )}
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
