import { useCallback, useEffect, useState } from 'react';
import { deleteBarang, getBarangs } from '../../api/apiBarang.js';
import { getCustomers } from '../../api/apiCustomer.js';
import { getBarangHargaCustomers } from '../../api/apiBarangHargaCustomer.js';
import { alertConfirm } from '../../lib/alert.js';
import { toastError, toastSuccess } from '../../lib/toastUtils.js';

const useBarangData = () => {
  const [barangs, setBarangs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [barangHargaCustomers, setBarangHargaCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dataError, setDataError] = useState('');

  const fetchBarangs = useCallback(async () => {
    setIsLoading(true);
    setDataError('');
    try {
      const response = await getBarangs();
      const items = response.data ?? [];
      const sorted = [...items].sort(
        (a, b) => Number(b.id_barang) - Number(a.id_barang),
      );
      setBarangs(sorted);
    } catch (error) {
      setDataError(
        error?.response?.data?.message || 'Gagal mengambil data barang.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await getCustomers();
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
      fetchBarangs();
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
    fetchBarangs();
    fetchCustomers();
    fetchBarangHargaCustomers();
  }, [fetchBarangs, fetchCustomers, fetchBarangHargaCustomers]);


  return {
    barangs,
    customers,
    barangHargaCustomers,
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