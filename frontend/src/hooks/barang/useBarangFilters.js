import { useMemo, useState } from 'react';

const useBarangFilters = (customers) => {
  const [query, setQuery] = useState('');
  const [stokFilter, setStokFilter] = useState('all');
  const [customerFilterId, setCustomerFilterId] = useState('');
  const [hargaMin, setHargaMin] = useState('');
  const [hargaMax, setHargaMax] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [customerFilterSearch, setCustomerFilterSearch] = useState('');
  const [isCustomerFilterOpen, setIsCustomerFilterOpen] = useState(false);
  const [draftStokFilter, setDraftStokFilter] = useState('all');
  const [draftHargaMin, setDraftHargaMin] = useState('');
  const [draftHargaMax, setDraftHargaMax] = useState('');
  const [draftCustomerFilterId, setDraftCustomerFilterId] = useState('');
  const [draftCustomerFilterSearch, setDraftCustomerFilterSearch] =
    useState('');

  const filteredFilterCustomers = useMemo(() => {
    const q = draftCustomerFilterSearch.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((customer) =>
      String(customer.nama_customer || '').toLowerCase().includes(q),
    );
  }, [customers, draftCustomerFilterSearch]);

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setDraftStokFilter(stokFilter);
      setDraftHargaMin(hargaMin);
      setDraftHargaMax(hargaMax);
      setDraftCustomerFilterId(customerFilterId);
      setDraftCustomerFilterSearch(customerFilterSearch);
      setIsCustomerFilterOpen(false);
    }
    setIsFilterOpen((prev) => !prev);
  };

  const applyFilters = () => {
    setStokFilter(draftStokFilter);
    setHargaMin(draftHargaMin);
    setHargaMax(draftHargaMax);
    setCustomerFilterId(draftCustomerFilterId);
    setCustomerFilterSearch(draftCustomerFilterSearch);
    setIsFilterOpen(false);
  };

  const cancelFilters = () => {
    setDraftStokFilter(stokFilter);
    setDraftHargaMin(hargaMin);
    setDraftHargaMax(hargaMax);
    setDraftCustomerFilterId(customerFilterId);
    setDraftCustomerFilterSearch(customerFilterSearch);
    setIsCustomerFilterOpen(false);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftStokFilter('all');
    setDraftHargaMin('');
    setDraftHargaMax('');
    setDraftCustomerFilterId('');
    setDraftCustomerFilterSearch('');
    setIsCustomerFilterOpen(false);
  };

  return {
    query,
    setQuery,
    stokFilter,
    setStokFilter,
    customerFilterId,
    setCustomerFilterId,
    hargaMin,
    setHargaMin,
    hargaMax,
    setHargaMax,
    isFilterOpen,
    setIsFilterOpen,
    customerFilterSearch,
    setCustomerFilterSearch,
    isCustomerFilterOpen,
    setIsCustomerFilterOpen,
    draftStokFilter,
    setDraftStokFilter,
    draftHargaMin,
    setDraftHargaMin,
    draftHargaMax,
    setDraftHargaMax,
    draftCustomerFilterId,
    setDraftCustomerFilterId,
    draftCustomerFilterSearch,
    setDraftCustomerFilterSearch,
    filteredFilterCustomers,
    toggleFilter,
    applyFilters,
    cancelFilters,
    resetFilters,
  };
};

export default useBarangFilters;
