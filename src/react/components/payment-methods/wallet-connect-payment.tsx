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
import { handlePayWithEVMWalletConnectEnhanced } from "@/core/enhancedWalletConnect";
import { useSavePayment, useSuiPayment, useSolanaPayment, useSubWallets } from "@/react/hooks";
import { usePaymentContext } from "../PaymentContext";
import { getSupportedNetworks, getSupportedTokens } from "./utils";
import { WalletSelectionModal } from "../WalletSelectionModal";
import { detectEVMWallets, DetectedWallet } from "@/core/walletDetection";

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
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<DetectedWallet | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletProvider, setWalletProvider] = useState<any>(null);
  
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

  const handleWalletSelected = (wallet: DetectedWallet, address: string, provider: any) => {
    setSelectedWallet(wallet);
    setWalletAddress(address);
    setWalletProvider(provider);
    setShowWalletModal(false);
    
    // Automatically proceed with payment after wallet selection
    handlePayWithWallet();
  };

  const handleWalletModalError = (error: Error) => {
    console.error("Wallet selection error:", error);
    onPaymentError(error);
    setShowWalletModal(false);
  };

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
        // Check if we need to show wallet selection modal for EVM chains
        const detectionResult = detectEVMWallets();
        const isEVMChain = ['eth', 'avax', 'pol', 'base', 'arb'].includes(selectedNetwork);
        
        if (isEVMChain && !detectionResult.connectedWallet && !selectedWallet) {
          // Show wallet selection modal
          setShowWalletModal(true);
          setLoading(false);
          return;
        }

        // Use enhanced wallet connect for EVM chains
        const { txHash, feeHash, payerAddress } = await handlePayWithEVMWalletConnectEnhanced({
          env,
          evm: selectedNetwork as evmType,
          recipientAddress: eth ?? base ?? pol ?? avax ?? arb,
          amount,
          token: selectedToken as Token,
          selectedWallet: selectedWallet || detectionResult.connectedWallet,
          walletAddress,
          walletProvider,
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
      
      // Check if this is a wallet selection error
      if (error.message === 'WALLET_SELECTION_REQUIRED') {
        setShowWalletModal(true);
        setLoading(false);
        return;
      }
      
      onPaymentError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedNetwork === "sui" && currentAccount?.address) {
      setIsWalletConnected(true);
      handlePayWithWallet();
    } else if (selectedNetwork === "solana" && solanaPublicKey) {
      setIsWalletConnected(true);
      handlePayWithWallet();
    } else if (selectedNetwork && selectedToken && !isWalletConnected) {
      // For EVM chains, check if wallet is already connected
      const detectionResult = detectEVMWallets();
      if (detectionResult.connectedWallet) {
        setIsWalletConnected(true);
        setSelectedWallet(detectionResult.connectedWallet);
        setWalletAddress(detectionResult.connectedWallet.address || "");
        setWalletProvider(detectionResult.connectedWallet.provider);
        handlePayWithWallet();
      }
    }
  }, [selectedNetwork, selectedToken, isWalletConnected, currentAccount, solanaPublicKey]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="network">Select Network</Label>
        <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a network" />
          </SelectTrigger>
          <SelectContent>
            {networks.map((network) => (
              <SelectItem key={network.id} value={network.id}>
                <div className="flex items-center space-x-2">
                  <span>{network.icon}</span>
                  <span>{network.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedNetwork && (
        <div className="space-y-2">
          <Label htmlFor="token">Select Token</Label>
          <Select value={selectedToken} onValueChange={handleTokenChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a token" />
            </SelectTrigger>
            <SelectContent>
              {availableTokens.map((token) => (
                <SelectItem 
                  key={token.id} 
                  value={token.id}
                  disabled={token.testnetUnavailable}
                >
                  <div className="flex items-center space-x-2">
                    <span>{token.icon}</span>
                    <span>{token.name}</span>
                    {token.testnetUnavailable && (
                      <span className="text-xs text-gray-500">(Unavailable on testnet)</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedNetwork && selectedToken && (
        <div className="space-y-4">
          {selectedNetwork === "sui" ? (
            <ConnectButton />
          ) : selectedNetwork === "solana" ? (
            <WalletMultiButton />
          ) : (
            <Button
              onClick={handlePayWithWallet}
              disabled={loading}
              className={buttonClassName}
            >
              {loading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  {buttonText}
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Wallet Selection Modal */}
      <WalletSelectionModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onWalletSelected={handleWalletSelected}
        onError={handleWalletModalError}
      />
    </div>
  );
}
