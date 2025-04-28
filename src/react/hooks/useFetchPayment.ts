import { useState, useEffect } from 'react';
import { 
    FetchPaymentOptions, 
    PaymentOptions, 
    PaymentResponse 
} from '../../types';
import { fetchPayment } from '../../core';
import { usePaymentContext } from '../components/PaymentContext';

export function useFetchPayment(options: PaymentOptions) {
  const [data, setData] = useState<PaymentResponse | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { apikey, businessid } = usePaymentContext();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);

      const result = await fetchPayment({
        apikey,
        businessid,
        ...options
      });

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
  }, [options.paymentId, options.paymentType]);

  return { data, error, loading };
}
