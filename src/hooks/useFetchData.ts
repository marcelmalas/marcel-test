import { useState, useEffect } from "react";

const useFetchData = <T>(
  fetchDataFunction: () => Promise<T>
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        setLoading(true);
        setError(null);

        const response = await fetchDataFunction();

        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setData(null);
      setError(null);
      setLoading(false);
    };
  }, []);

  return { data, loading, error };
};

export default useFetchData;
