import { savePayment } from "@/core/savePayment";
import { SavePaymentInput, SavePaymentResponse } from "@/types";
import { useState } from "react";

type PaymentType = 'invoice' | 'payment-link' | 'recurring';

interface UseSavePaymentOptions {
  apiKey: string;
  businessId: string;
}

export function useSavePayment({ apiKey, businessId }: UseSavePaymentOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SavePaymentResponse | null>(null);

  async function triggerSavePayment(
    type: PaymentType,
    body: SavePaymentInput,
    nativeTokens?: string
  ) {
    setLoading(true);
    setError(null);

    try {
      const response = await savePayment({
        apiKey,
        businessId,
        type,
        body,
        nativeTokens,
      });
      setData(response);
      return response;
    } catch (err: any) {
      setError(err.message || "Something blew up inside savePayment");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { triggerSavePayment, loading, error, data };
}
