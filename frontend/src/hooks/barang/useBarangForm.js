import { useMemo, useState } from 'react';
import { createBarang, updateBarang } from '../../api/apiBarang.js';
import {
  createBarangHargaCustomer,
  updateBarangHargaCustomer,
} from '../../api/apiBarangHargaCustomer.js';
import { alertConfirm } from '../../lib/alert.js';
import { toastError, toastSuccess } from '../../lib/toastUtils.js';

const defaultFormData = {
  nama_barang: '',
  stok: '',
  harga_tetap: '',
};

const useBarangForm = ({
  customers,
  barangHargaCustomers,
  customerFilterId,
  onRefreshBarangs,
  onRefreshBarangHargaCustomers,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBarangId, setEditingBarangId] = useState(null);
  const [customerKhususId, setCustomerKhususId] = useState('');
  const [hargaKhusus, setHargaKhusus] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const filteredCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((customer) =>
      String(customer.nama_customer || '').toLowerCase().includes(q),
    );
  }, [customers, customerSearch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormState = () => {
    setFormData(defaultFormData);
    setCustomerKhususId('');
    setHargaKhusus('');
    setCustomerSearch('');
    setIsCustomerOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSaving(true);
    if (customerKhususId && !hargaKhusus) {
      setIsSaving(false);
      setErrorMessage('Harga khusus wajib diisi untuk customer terpilih.');
      return;
    }
    if (!customerKhususId && hargaKhusus) {
      setIsSaving(false);
      setErrorMessage('Pilih customer untuk harga khusus.');
      return;
    }
    try {
      if (editingBarangId) {
        const { isConfirmed } = await alertConfirm({
          title: 'Konfirmasi',
          text: 'Simpan perubahan barang ini?',
          confirmButtonText: 'Ya, simpan',
          cancelButtonText: 'Batal',
          icon: 'warning',
        });
        if (!isConfirmed) return;
        await updateBarang(editingBarangId, formData);
        if (customerKhususId && hargaKhusus) {
          const existing = barangHargaCustomers.find(
            (item) =>
              String(item.id_barang) === String(editingBarangId) &&
              String(item.id_customer) === String(customerKhususId),
          );
          const payload = {
            id_barang: editingBarangId,
            id_customer: customerKhususId,
            harga_khusus: hargaKhusus,
          };
          if (existing) {
            await updateBarangHargaCustomer(
              existing.id_barang_harga_customer,
              payload,
            );
          } else {
            await createBarangHargaCustomer(payload);
          }
        }
        toastSuccess('Barang berhasil diperbarui.');
      } else {
        const response = await createBarang(formData);
        const newBarangId = response?.data?.id_barang;
        if (customerKhususId && hargaKhusus && newBarangId) {
          await createBarangHargaCustomer({
            id_barang: newBarangId,
            id_customer: customerKhususId,
            harga_khusus: hargaKhusus,
          });
        }
        toastSuccess('Barang berhasil ditambahkan.');
      }
      resetFormState();
      setEditingBarangId(null);
      setIsModalOpen(false);
      onRefreshBarangs();
      onRefreshBarangHargaCustomers();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        (editingBarangId
          ? 'Gagal memperbarui barang.'
          : 'Gagal menambahkan barang.');
      setErrorMessage(message);
      toastError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddBarang = () => {
    resetFormState();
    setEditingBarangId(null);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleEditBarang = (barang) => {
    setFormData({
      nama_barang: barang.nama_barang || '',
      stok: barang.stok ?? '',
      harga_tetap: barang.harga_tetap ?? '',
    });
    setEditingBarangId(barang.id_barang);
    if (customerFilterId) {
      const selected = customers.find(
        (customer) => String(customer.id_customer) === String(customerFilterId),
      );
      const existingHarga = barangHargaCustomers.find(
        (item) =>
          String(item.id_barang) === String(barang.id_barang) &&
          String(item.id_customer) === String(customerFilterId),
      );
      setCustomerKhususId(customerFilterId);
      setCustomerSearch(selected?.nama_customer || '');
      setHargaKhusus(existingHarga?.harga_khusus || '');
    } else {
      setCustomerKhususId('');
      setHargaKhusus('');
      setCustomerSearch('');
    }
    setIsCustomerOpen(false);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleAddBarang,
    handleEditBarang,
    isSaving,
    setIsSaving,
    errorMessage,
    setErrorMessage,
    isModalOpen,
    setIsModalOpen,
    editingBarangId,
    customerKhususId,
    setCustomerKhususId,
    hargaKhusus,
    setHargaKhusus,
    customerSearch,
    setCustomerSearch,
    isCustomerOpen,
    setIsCustomerOpen,
    filteredCustomers,
  };
};

export default useBarangForm;
