"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Wallet, QrCode, CreditCard } from "lucide-react"
import { WalletConnectPayment } from "./payment-methods/wallet-connect-payment"
import { QrCodePayment } from "./payment-methods/qr-code-payment"
import { CardPayment } from "./payment-methods/card-payment"
import { PaymentOptionsProps } from "@/types"

export function PaymentOptions({
  networks = [],
  tokens = [],
  cardPaymentUrl,
  onWalletConnectPayment,
  onQrCodePayment,
  walletConnectButtonText = "Connect Wallet & Pay",
  qrCodeButtonText = "Generate Payment QR",
  cardButtonText = "Pay with Card",
  buttonClassName,
  walletAddress,
  dialogTitle,
  dialogDescription,
  defaultTab = "wallet",
  onTabChange,
}: PaymentOptionsProps) {
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab)

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    if (onTabChange) {
      onTabChange(value)
    }
  }

  return (
    <Tabs defaultValue={defaultTab} value={selectedTab} onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="wallet" className="flex items-center justify-center gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">Wallet Connect</span>
        </TabsTrigger>
        <TabsTrigger value="qrcode" className="flex items-center justify-center gap-2">
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">QR Code</span>
        </TabsTrigger>
        <TabsTrigger value="card" className="flex items-center justify-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Card</span>
        </TabsTrigger>
      </TabsList>

      {/* Wallet Connect Tab */}
      <TabsContent value="wallet">
        <WalletConnectPayment
          networks={networks}
          tokens={tokens}
          onPayment={(networkId, tokenId) => onWalletConnectPayment?.(networkId, tokenId)}
          buttonText={walletConnectButtonText}
          buttonClassName={buttonClassName}
        />
      </TabsContent>

      {/* QR Code Tab */}
      <TabsContent value="qrcode">
        <QrCodePayment
          networks={networks}
          tokens={tokens}
          onPayment={(networkId, tokenId) => onQrCodePayment?.(networkId, tokenId)}
          buttonText={qrCodeButtonText}
          buttonClassName={buttonClassName}
          walletAddress={walletAddress}
        />
      </TabsContent>

      {/* Card Payment Tab */}
      <TabsContent value="card">
        <CardPayment
          cardPaymentUrl={cardPaymentUrl}
          buttonText={cardButtonText}
          buttonClassName={buttonClassName}
          dialogTitle={dialogTitle}
          dialogDescription={dialogDescription}
        />
      </TabsContent>
    </Tabs>
  )
}
