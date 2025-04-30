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
  onWalletConnectPaymentComplete,
  onWalletConnectPaymentError,
  onQrCodePaymentComplete,
  onQrCodePaymentError,
  onCardPaymentComplete,
  onCardPaymentError,
  walletConnectButtonText = "Connect Wallet & Pay",
  qrCodeButtonText = "Generate Payment QR",
  cardButtonText = "Pay with Card",
  buttonClassName,
  dialogTitle,
  dialogDescription,
  defaultTab = "wallet",
  onTabChange,
  amount,
  env,
  recipientWalletAddress,
  paymentType,
  paymentLinkId
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
          onPaymentComplete={(networkId: string, tokenId: string) => onWalletConnectPaymentComplete?.(networkId, tokenId)}
          onPaymentError={(error) => onWalletConnectPaymentError(error)}
          recipientWalletAddress={recipientWalletAddress}
          amount={amount}
          paymentLinkId={paymentLinkId}
          env={env}
          buttonText={walletConnectButtonText}
          buttonClassName={buttonClassName}
          paymentType={paymentType}
        />
      </TabsContent>

      {/* QR Code Tab */}
      <TabsContent value="qrcode">
        <QrCodePayment
          networks={networks}
          tokens={tokens}
          onPaymentComplete={(networkId: string, tokenId: string) => onQrCodePaymentComplete?.(networkId, tokenId)}
          buttonText={qrCodeButtonText}
          buttonClassName={buttonClassName}
          paymentType={paymentType}
          onPaymentError={(error) => onQrCodePaymentError(error)}
          recipientWalletAddress={recipientWalletAddress}
          amount={amount}
          env={env}
          paymentLinkId={paymentLinkId}
        />
      </TabsContent>

      {/* Card Payment Tab */}
      <TabsContent value="card">
        <CardPayment
          buttonText={cardButtonText}
          buttonClassName={buttonClassName}
          dialogTitle={dialogTitle}
          dialogDescription={dialogDescription}
          amount={amount}
          recipientWalletAddress={recipientWalletAddress}
          onPaymentComplete={onCardPaymentComplete}
          onPaymentError={(error) => onCardPaymentError(error)}
          networks={networks}
          paymentLinkId={paymentLinkId}
          env={env} 
          paymentType={paymentType}          
        />
      </TabsContent>
    </Tabs>
  )
}
