import { useCallback, useEffect, useRef, useState } from "react";
import { getApiErrorMessage } from "../utils/apiError";

interface UsePublicDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const dataCache = new Map<string, unknown>();

export const usePublicData = <T>(
  key: string,
  fetcher: () => Promise<T>
): UsePublicDataResult<T> => {
  const [data, setData] = useState<T | null>(
    () => (dataCache.get(key) as T | undefined) ?? null
  );
  const [isLoading, setIsLoading] = useState(() => !dataCache.has(key));
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refetch = useCallback(async () => {
    if (!dataCache.has(key)) setIsLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current();
      dataCache.set(key, result);
      setData(result);
    } catch (err) {
      setError(getApiErrorMessage(err));
      if (!dataCache.has(key)) setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
};
