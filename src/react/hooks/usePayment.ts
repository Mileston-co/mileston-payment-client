import { getPaymentWallet, verifyPaymentWithWallet } from "@/core/paymentWallet";
import { 
    WalletType, 
    PaymentDto, 
    VerifyPaymentWithWallet, 
    GetPaymentWallet 
} from "@/types";
import { useState } from "react";

export function useGetPaymentWallet(apiKey: string, businessId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wallet, setWallet] = useState<GetPaymentWallet | null>(null);

  async function fetchWallet(walletType: WalletType) {
    setLoading(true);
    setError(null);

    try {
      const res = await getPaymentWallet({ apiKey, businessId, walletType });
      setWallet(res);
      return res;
    } catch (e: any) {
      setError(e.message || "Error fetching wallet");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { fetchWallet, loading, error, wallet };
}

export function useVerifyPaymentWithWallet(apiKey: string, businessId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VerifyPaymentWithWallet | null>(null);

  async function verify(type: 'invoice' | 'payment-link' | 'recurring', body: PaymentDto, nativeTokens?: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await verifyPaymentWithWallet({ apiKey, businessId, type, body, nativeTokens });
      setData(res);
      return res;
    } catch (e: any) {
      setError(e.message || "Error verifying payment");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { verify, loading, error, data };
}
