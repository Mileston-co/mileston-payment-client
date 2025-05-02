import { useState, useEffect } from 'react';
import {
  OptionsForPayment,
  PaymentTypeToResponseMap,
} from '../../types';
import { fetchPayment } from '../../core';
import { usePaymentContext } from '../components/PaymentContext';

export function useFetchPayment<T extends OptionsForPayment>(
  options: T
) {
  const [data, setData] = useState<PaymentTypeToResponseMap[T['paymentType']]>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const { apikey, businessid } = usePaymentContext();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const result = await fetchPayment({
          apikey,
          businessid,
          ...options,
        });

        if (!isMounted) return;
        setData(result);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || 'Something went wrong.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [options.paymentId, options.paymentType]);

  return { data, error, loading };
}
