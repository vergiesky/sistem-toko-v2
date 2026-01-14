import { useEffect, useMemo, useState } from 'react';
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from '../../api/apiCustomer.js';
import { alertConfirm } from '../../lib/alert.js';
import { filterCustomers } from '../../lib/filterCustomers.js';
import { paginateItems } from '../../lib/paginate.js';
import { toastError, toastSuccess } from '../../lib/toastUtils.js';

const defaultFormData = {
  nama_customer: '',
  nama_perusahaan: '',
  alamat: '',
};

const useCustomers = ({ pageSize = 10 } = {}) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState(defaultFormData);

  const filteredCustomers = useMemo(
    () => filterCustomers(customers, query),
    [customers, query],
  );
  const { totalItems, totalPages, pagedItems: pagedCustomers } = useMemo(
    () => paginateItems(filteredCustomers, page, pageSize),
    [filteredCustomers, page, pageSize],
  );

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await getCustomers();
      console.log(response);
      const items = response.data ?? [];
      const sorted = [...items].sort(
        (a, b) => Number(b.id_customer) - Number(a.id_customer),
      );
      setCustomers(sorted);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Gagal mengambil data customer.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSaving(true);
    try {
      if (editingCustomerId) {
        const { isConfirmed } = await alertConfirm({
          title: 'Konfirmasi',
          text: 'Simpan perubahan customer ini?',
          confirmButtonText: 'Ya, simpan',
          cancelButtonText: 'Batal',
          icon: 'warning',
        });
        if (!isConfirmed) return;
        await updateCustomer(editingCustomerId, formData);
        toastSuccess('Customer berhasil diperbarui.');
      } else {
        await createCustomer(formData);
        toastSuccess('Customer berhasil ditambahkan.');
      }
      setFormData(defaultFormData);
      setEditingCustomerId(null);
      setIsModalOpen(false);
      fetchCustomers();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        (editingCustomerId
          ? 'Gagal memperbarui customer.'
          : 'Gagal menambahkan customer.');
      setErrorMessage(message);
      toastError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCustomer = () => {
    setFormData(defaultFormData);
    setEditingCustomerId(null);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditCustomer = (customer) => {
    setFormData({
      nama_customer: customer.nama_customer || '',
      nama_perusahaan: customer.nama_perusahaan || '',
      alamat: customer.alamat || '',
    });
    setEditingCustomerId(customer.id_customer);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (customer) => {
    const { isConfirmed } = await alertConfirm({
      title: 'Konfirmasi',
      text: 'Hapus customer ini?',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      icon: 'warning',
    });
    if (!isConfirmed) return;
    setIsSaving(true);
    setErrorMessage('');
    try {
      await deleteCustomer(customer.id_customer);
      fetchCustomers();
      toastSuccess('Customer berhasil dihapus.');
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Gagal menghapus customer.';
      setErrorMessage(message);
      toastError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    customers,
    isLoading,
    isSaving,
    errorMessage,
    isModalOpen,
    editingCustomerId,
    page,
    setPage,
    query,
    setQuery,
    formData,
    handleChange,
    handleSubmit,
    handleAddCustomer,
    handleCloseModal,
    handleEditCustomer,
    handleDeleteCustomer,
    totalItems,
    pagedCustomers,
  };
};

export default useCustomers;
