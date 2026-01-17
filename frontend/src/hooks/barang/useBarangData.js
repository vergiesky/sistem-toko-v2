import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteBarang, getBarangs } from '../../api/apiBarang.js';
import { getCustomers } from '../../api/apiCustomer.js';
import { getBarangHargaCustomers } from '../../api/apiBarangHargaCustomer.js';
import { alertConfirm } from '../../lib/alert.js';
import { toastError, toastSuccess } from '../../lib/toastUtils.js';

const useBarangData = () => {
  const [barangs, setBarangs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [barangHargaCustomers, setBarangHargaCustomers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dataError, setDataError] = useState('');
  const lastParamsRef = useRef(null);
  const requestIdRef = useRef(0);

  const fetchBarangs = useCallback(async (params = {}) => {
    const hasParams = Object.keys(params).length > 0;
    const mergedParams = hasParams ? params : (lastParamsRef.current || {});
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);
    setDataError('');
    lastParamsRef.current = mergedParams;
    try {
      const response = await getBarangs(mergedParams);
      if (requestIdRef.current !== requestId) {
        return;
      }
      const items = response?.data ?? [];
      const meta = response?.meta ?? {};
      setBarangs(items);
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
      setDataError(
        error?.response?.data?.message || 'Gagal mengambil data barang.',
      );
    } finally {
      if (requestIdRef.current !== requestId) {
        return;
      }
      setIsLoading(false);
    }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await getCustomers({ per_page: 0 });
      setCustomers(response.data ?? []);
    } catch {
      setCustomers([]);
    }
  }, []);

  const fetchBarangHargaCustomers = useCallback(async () => {
    try {
      const response = await getBarangHargaCustomers();
      setBarangHargaCustomers(response.data ?? []);
    } catch {
      setBarangHargaCustomers([]);
    }
  }, []);

  const handleDeleteBarang = useCallback(async (barang) => {
    const { isConfirmed } = await alertConfirm({
      title: 'Konfirmasi',
      text: 'Hapus barang ini?',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      icon: 'warning',
    });
    if (!isConfirmed) return;
    setIsDeleting(true);
    setDataError('');
    try {
      await deleteBarang(barang.id_barang);
      fetchBarangs(lastParamsRef.current || {});
      toastSuccess('Barang berhasil dihapus.');
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Gagal menghapus barang.';
      setDataError(message);
      toastError(message);
    } finally {
      setIsDeleting(false);
    }
  }, [fetchBarangs]);

  useEffect(() => {
    fetchCustomers();
    fetchBarangHargaCustomers();
  }, [fetchBarangs, fetchCustomers, fetchBarangHargaCustomers]);


  return {
    barangs,
    customers,
    barangHargaCustomers,
    pagination,
    isLoading,
    isDeleting,
    dataError,
    fetchBarangs,
    fetchCustomers,
    fetchBarangHargaCustomers,
    handleDeleteBarang,
  };
};

export default useBarangData;
