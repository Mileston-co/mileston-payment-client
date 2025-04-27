"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { QrCode, Copy, Check } from "lucide-react"
import { cn } from "../lib/utils"
import { QrCodePaymentProps } from "@/types"

export function QrCodePayment({
  networks = [],
  tokens = [],
  onPayment,
  buttonText = "Generate Payment QR",
  buttonClassName,
  walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Example address, should be provided by the parent
}: QrCodePaymentProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0]?.id || "")
  const [selectedToken, setSelectedToken] = useState<string>("")
  const [showQrCode, setShowQrCode] = useState(false)
  const [copied, setCopied] = useState(false)

  // Filter tokens based on selected network
  const availableTokens = tokens.filter((token) => token.networkId === selectedNetwork)

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value)
    setSelectedToken("")
    setShowQrCode(false)
  }

  const handleGenerateQr = () => {
    if (onPayment && selectedNetwork && selectedToken) {
      onPayment(selectedNetwork, selectedToken)
      setShowQrCode(true)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Find the selected network and token for display
  const selectedNetworkObj = networks.find((n) => n.id === selectedNetwork)
  const selectedTokenObj = tokens.find((t) => t.id === selectedToken)

  return (
    <div className="space-y-4">
      {!showQrCode ? (
        <>
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

          <Button
            className={cn("w-full", buttonClassName)}
            disabled={!selectedNetwork || !selectedToken}
            onClick={handleGenerateQr}
          >
            <QrCode className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">
              Send {selectedTokenObj?.symbol} on {selectedNetworkObj?.name} network
            </p>
            <div className="flex items-center justify-center space-x-2">
              {selectedNetworkObj?.icon && (
                <img
                  src={selectedNetworkObj.icon || "/placeholder.svg"}
                  alt={selectedNetworkObj.name}
                  width={20}
                  height={20}
                />
              )}
              {selectedTokenObj?.icon && (
                <img
                  src={selectedTokenObj.icon || "/placeholder.svg"}
                  alt={selectedTokenObj.symbol}
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-white p-2 rounded-lg mb-2">
              {/* Placeholder for actual QR code implementation */}
              <div className="h-48 w-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <QrCode size={120} className="text-primary" />
              </div>
            </div>

            <div className="w-full space-y-2">
              <p className="text-xs text-center text-muted-foreground mb-2">
                Scan with your wallet app or copy the address below
              </p>

              <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                <code className="text-xs font-mono truncate max-w-[200px]">{walletAddress}</code>
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
