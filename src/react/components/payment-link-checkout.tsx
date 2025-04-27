"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { cn } from "./lib/utils"
import { PaymentOptions } from "./payment-options"
import { PaymentMethodProps } from "@/types"

export interface PaymentLinkCheckoutProps extends PaymentMethodProps {
  businessName: string
  businessLogo?: string
  bannerImage?: string
  title?: string
  amount: number
  currency?: string
  description?: string
  className?: string
  footerText?: string
}

export function PaymentLinkCheckout({
  businessName,
  businessLogo,
  bannerImage,
  title,
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
}: PaymentLinkCheckoutProps) {
  const [selectedTab, setSelectedTab] = useState("wallet")

  return (
    <Card className={`w-full max-w-md ${className || ""}`}>
      {bannerImage && (
        <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
          <img src={bannerImage || "/placeholder.svg"} alt="Banner" className="object-cover" />
        </div>
      )}
      <CardHeader className={cn("text-center", bannerImage ? "-mt-10" : "")}>
        <div className="flex flex-col items-center space-y-4">
          {businessLogo && (
            <div
              className={cn(
                "overflow-hidden rounded-full",
                bannerImage ? "h-20 w-20 border-4 border-background" : "h-16 w-16",
              )}
            >
              <img
                src={businessLogo || "/placeholder.svg?height=64&width=64"}
                alt={`${businessName} logo`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div>
            <CardTitle>{businessName}</CardTitle>
            <CardDescription>{title || "Payment Request"}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-1.5 text-center">
          <div className="text-3xl font-bold">
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
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <span>{footerText || "Secure payment powered by CryptoCheckout"}</span>
      </CardFooter>
    </Card>
  )
}
