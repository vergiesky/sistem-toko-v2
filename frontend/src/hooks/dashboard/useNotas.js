import { useEffect, useState } from 'react';
import { getNotas } from '../../api/apiNota.js';

const useNotas = () => {
  const [notas, setNotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotas = async () => {
    setIsRefreshing(true);
    setErrorMessage('');
    try {
      const response = await getNotas({ per_page: 0 });
      setNotas(response.data ?? []);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Gagal mengambil data penjualan.',
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  return {
    notas,
    isLoading,
    isRefreshing,
    errorMessage,
    fetchNotas,
  };
};

export default useNotas;
