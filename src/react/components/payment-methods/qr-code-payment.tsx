"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { QrCode, Copy, Check } from "lucide-react"
import { cn } from "../lib/utils"
import { QrCodePaymentProps, Token, WalletType } from "@/types"
import { useGetPaymentWallet, useVerifyPaymentWithWallet, useSubWallets } from "@/react/hooks"
import { usePaymentContext } from "../PaymentContext"
import { convertUSDToTokenAmount, getSupportedNetworks, getSupportedTokens } from "./utils"
import { useQRCode } from 'react-qrcode'

export function QrCodePayment({
  buttonText = "Generate Payment QR",
  buttonClassName,
  paymentType,
  onPaymentComplete,
  onPaymentError,
  recipientWalletAddress,
  amount,
  env,
  paymentLinkId,
  userUUID,
  subWalletUuid
}: QrCodePaymentProps) {
  const [effectiveWalletAddress, setEffectiveWalletAddress] = useState(recipientWalletAddress);
  const tokens = getSupportedTokens(effectiveWalletAddress, env)
  const networks = getSupportedNetworks(effectiveWalletAddress)

  const [selectedNetwork, setSelectedNetwork] = useState<string>(() => {
    const firstEnabledNetwork = networks.find(n => !n.disabled);
    return firstEnabledNetwork?.id || "";
  })
  const [selectedToken, setSelectedToken] = useState<string>("")
  const [showQrCode, setShowQrCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)

  const { fetchWallet, loading: fetchingWallet, wallet } = useGetPaymentWallet()
  const { verify, loading: verifyingPayment } = useVerifyPaymentWithWallet()
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

  const qrCodeValue = wallet?.publicKey || "placeholder"
  const dataUrl = useQRCode(qrCodeValue)

  const availableTokens = tokens.filter((token) => token.networkId === selectedNetwork)

  const handleNetworkChange = (value: string) => {
    const selectedNetworkObj = networks.find(n => n.id === value);
    if (selectedNetworkObj?.disabled) {
      return; // Don't allow selection of disabled networks
    }
    setSelectedNetwork(value)
    setSelectedToken("")
    setShowQrCode(false)
  }

  const handleTokenChange = (value: string) => {
    const selectedToken = tokens.find(token => token.id === value);
    if (selectedToken?.testnetUnavailable) {
      // Don't allow selection of unavailable tokens
      return;
    }
    setSelectedToken(value);
  };

  const handleGenerateQr = async () => {
    if (selectedNetwork && selectedToken) {
      try {
        let walletType: WalletType = 'evm';
        let options: any = {};
        if (selectedNetwork === 'sui') {
          walletType = 'sui';
        } else if (selectedNetwork === 'solana') {
          walletType = 'solana';
        } else {
          // EVM: pass evmChain, env, merchant
          options = {
            evmChain: selectedNetwork,
            env,
            merchant: eth ?? base ?? pol ?? avax ?? arb,
          };
        }
        await fetchWallet(walletType, options)
        setShowQrCode(true)
      } catch (error) {
        console.error("Failed to fetch wallet", error)
      }
    }
  }

  const copyToClipboard = () => {
    if (!wallet?.publicKey) return
    navigator.clipboard.writeText(wallet.publicKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const [calculatedAmountToSend, setCalculatedAmountToSend] = useState<number | null>(null);

  const calculateAmountToSend = async (tokenSymbol: string) => {
    const amountToSend = parseFloat(amount) + 0.05;
    if (tokenSymbol === 'USDC' || tokenSymbol === 'USDT') {
      return amountToSend.toFixed(4);
    } else {
      return await convertUSDToTokenAmount(tokenSymbol, amountToSend);
    }
  };

  const selectedNetworkObj = networks.find((n) => n.id === selectedNetwork)
  const selectedTokenObj = tokens.find((t) => t.id === selectedToken)

  const { sui, avax, base, eth, arb, pol, solana } = effectiveWalletAddress;

  
  const [verifying, setVerifying] = useState(false);
  const handleVerifyPayment = async () => {
    if (!wallet?.publicKey || !selectedTokenObj || !selectedNetworkObj) return;
    setVerifying(true);
    try {
      // For EVM, pass evmChain and walletAddress
      const isEvm = ["eth", "avax", "pol", "base", "arb"].includes(selectedNetwork);
      const paymentDto: any = {
        paymentLinkId,
        publicKey: wallet.publicKey,
        amount,
        recipientWalletAddress: selectedNetwork === 'sui' 
          ? sui 
          : selectedNetwork === 'solana'
            ? solana
            : eth ?? base ?? pol ?? avax ?? arb,
        chain: selectedNetwork as any,
        env,
        userUUID: userUUID ?? businessid,
        token: selectedToken as Token,
        subWalletUuid: subWalletUuid
      };
      if (isEvm) {
        paymentDto.evmChain = selectedNetwork;
        paymentDto.walletAddress = wallet.publicKey;
      }
      const result = await verify(
        paymentType,
        paymentDto,
        selectedToken === 'ETH' || selectedToken === 'POL' || selectedToken === 'AVAX' || selectedToken === 'SOL' ? selectedToken : undefined
      );
      if (result?.statusCode === 200) {
        setPaymentVerified(true);
        onPaymentComplete(selectedNetwork, selectedToken);
      } else {
        onPaymentError(new Error(result?.message || 'Payment not verified'));
      }
    } catch (err: any) {
      if (
        err?.message === 'Payment Verification Failed: {"message":"Still awaiting payment","error":"Bad Request","statusCode":400}'
      ) {
        // Optionally show a message to the user
        onPaymentError(new Error('Still awaiting payment. Please try again in a moment.'));
      } else {
        onPaymentError(err);
      }
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    const updateAmountToSend = async () => {
      if (selectedTokenObj?.symbol) {
        const amount = await calculateAmountToSend(selectedTokenObj.symbol);
        setCalculatedAmountToSend(parseFloat(amount as string));
      }
    };
    updateAmountToSend();
  }, [showQrCode, wallet, selectedTokenObj]);

  return (
    <div className="space-y-4">
      {!showQrCode ? (
        <>
          {/* select network and token */}
          <div className="space-y-2">
            <Label htmlFor="qr-network">Select Blockchain</Label>
            <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
              <SelectTrigger id="qr-network">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {networks.map((network) => (
                  <SelectItem key={network.id} value={network.id} disabled={network.disabled}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {network.icon && (
                          <img src={network.icon} alt={network.name} width={16} height={16} />
                        )}
                        <span className={network.disabled ? "text-gray-500" : ""}>
                          {network.name}
                        </span>
                      </div>
                      {network.disabled && network.disabledReason && (
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                            {network.disabledReason}
                          </span>
                        </div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qr-token">Select Token</Label>
            <Select value={selectedToken} onValueChange={handleTokenChange} disabled={!selectedNetwork}>
              <SelectTrigger id="qr-token">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                                {availableTokens.map((token) => (
                  <SelectItem key={token.id} value={token.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {token.icon && (
                          <img src={token.icon} alt={token.symbol} width={16} height={16} />
                        )}
                        <span className={token.testnetUnavailable ? "text-gray-500" : ""}>
                          {token.symbol} - {token.name}
                        </span>
                      </div>
                      {token.testnetUnavailable && (
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-xs text-orange-500 bg-orange-100 px-2 py-1 rounded">
                            Testnet Unavailable
                          </span>
                          <a 
                            href="https://docs.mileston.co/docs/mileston-sdks/testnet-limitations" 
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

          <Button
            className={cn("w-full", buttonClassName)}
            disabled={!selectedNetwork || !selectedToken || fetchingWallet}
            onClick={handleGenerateQr}
          >
            <QrCode className="mr-2 h-4 w-4" />
            {fetchingWallet ? "Generating..." : buttonText}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          {/* show QR code */}
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">
              Send {calculatedAmountToSend?.toFixed(4)} {selectedTokenObj?.symbol} on {selectedNetworkObj?.name} network
            </p>
            <div className="flex items-center justify-center space-x-2">
              {selectedNetworkObj?.icon && (
                <img src={selectedNetworkObj.icon} alt={selectedNetworkObj.name} width={20} height={20} />
              )}
              {selectedTokenObj?.icon && (
                <img src={selectedTokenObj.icon} alt={selectedTokenObj.symbol} width={20} height={20} />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-white p-2 rounded-lg mb-2">
              {wallet?.publicKey ? (
                <img src={dataUrl ?? ''} alt="Payment QR Code" className="h-48 w-48 object-contain" />
              ) : (
                <div className="h-48 w-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <QrCode size={120} className="text-primary" />
                </div>
              )}
            </div>

            <div className="w-full space-y-2">
              <p className="text-xs text-center text-muted-foreground mb-2">
                Scan with your wallet app or copy the address below
              </p>

              <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                <code className="text-xs font-mono truncate max-w-[200px] text-center flex items-enter justify-center">
                  {wallet?.publicKey ? `${wallet.publicKey.slice(0, 13)}...${wallet.publicKey.slice(-4)}` : "No address available"}
                </code>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 px-2">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* New: Button for user to verify payment */}
          <Button
            variant="default"
            className="w-full mb-2"
            onClick={handleVerifyPayment}
            disabled={verifying || paymentVerified}
          >
            {verifying ? "Verifying..." : paymentVerified ? "Payment Verified" : "I have made the payment"}
          </Button>

          <Button variant="outline" className="w-full" onClick={() => setShowQrCode(false)}>
            Change payment method
          </Button>
        </div>
      )}
    </div>
  )
}
