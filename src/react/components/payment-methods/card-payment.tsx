import { useState, useEffect } from "react";
import { useGetOnRampData, useGetOnRampPaymentStatus, useSavePayment } from "@/react/hooks/index";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/react/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { CardPaymentProps } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { usePaymentContext } from "../PaymentContext";

export function CardPayment({
  buttonText = "Pay with Card",
  buttonClassName,
  dialogTitle = "Card Payment",
  dialogDescription = "Complete your payment using the secure payment form",
  amount,
  recipientWalletAddress,
  onPaymentComplete,
  onPaymentError,
  networks = [],
  paymentType,
  paymentLinkId,
  env
}: CardPaymentProps) {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [cardPaymentUrl, setCardPaymentUrl] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0]?.id || "");

  const { fetchOnRampData, loading: fetchingPaymentLink, error: paymentLinkError } = useGetOnRampData();
  const { fetchOnRampPaymentStatus } = useGetOnRampPaymentStatus();
  const { triggerSavePayment } = useSavePayment();
  const { businessid } = usePaymentContext()

  useEffect(() => {
    if (isCardModalOpen && selectedNetwork) {
      (async () => {
        try {
          const res = await fetchOnRampData({
            amount,
            chain: selectedNetwork as any,
            recipientWalletAddress: selectedNetwork === 'sui' ? recipientWalletAddress.sui as string : recipientWalletAddress.evm as string,
          });

          if (res?.data?.id && res?.data?.link) {
            setPaymentId(res.data.id);
            setCardPaymentUrl(res.data.link);
          }
        } catch (error: any) {
          console.error("Failed to fetch card payment link:", error);
          onPaymentError(error);
        }
      })();
    }
  }, [isCardModalOpen, fetchOnRampData, selectedNetwork]);

  useEffect(() => {
    if (!isCardModalOpen && paymentId) {
      (async () => {
        try {
          const statusResponse = await fetchOnRampPaymentStatus({
            id: paymentId,
            amount,
            chain: selectedNetwork as any,
            recipientWalletAddress: selectedNetwork === 'sui' ? recipientWalletAddress.sui as string : recipientWalletAddress.evm as string,
          });

          const paymentStatus = statusResponse?.data?.data?.status;
          if (paymentStatus === "COMPLETED") {
            await triggerSavePayment(paymentType, {
              paymentLinkId,
              payer: selectedNetwork === 'sui' ? recipientWalletAddress.sui as string : recipientWalletAddress.evm as string,
              recipientWalletAddress: selectedNetwork === 'sui' ? recipientWalletAddress.sui as string : recipientWalletAddress.evm as string,
              amount: amount.toString(),
              userUUID: businessid,
              transactionSignature: statusResponse.data.data.transactionHash,
              chain: selectedNetwork as any,
              env,
            });
            console.log("✅ Payment completed successfully!");
            onPaymentComplete();
          } else {
            console.log(`⚠️ Payment status: ${paymentStatus}`);
          }
        } catch (error: any) {
          console.error("Failed to verify payment status:", error);
          onPaymentError(error);
        }
      })();
    }
  }, [isCardModalOpen, paymentId, fetchOnRampPaymentStatus, selectedNetwork]);

  return (
    <div className="space-y-4 text-center">
      <div className="space-y-2">
        <Label htmlFor="network">Select Blockchain</Label>
        <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
          <SelectTrigger id="network">
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            {networks.map((network) => (
              <SelectItem key={network.id} value={network.id}>
                <div className="flex items-center gap-2">
                  {network.icon && (
                    <img
                      src={network.icon || "/placeholder.svg?height=16&width=16"}
                      alt={network.name}
                      width={16}
                      height={16}
                    />
                  )}
                  {network.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
        <DialogTrigger asChild>
          <Button
            className={`w-full ${buttonClassName || ""}`}
            disabled={fetchingPaymentLink || !selectedNetwork}
          >
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
              <iframe
                src={cardPaymentUrl}
                className="h-full w-full border-0"
                title="Card payment"
              />
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
