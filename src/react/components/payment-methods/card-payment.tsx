import { useState, useEffect } from "react";
import { useGetOnRampData, useGetOnRampPaymentStatus } from "@/react/hooks/index";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/react/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { CardPaymentProps } from "@/types";

export function CardPayment({
  buttonText = "Pay with Card",
  buttonClassName,
  dialogTitle = "Card Payment",
  dialogDescription = "Complete your payment using the secure payment form",
  amount,
  chain,
  recipientWalletAddress,
  onPaymentComplete
}: CardPaymentProps) {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [cardPaymentUrl, setCardPaymentUrl] = useState<string | null>(null);

  const { fetchOnRampData, loading: fetchingPaymentLink, error: paymentLinkError } = useGetOnRampData();
  const { fetchOnRampPaymentStatus } = useGetOnRampPaymentStatus(); // second hook to verify status

  // Effect: When modal opens
  useEffect(() => {
    if (isCardModalOpen) {
      // When modal opens, fetch the payment link
      (async () => {
        try {
          const res = await fetchOnRampData({
            amount,
            chain,
            recipientWalletAddress,
          });
          if (res?.data?.id && res?.data?.link) {
            setPaymentId(res.data.id);
            setCardPaymentUrl(res.data.link);
          }
        } catch (error) {
          console.error("Failed to fetch card payment link:", error);
        }
      })();
    }
  }, [isCardModalOpen, fetchOnRampData]);

  // Effect: When modal closes
  useEffect(() => {
    if (!isCardModalOpen && paymentId) {
      // When modal closes, verify if payment was completed
      (async () => {
        try {
          const statusResponse = await fetchOnRampPaymentStatus({
            id: paymentId,
            amount,
            chain, 
            recipientWalletAddress,
          });

          const paymentStatus = statusResponse?.data?.data?.status;
          if (paymentStatus === "COMPLETED") {
            console.log("✅ Payment completed successfully!");
            onPaymentComplete()
          } else {
            console.log(`⚠️ Payment status: ${paymentStatus}`);
          }
        } catch (error) {
          console.error("Failed to verify payment status:", error);
        }
      })();
    }
  }, [isCardModalOpen, paymentId, fetchOnRampPaymentStatus]);

  return (
    <div className="space-y-2 text-center">
      <p className="text-sm text-muted-foreground">Pay with credit or debit card</p>

      <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
        <DialogTrigger asChild>
          <Button className={`w-full ${buttonClassName || ""}`} disabled={fetchingPaymentLink}>
            <CreditCard className="mr-2 h-4 w-4" />
            {fetchingPaymentLink ? "Loading..." : buttonText}
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
                {paymentLinkError ? (
                  <p className="text-sm text-destructive">{paymentLinkError}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Card payment URL not available</p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
