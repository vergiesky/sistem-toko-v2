import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from '../../api/apiCustomer.js';
import { alertConfirm } from '../../lib/alert.js';
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
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: pageSize,
    total: 0,
    pages: 1,
  });
  const [formData, setFormData] = useState(defaultFormData);
  const requestIdRef = useRef(0);
  const lastParamsRef = useRef(null);

  const fetchCustomers = useCallback(async (params = {}) => {
    const hasParams = Object.keys(params).length > 0;
    const mergedParams = hasParams ? params : (lastParamsRef.current || {});
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);
    setErrorMessage('');
    lastParamsRef.current = mergedParams;
    try {
      const response = await getCustomers(mergedParams);
      if (requestIdRef.current !== requestId) {
        return;
      }
      const items = response?.data ?? [];
      const meta = response?.meta ?? {};
      setCustomers(items);
      setPagination({
        page: meta.page ?? mergedParams.page ?? 1,
        perPage: meta.per_page ?? mergedParams.per_page ?? pageSize,
        total: meta.total ?? items.length,
        pages: meta.pages ?? 1,
      });
    } catch (error) {
      if (requestIdRef.current !== requestId) {
        return;
      }
      setErrorMessage(
        error?.response?.data?.message || 'Gagal mengambil data customer.',
      );
    } finally {
      if (requestIdRef.current !== requestId) {
        return;
      }
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    const params = {
      page,
      per_page: pageSize,
    };
    if (query.trim() !== '') {
      params.query = query.trim();
    }
    fetchCustomers(params);
  }, [fetchCustomers, page, pageSize, query]);

  useEffect(() => {
    if (pagination.pages && page > pagination.pages) {
      setPage(pagination.pages);
    }
  }, [page, pagination.pages]);

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
    totalItems: pagination.total,
    pagedCustomers: customers,
  };
};

export default useCustomers;
