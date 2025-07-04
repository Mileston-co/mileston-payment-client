import { useState } from "react";
import { usePaymentContext } from "../components/PaymentContext";
import { getOnRampPaymentStatus } from "@/core/onramp";
import { GetOnRampPaymentStatusParams, OnRampPaymentStatusResponse } from "@/types";

export function useGetOnRampPaymentStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OnRampPaymentStatusResponse | null>(null);
  const { apikey, businessid } = usePaymentContext();

  async function fetchOnRampPaymentStatus(params: GetOnRampPaymentStatusParams) {
    setLoading(true);
    setError(null);
    try {
      const res = await getOnRampPaymentStatus(params, apikey, businessid);
      setData(res);
      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { fetchOnRampPaymentStatus, loading, error, data };
}
