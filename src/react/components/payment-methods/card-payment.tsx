import { useState, useEffect, useCallback } from "react";
import {
  useGetOnRampData,
  useGetOnRampPaymentStatus,
  useSavePayment,
  useSubWallets,
} from "@/react/hooks/index";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";
import { CardPaymentProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { usePaymentContext } from "../PaymentContext";
import { getSupportedNetworks, getSupportedTokens } from "./utils";

export function CardPayment({
  buttonText = "Pay with Card",
  buttonClassName,
  amount,
  recipientWalletAddress,
  onPaymentComplete,
  onPaymentError,
  paymentType,
  paymentLinkId,
  env,
  userUUID,
  subWalletUuid
}: CardPaymentProps) {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [effectiveWalletAddress, setEffectiveWalletAddress] = useState(recipientWalletAddress);

  const networks = getSupportedNetworks(effectiveWalletAddress);
  const tokens = getSupportedTokens(effectiveWalletAddress, env);
  const [selectedNetwork, setSelectedNetwork] = useState<string>(
    networks[0]?.id || ""
  );

  const [loading, setLoading] = useState(false);

  const { fetchOnRampData, loading: fetchingPaymentLink, error: paymentLinkError } = useGetOnRampData();
  const { fetchOnRampPaymentStatus } = useGetOnRampPaymentStatus();
  const { triggerSavePayment } = useSavePayment();
  const { businessid, apikey } = usePaymentContext();
  const { data: subWalletData, error: subWalletError, loading: fetchingSubWallets, refetch } = useSubWallets({
    apikey,
    businessid: userUUID ?? businessid,
    subWalletUuid: subWalletUuid || '',
    env: env || 'test'
  });

  useEffect(() => {
    const fetchSubWalletData = async () => {
      if (subWalletUuid) {
        try {
          await refetch();
          if (subWalletData?.data?.address) {
            setEffectiveWalletAddress(subWalletData.data.address);
          }
        } catch (error) {
          console.error("Failed to fetch subwallet:", error);
          onPaymentError(new Error("Failed to fetch subwallet data. Payment cannot proceed."));
        }
      }
    };

    fetchSubWalletData();
  }, [subWalletUuid, subWalletData]);

  const { sui, avax, base, eth, arb, pol, solana } = effectiveWalletAddress;

  const getWalletByNetwork = (network: string) =>
    network === "sui"
      ? sui
      : network === "solana"
        ? solana
        : eth ?? base ?? pol ?? avax ?? arb;

  // Check if a network has tokens that are unavailable on testnet
  const hasUnavailableTokens = (networkId: string) => {
    return tokens.some(token => token.networkId === networkId && token.testnetUnavailable);
  };

  const openCenteredPopup = (url: string, title: string, width: number, height: number) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const specs = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    return window.open(url, title, specs);
  };

  const initiateCardPayment = useCallback(async () => {
    try {
      if (selectedNetwork === 'sui' || selectedNetwork === 'solana') {
        const error = new Error(`${selectedNetwork.toUpperCase()} is not supported for card payments.`);
        console.error(error.message);
        onPaymentError(error);
        return;
      }
  
      const recipient = getWalletByNetwork(selectedNetwork);
      const res = await fetchOnRampData({
        amount,
        chain: selectedNetwork as any,
        recipientWalletAddress: recipient,
      });

      if (res?.data?.id && res?.data?.link) {
        setPaymentId(res.data.id);
        const win = openCenteredPopup(res.data.link, "Card Payment", 500, 600);
        setPopupWindow(win);
      }
    } catch (error: any) {
      console.error("🔥 Failed to fetch card payment link:", error);
      onPaymentError(error);
    }
  }, [selectedNetwork, amount]);

  useEffect(() => {
    if (!popupWindow || popupWindow.closed || !paymentId) return;

    setLoading(true);

    const interval = setInterval(() => {
      if (popupWindow.closed) {
        clearInterval(interval);
        (async () => {
          try {
            const recipient = getWalletByNetwork(selectedNetwork);
            const statusResponse = await fetchOnRampPaymentStatus({
              id: paymentId,
              amount,
              chain: selectedNetwork as any,
              recipientWalletAddress: recipient,
              subWalletUuid,
              userUUID: userUUID ?? businessid
            });

            const paymentStatus = statusResponse?.data?.data?.status;
            if (paymentStatus === "COMPLETED") {
              await triggerSavePayment(paymentType, {
                paymentLinkId,
                payer: recipient,
                recipientWalletAddress: recipient,
                amount: amount.toString(),
                userUUID: userUUID ?? businessid,
                transactionSignature: statusResponse.data.data.transactionHash,
                chain: selectedNetwork as any,
                env,
              });

              console.log("✅ Payment completed successfully!");
              onPaymentComplete();
            } else {
              console.log(`⚠️ Payment status: ${paymentStatus}`);
            }
          } catch (err: any) {
            console.error("🧨 Error checking payment status:", err);
            onPaymentError(err);
          } finally {
            setLoading(false);
          }
        })();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [popupWindow, paymentId]);

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
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {network.icon && (
                      <img
                        src={network.icon}
                        alt={network.name}
                        width={16}
                        height={16}
                      />
                    )}
                    {network.name}
                  </div>
                  {hasUnavailableTokens(network.id) && (
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-orange-500 bg-orange-100 px-2 py-1 rounded">
                        Some tokens unavailable
                      </span>
                      <a 
                        href="https://docs.mileston.co/docs/mileston-sdks/testnet-limitations" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn more
                      </a>
                    </div>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        className={`w-full ${buttonClassName || ""}`}
        disabled={fetchingPaymentLink || !selectedNetwork}
        onClick={initiateCardPayment}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {fetchingPaymentLink || loading ? "Loading..." : buttonText}
      </Button>

      {paymentLinkError && (
        <p className="text-sm text-destructive mt-2">
          Error: {paymentLinkError}
        </p>
      )}
    </div>
  );
}
