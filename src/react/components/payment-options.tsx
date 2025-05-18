"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Wallet, QrCode, CreditCard } from "lucide-react"
import { WalletConnectPayment } from "./payment-methods/wallet-connect-payment"
import { QrCodePayment } from "./payment-methods/qr-code-payment"
import { CardPayment } from "./payment-methods/card-payment"
import { PaymentOptionsProps } from "@/types"

export function PaymentOptions({
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
  paymentLinkId,
  userUUID
}: PaymentOptionsProps) {
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab)

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    if (onTabChange) {
      onTabChange(value)
    }
  }

  return (
    <Tabs defaultValue={defaultTab} value={selectedTab} onValueChange={handleTabChange} className="mt-5">
      <TabsList className="flex w-full justify-between gap-2">
        <TabsTrigger value="wallet" className="flex gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">Wallet Connect</span>
        </TabsTrigger>
        <TabsTrigger value="qrcode" className="flex gap-2">
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">QR Code</span>
        </TabsTrigger>
        <TabsTrigger value="card" className="flex gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Card</span>
        </TabsTrigger>
      </TabsList>

      {/* Wallet Connect Tab */}
      <TabsContent value="wallet">
        <WalletConnectPayment
          onPaymentComplete={(networkId: string, tokenId: string) => onWalletConnectPaymentComplete?.(networkId, tokenId)}
          onPaymentError={(error) => onWalletConnectPaymentError(error)}
          recipientWalletAddress={recipientWalletAddress}
          amount={amount}
          paymentLinkId={paymentLinkId}
          env={env}
          buttonText={walletConnectButtonText}
          buttonClassName={buttonClassName}
          paymentType={paymentType}
          userUUID={userUUID}
        />
      </TabsContent>

      {/* QR Code Tab */}
      <TabsContent value="qrcode">
        <QrCodePayment
          onPaymentComplete={(networkId: string, tokenId: string) => onQrCodePaymentComplete?.(networkId, tokenId)}
          buttonText={qrCodeButtonText}
          buttonClassName={buttonClassName}
          paymentType={paymentType}
          onPaymentError={(error) => onQrCodePaymentError(error)}
          recipientWalletAddress={recipientWalletAddress}
          amount={amount}
          env={env}
          paymentLinkId={paymentLinkId}
          userUUID={userUUID}
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
          paymentLinkId={paymentLinkId}
          env={env} 
          paymentType={paymentType}
          userUUID={userUUID}          
        />
      </TabsContent>
    </Tabs>
  )
}
