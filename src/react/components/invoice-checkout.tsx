"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { PaymentOptions } from "./payment-options"
import { InvoiceCheckoutProps } from "@/types"

export function InvoiceCheckout({
  businessName,
  businessLogo,
  invoiceId,
  amount,
  currency = "USD",
  description,
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
  className,
  footerText,
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
            <CardDescription>Invoice #{invoiceId}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-1.5">
          <div className="text-2xl font-bold">
            {currency} {amount.toFixed(2)}
          </div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>

        <PaymentOptions
          networks={networks}
          tokens={tokens}
          cardPaymentUrl={cardPaymentUrl}
          onWalletConnectPayment={onWalletConnectPayment}
          onQrCodePayment={onQrCodePayment}
          walletConnectButtonText={walletConnectButtonText}
          qrCodeButtonText={qrCodeButtonText}
          cardButtonText={cardButtonText}
          buttonClassName={buttonClassName}
          walletAddress={walletAddress}
          dialogTitle={dialogTitle}
          dialogDescription={dialogDescription}
          defaultTab="wallet"
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>{footerText || "Secure payment"}</span>
        <span>Invoice #{invoiceId}</span>
      </CardFooter>
    </Card>
  )
}
