import { useEffect, useState } from 'react';
import { getCustomers } from '../../api/apiCustomer.js';
import { getBarangs } from '../../api/apiBarang.js';
import { getNextNotaNumber } from '../../api/apiNota.js';
import { getBarangHargaCustomers } from '../../api/apiBarangHargaCustomer.js';
import useNotaItems from './useNotaItems.js';
import useNotaPricing from './useNotaPricing.js';
import useNotaPrint from './useNotaPrint.js';

const useNota = () => {
  const [customers, setCustomers] = useState([]);
  const [barangs, setBarangs] = useState([]);
  const [barangHargaCustomers, setBarangHargaCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notaNumber, setNotaNumber] = useState(1);
  const { items, addItem, removeItem, updateItem } = useNotaItems();

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
        const response = await getCustomers();
        setCustomers(response.data ?? []);
      } catch {
        setCustomers([]);
      }
    };
    const fetchBarangs = async () => {
      try {
        const response = await getBarangs();
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

  const handleAddItem = addItem;
  const handleRemoveItem = removeItem;

  const { getItemProduct, getItemUnitPrice, totalHarga, pageTotals, printPages } =
    useNotaPricing({
      items,
      barangs,
      barangHargaCustomers,
      selectedCustomer,
    });

  const { handlePrint } = useNotaPrint({
    items,
    getItemUnitPrice,
    selectedCustomer,
    customerSearch,
    notaNumber,
    totalHarga,
    setNotaNumber,
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
