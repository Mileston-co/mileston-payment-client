import { getPaymentWallet, verifyPaymentWithWallet } from "@/core/paymentWallet";
import {
  WalletType,
  PaymentDto,
  VerifyPaymentWithWallet,
  GetPaymentWallet,
  evmType
} from "@/types";
import { useState } from "react";
import { usePaymentContext } from "../components/PaymentContext";

export function useGetPaymentWallet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wallet, setWallet] = useState<GetPaymentWallet | null>(null);

  const { apikey, businessid } = usePaymentContext();

  async function fetchWallet(walletType: WalletType, options?: { evmChain?: evmType; env?: 'test' | 'prod'; merchant?: string }) {
    setLoading(true);
    setError(null);

    try {
      const res = await getPaymentWallet({
        apikey,
        businessid,
        walletType,
        ...(options || {})
      });
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

export function useVerifyPaymentWithWallet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VerifyPaymentWithWallet | null>(null);

  const { apikey, businessid } = usePaymentContext();

  async function verify(type: 'invoice' | 'payment-link' | 'recurring', body: PaymentDto, nativeTokens?: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await verifyPaymentWithWallet({ apikey, businessid, type, body, nativeTokens });
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
