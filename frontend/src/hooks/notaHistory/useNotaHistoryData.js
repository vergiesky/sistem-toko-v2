import { useCallback, useRef, useState } from 'react';
import { getNotas } from '../../api/apiNota.js';

const useNotaHistoryData = () => {
  const [notas, setNotas] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const requestIdRef = useRef(0);
  const lastParamsRef = useRef(null);

  const fetchNotas = useCallback(async (params = {}) => {
    const hasParams = Object.keys(params).length > 0;
    const mergedParams = hasParams ? params : (lastParamsRef.current || {});
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);
    setErrorMessage('');
    lastParamsRef.current = mergedParams;
    try {
      const response = await getNotas(mergedParams);
      if (requestIdRef.current !== requestId) {
        return;
      }
      const items = response?.data ?? [];
      const meta = response?.meta ?? {};
      setNotas(items);
      setPagination({
        page: meta.page ?? mergedParams.page ?? 1,
        perPage: meta.per_page ?? mergedParams.per_page ?? 10,
        total: meta.total ?? items.length,
        pages: meta.pages ?? 1,
      });
    } catch (error) {
      if (requestIdRef.current !== requestId) {
        return;
      }
      setErrorMessage(
        error?.response?.data?.message || 'Gagal mengambil data nota.',
      );
    } finally {
      if (requestIdRef.current !== requestId) {
        return;
      }
      setIsLoading(false);
    }
  }, []);

  return {
    notas,
    pagination,
    isLoading,
    errorMessage,
    fetchNotas,
  };
};

export default useNotaHistoryData;
