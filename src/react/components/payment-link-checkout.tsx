"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { cn } from "./lib/utils"
import { PaymentOptions } from "./payment-options"
import { PaymentLinkCheckoutProps } from "@/types"

export function PaymentLinkCheckout({
  businessName,
  businessLogo,
  bannerImage,
  title,
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
  recipientWalletAddress,
  userUUID,
  subWalletUuid,
  showCardPayment = true
}: PaymentLinkCheckoutProps) {
  const [selectedTab, setSelectedTab] = useState("wallet")

  return (
    <Card className={`w-full max-w-md ${className || ""}`}>
      {bannerImage && (
        <div className="relative h-30 w-full overflow-hidden rounded-t-lg">
          <img 
            src={bannerImage || "/placeholder.svg"} 
            alt="Banner" 
            className="object-cover w-full"
            style={{ height: "180px", width: "100%" }}
            width={1280}
            height={180}
          />
        </div>
      )}
      <CardHeader className={cn("text-center", bannerImage ? "-mt-10" : "")}>
        <div className="flex flex-col items-center space-y-4">
            {businessLogo && (
            <div
              className={cn(
              "overflow-hidden rounded-full h-30 w-30",
              bannerImage ? "border-4 border-background" : "",
              )}
            >
              <img
              src={businessLogo || "/placeholder.svg?height=64&width=64"}
              alt={`${businessName} logo`}
              width={64}
              height={64}
              className="h-30 w-30 object-cover"
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
            {currency} {parseFloat(amount).toFixed(2)}
          </div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
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
          paymentType={"payment-link"}
          paymentLinkId={paymentLinkId}
          userUUID={userUUID}
          subWalletUuid={subWalletUuid}
          showCardPayment={showCardPayment}
        />
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <span>{footerText || "Secure payment powered by Mileston"}</span>
      </CardFooter>
    </Card>
  )
}
