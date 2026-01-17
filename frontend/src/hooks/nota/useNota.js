import { useEffect, useState } from 'react';
import { getCustomers } from '../../api/apiCustomer.js';
import { getBarangs } from '../../api/apiBarang.js';
import { getNextNotaNumber } from '../../api/apiNota.js';
import { getBarangHargaCustomers } from '../../api/apiBarangHargaCustomer.js';
import useNotaItems from './useNotaItems.js';
import useNotaPricing from './useNotaPricing.js';
import useNotaPrint from './useNotaPrint.js';

const NOTA_DRAFT_KEY = 'nota:draft:v1';

const serializeCustomer = (customer) => {
  if (!customer) return null;
  return {
    id_customer: customer.id_customer ?? null,
    nama_customer: customer.nama_customer ?? '',
    nama_perusahaan: customer.nama_perusahaan ?? '',
    alamat: customer.alamat ?? '',
  };
};

const readNotaDraft = () => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(NOTA_DRAFT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const useNota = () => {
  const draft = readNotaDraft();
  const [customers, setCustomers] = useState([]);
  const [barangs, setBarangs] = useState([]);
  const [barangHargaCustomers, setBarangHargaCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState(
    draft.customerSearch ?? '',
  );
  const [selectedCustomer, setSelectedCustomer] = useState(
    draft.selectedCustomer ?? null,
  );
  const [draftCustomerId, setDraftCustomerId] = useState(
    draft.selectedCustomerId ?? draft.selectedCustomer?.id_customer ?? null,
  );
  const [notaNumber, setNotaNumber] = useState(1);
  const { items, addItem, removeItem, setItems, updateItem } = useNotaItems(
    Array.isArray(draft.items) ? draft.items : [],
  );

  useEffect(() => {
    const fetchNextNotaNumber = async () => {
      try {
        const response = await getNextNotaNumber();
        setNotaNumber(Number(response.next_number) || 1);
      } catch {
        setNotaNumber(1);
      }
    };
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers({ per_page: 0 });
        setCustomers(response.data ?? []);
      } catch {
        setCustomers([]);
      }
    };
    const fetchBarangs = async () => {
      try {
        const response = await getBarangs({ per_page: 0 });
        setBarangs(response.data ?? []);
      } catch {
        setBarangs([]);
      }
    };
    const fetchBarangHargaCustomers = async () => {
      try {
        const response = await getBarangHargaCustomers();
        setBarangHargaCustomers(response.data ?? []);
      } catch {
        setBarangHargaCustomers([]);
      }
    };
    fetchCustomers();
    fetchBarangs();
    fetchBarangHargaCustomers();
    fetchNextNotaNumber();
  }, []);

  useEffect(() => {
    if (!draftCustomerId) return;
    const match = customers.find(
      (customer) => String(customer.id_customer) === String(draftCustomerId),
    );
    if (match) {
      setSelectedCustomer(match);
    }
  }, [customers, draftCustomerId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nextDraft = {
      customerSearch,
      selectedCustomerId: selectedCustomer?.id_customer ?? null,
      selectedCustomer: serializeCustomer(selectedCustomer),
      items,
    };
    window.localStorage.setItem(NOTA_DRAFT_KEY, JSON.stringify(nextDraft));
    setDraftCustomerId(selectedCustomer?.id_customer ?? null);
  }, [customerSearch, items, selectedCustomer]);

  const handleAddItem = addItem;
  const handleRemoveItem = removeItem;

  const { getItemProduct, getItemUnitPrice, totalHarga, pageTotals, printPages } =
    useNotaPricing({
      items,
      barangs,
      barangHargaCustomers,
      selectedCustomer,
    });

  const clearDraft = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(NOTA_DRAFT_KEY);
    }
    setCustomerSearch('');
    setSelectedCustomer(null);
    setDraftCustomerId(null);
    setItems([]);
  };

  const { handlePrint } = useNotaPrint({
    items,
    getItemUnitPrice,
    selectedCustomer,
    customerSearch,
    notaNumber,
    totalHarga,
    setNotaNumber,
    onAfterPrintSuccess: clearDraft,
  });

  return {
    customerSearch,
    customers,
    getItemProduct,
    getItemUnitPrice,
    handleAddItem,
    handlePrint,
    handleRemoveItem,
    items,
    notaNumber,
    pageTotals,
    printPages,
    barangs,
    selectedCustomer,
    setCustomerSearch,
    setSelectedCustomer,
    totalHarga,
    updateItem,
  };
};

export default useNota;
