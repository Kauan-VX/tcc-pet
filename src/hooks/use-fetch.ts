'use client';

import { useEffect, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setStatus('loading');

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!signal.aborted) {
          setData(result);
          setStatus('success');
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error as Error);
          setStatus('error');
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, status, error, isLoading: status === 'loading' };
}
