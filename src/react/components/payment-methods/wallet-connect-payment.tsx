"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Wallet } from "lucide-react"
import { WalletConnectPaymentProps } from "@/types"

export function WalletConnectPayment({
  networks = [],
  tokens = [],
  onPayment,
  buttonText = "Connect Wallet & Pay",
  buttonClassName,
}: WalletConnectPaymentProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0]?.id || "")
  const [selectedToken, setSelectedToken] = useState<string>("")

  // Filter tokens based on selected network
  const availableTokens = tokens.filter((token) => token.networkId === selectedNetwork)

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value)
    setSelectedToken("")
  }

  const handlePayWithWallet = () => {
    if (onPayment && selectedNetwork && selectedToken) {
      onPayment(selectedNetwork, selectedToken)
    }
  }

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

      <Button
        className={`w-full ${buttonClassName || ""}`}
        disabled={!selectedNetwork || !selectedToken}
        onClick={handlePayWithWallet}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
    </div>
  )
}
