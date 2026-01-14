import { useEffect, useState } from 'react';
import { getNotas } from '../../api/apiNota.js';

const useNotaHistoryData = () => {
  const [notas, setNotas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotas = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getNotas();
      setNotas(response.data ?? []);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Gagal mengambil data nota.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  return {
    notas,
    isLoading,
    errorMessage,
    fetchNotas,
  };
};

export default useNotaHistoryData;
