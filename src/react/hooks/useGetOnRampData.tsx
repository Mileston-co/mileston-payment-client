import { getOnRampData } from "@/core/onramp";
import { useState } from "react";
import { usePaymentContext } from "../components/PaymentContext";
import { OnRampLinkResponse } from "@/types";

export function useGetOnRampData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OnRampLinkResponse | null>(null);
  const { apikey, businessid } = usePaymentContext();

  async function fetchOnRampData(params: {
    amount: string;
    recipientWalletAddress: string;
    chain: "avax" | "base" | "pol" | "eth" | "arb";
  }) {
    setLoading(true);
    setError(null);
    try {
      const res = await getOnRampData(params, apikey, businessid);
      setData(res);
      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { fetchOnRampData, loading, error, data };
}
