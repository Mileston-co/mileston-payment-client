"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { PaymentOptions } from "./payment-options"
import { InvoiceCheckoutProps } from "@/types"

export function InvoiceCheckout({
  businessName,
  businessLogo,
  currency = "USD",
  description,
  walletConnectButtonText = "Connect Wallet & Pay",
  qrCodeButtonText = "Generate Payment QR",
  cardButtonText = "Pay with Card",
  buttonClassName,
  dialogTitle,
  dialogDescription,
  className,
  footerText,
  paymentLinkId,
  env = "test",
  onWalletConnectPaymentComplete,
  onWalletConnectPaymentError,
  onQrCodePaymentComplete,
  onQrCodePaymentError,
  onCardPaymentComplete,
  onCardPaymentError,
  amount,
  recipientWalletAddress
}: InvoiceCheckoutProps) {
  const [selectedTab, setSelectedTab] = useState("wallet")

  return (
    <Card className={`w-full max-w-md ${className || ""}`}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          {businessLogo && (
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src={businessLogo || "/placeholder.svg?height=48&width=48"}
                alt={`${businessName} logo`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div>
            <CardTitle>{businessName}</CardTitle>
            <CardDescription>Invoice #{paymentLinkId}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-1.5">
          <div className="text-2xl font-bold">
            {currency} {parseFloat(amount).toFixed(2)}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <PaymentOptions
          walletConnectButtonText={walletConnectButtonText}
          qrCodeButtonText={qrCodeButtonText}
          cardButtonText={cardButtonText}
          buttonClassName={buttonClassName}
          dialogTitle={dialogTitle}
          dialogDescription={dialogDescription}
          defaultTab="wallet"
          onTabChange={(tab) => setSelectedTab(tab)}
          onWalletConnectPaymentComplete={onWalletConnectPaymentComplete}
          onWalletConnectPaymentError={onWalletConnectPaymentError}
          onQrCodePaymentComplete={onQrCodePaymentComplete}
          onQrCodePaymentError={onQrCodePaymentError}
          onCardPaymentComplete={onCardPaymentComplete}
          onCardPaymentError={onCardPaymentError}
          amount={amount}
          env={env}
          recipientWalletAddress={recipientWalletAddress}
          paymentType={"invoice"}
          paymentLinkId={paymentLinkId}
        />
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>{footerText || "Secure payment by Mileston"}</span>
      </CardFooter>
    </Card>
  )
}
