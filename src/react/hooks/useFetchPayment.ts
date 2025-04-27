import { useState, useEffect } from 'react';
import { 
    FetchPaymentOptions, 
    PaymentResponse 
} from '../../types';
import { fetchPayment } from '../../core';

export function useFetchPayment<T extends PaymentResponse>(options: FetchPaymentOptions) {
  const [data, setData] = useState<PaymentResponse | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const result = await fetchPayment(options);

      if (!isMounted) return;

      if (result.error) {
        setError(result.error);
      } else {
        setData(result.data);
      }

      setLoading(false);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [options.apiKey, options.paymentId, options.paymentType]);

  return { data, error, loading };
}
