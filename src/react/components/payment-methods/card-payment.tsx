"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

interface CardPaymentProps {
  cardPaymentUrl?: string
  buttonText?: string
  buttonClassName?: string
  dialogTitle?: string
  dialogDescription?: string
}

export function CardPayment({
  cardPaymentUrl,
  buttonText = "Pay with Card",
  buttonClassName,
  dialogTitle = "Card Payment",
  dialogDescription = "Complete your payment using the secure payment form",
}: CardPaymentProps) {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  return (
    <div className="space-y-2 text-center">
      <p className="text-sm text-muted-foreground">Pay with credit or debit card</p>

      <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
        <DialogTrigger asChild>
          <Button className={`w-full ${buttonClassName || ""}`}>
            <CreditCard className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="h-[400px] w-full">
            {cardPaymentUrl ? (
              <iframe src={cardPaymentUrl} className="h-full w-full border-0" title="Card payment" />
            ) : (
              <div className="h-full w-full flex items-center justify-center border rounded-md">
                <p className="text-sm text-muted-foreground">Card payment URL not provided</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
