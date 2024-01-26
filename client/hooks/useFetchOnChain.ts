import { useState, useEffect } from "react";

interface UseFetchOnChainProps<T> {
  fetchFunction: () => Promise<T>;
  retryCount?: number;
}

interface UseFetchOnChainResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null | unknown;
  refetch: (attempts?: number) => Promise<void>;
}

const useFetchOnChain = <T>({
  fetchFunction,
  retryCount = 3,
}: UseFetchOnChainProps<T>): UseFetchOnChainResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | unknown>(null);

  const refetch = async (attempts = 0): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (fetchError) {
      if (attempts < retryCount - 1) {
        console.warn(`Retrying fetch. Attempt ${attempts + 1}/${retryCount}`);
        return refetch(attempts + 1);
      } else {
        setError(fetchError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [fetchFunction, retryCount]);

  return { data, isLoading, error, refetch };
};

export default useFetchOnChain;
