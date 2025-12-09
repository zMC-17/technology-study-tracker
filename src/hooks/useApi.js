import { useState, useEffect, useCallback } from 'react';

// Универсальный хук для работы с любым API
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (abortController) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        ...options,
        signal: abortController?.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      }

      const result = await response.json();
      setData(result);

    } catch (err) {
      // Игнорируем ошибки отмены запроса
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Автоматический запрос при изменении URL
  useEffect(() => {
    const abortController = new AbortController();

    if (url) {
      fetchData(abortController);
    }

    // Отменяем запрос при размонтировании
    return () => {
      abortController.abort();
    };
  }, [url, fetchData]);

  // Функция для повторного запроса
  const refetch = useCallback(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    return () => abortController.abort();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useApi;