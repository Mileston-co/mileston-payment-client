"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { QrCode, Copy, Check } from "lucide-react"
import { cn } from "../lib/utils"
import { QrCodePaymentProps, Token} from "@/types"
import { useGetPaymentWallet, useVerifyPaymentWithWallet } from "@/react/hooks"
import { usePaymentContext } from "../PaymentContext"
import { getSupportedNetworks, getSupportedTokens } from "./utils"

export function QrCodePayment({
  buttonText = "Generate Payment QR",
  buttonClassName,
  paymentType,
  onPaymentComplete,
  onPaymentError,
  recipientWalletAddress,
  amount,
  env,
  paymentLinkId
}: QrCodePaymentProps) {
  const tokens = getSupportedTokens(recipientWalletAddress)
  const networks = getSupportedNetworks(recipientWalletAddress)

  const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0]?.id || "")
  const [selectedToken, setSelectedToken] = useState<string>("")
  const [showQrCode, setShowQrCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)

  const { fetchWallet, loading: fetchingWallet, wallet } = useGetPaymentWallet()
  const { verify, loading: verifyingPayment } = useVerifyPaymentWithWallet()

  const { businessid } = usePaymentContext()

  const availableTokens = tokens.filter((token) => token.networkId === selectedNetwork)

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value)
    setSelectedToken("")
    setShowQrCode(false)
  }

  const handleGenerateQr = async () => {
    if (selectedNetwork && selectedToken) {
      try {
        await fetchWallet(selectedNetwork === 'sui' ? 'sui' : 'evm')
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

  const selectedNetworkObj = networks.find((n) => n.id === selectedNetwork)
  const selectedTokenObj = tokens.find((t) => t.id === selectedToken)

  // -- POLLING for verification --
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (showQrCode && wallet?.publicKey && !paymentVerified) {
      interval = setInterval(async () => {
        try {
            const payable = (Number(amount) - (Number(amount) * 0.004)).toString()
            const result = await verify(
            paymentType,
            {
              paymentLinkId,
              publicKey: wallet.publicKey,
              amount,
              payable,
              recipientWalletAddress: selectedNetwork === 'sui' ? recipientWalletAddress.sui as string : recipientWalletAddress.evm as string,
              chain: selectedNetwork as any,
              env,
              userUUID: businessid,
              token: selectedToken as Token
            },
            selectedToken === 'ETH' || selectedToken === 'POL' || selectedToken === 'AVAX' ? selectedToken : undefined
            )

          if (result?.statusCode === 200) {
            clearInterval(interval)
            setPaymentVerified(true)
            console.log("🎉 Payment verified!")
            onPaymentComplete(selectedNetwork, selectedToken)
          }
        } catch (err: any) {
          console.error("Verification polling error", err)
          onPaymentError(err)
        }
      }, 10000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showQrCode, wallet, selectedTokenObj, selectedNetworkObj, paymentVerified, verify])

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
                  <SelectItem key={network.id} value={network.id}>
                    <div className="flex items-center gap-2">
                      {network.icon && (
                        <img src={network.icon} alt={network.name} width={16} height={16} />
                      )}
                      {network.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qr-token">Select Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken} disabled={!selectedNetwork}>
              <SelectTrigger id="qr-token">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.id} value={token.id}>
                    <div className="flex items-center gap-2">
                      {token.icon && (
                        <img src={token.icon} alt={token.symbol} width={16} height={16} />
                      )}
                      {token.symbol} - {token.name}
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
              Send {selectedTokenObj?.symbol} on {selectedNetworkObj?.name} network
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
              {wallet?.qrCode ? (
                <img src={wallet.qrCode} alt="QR Code" className="h-48 w-48 object-contain" />
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
                <code className="text-xs font-mono truncate max-w-[200px]">
                  {wallet?.publicKey || "No address available"}
                </code>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 px-2">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => setShowQrCode(false)}>
            Change payment method
          </Button>
        </div>
      )}
    </div>
  )
}
