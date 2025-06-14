import { useState, useCallback } from "react";
import { fetchSubWallets } from "@/core/fetchSubWallets";
import { ISubWalletResponse, UseSubWalletsParams } from "@/types/core";

export function useSubWallets(params: UseSubWalletsParams) {
  const [data, setData] = useState<ISubWalletResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSubWallets(params);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch subwallets");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Optionally, fetch on mount or when params change
  // useEffect(() => { fetch(); }, [fetch]);

  return { data, error, loading, refetch: fetch };
} 