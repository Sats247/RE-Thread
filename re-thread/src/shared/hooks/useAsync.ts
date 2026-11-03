import { useState, useEffect, useCallback, useRef } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface AsyncState<T> {
  data: T | null;
  status: Status;
  error: Error | null;
  reload: () => void;
}

export function useAsync<T>(
  fn: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | null>(null);
  const counter = useRef(0);

  const execute = useCallback(() => {
    const id = ++counter.current;
    setStatus('loading');
    setError(null);
    fn()
      .then((result) => {
        if (id === counter.current) {
          setData(result);
          setStatus('success');
        }
      })
      .catch((err) => {
        if (id === counter.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setStatus('error');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, status, error, reload: execute };
}

