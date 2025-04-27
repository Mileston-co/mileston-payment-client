"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Clock, Calendar } from "lucide-react"
import { Badge } from "./ui/badge"
import { PaymentOptions } from "./payment-options"
import { SubscriptionCheckoutProps } from "@/types"

export function SubscriptionCheckout({
  businessName,
  businessLogo,
  plan,
  networks = [],
  tokens = [],
  cardPaymentUrl,
  onWalletConnectPayment,
  onQrCodePayment,
  walletConnectButtonText = "Subscribe with Wallet",
  qrCodeButtonText = "Generate Subscription QR",
  cardButtonText = "Subscribe with Card",
  buttonClassName,
  walletAddress,
  dialogTitle = "Card Subscription",
  dialogDescription = "Set up your recurring payment using the secure form",
  className,
  footerText,
  cancelText,
}: SubscriptionCheckoutProps) {
  const [selectedTab, setSelectedTab] = useState("wallet")

  // Format the subscription interval for display
  const formatInterval = () => {
    const { interval, intervalCount } = plan
    if (intervalCount === 1) {
      return interval.charAt(0).toUpperCase() + interval.slice(0, -2)
    }
    return `Every ${intervalCount} ${interval}`
  }

  return (
    <Card className={`w-full max-w-md ${className || ""}`}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          {businessLogo && (
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <ImageBitmap
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
            <CardDescription>Subscription Payment</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatInterval()}
            </Badge>
          </div>
          <div className="mt-4 flex items-end gap-1">
            <span className="text-2xl font-bold">
              {plan.currency} {plan.amount.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">/{plan.interval.slice(0, -2)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">First payment today, renews automatically</span>
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
      <CardFooter className="flex flex-col gap-2 text-sm text-muted-foreground">
        <span className="text-center w-full">{cancelText || "You can cancel your subscription at any time"}</span>
        <span className="text-center w-full">{footerText || "Secure recurring payment powered by CryptoCheckout"}</span>
      </CardFooter>
    </Card>
  )
}
