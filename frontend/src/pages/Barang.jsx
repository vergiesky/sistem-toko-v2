import { useEffect, useMemo, useState } from 'react';
import AddBarangPopup from '../components/barang/AddBarangPopup.jsx';
import Pagination from '../components/Pagination.jsx';
import BarangTable from '../components/barang/BarangTable.jsx';
import BarangToolbar from '../components/barang/BarangToolbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import useBarangData from '../hooks/barang/useBarangData.js';
import useBarangFilters from '../hooks/barang/useBarangFilters.js';
import useBarangForm from '../hooks/barang/useBarangForm.js';
import useBarangImport from '../hooks/barang/useBarangImport.js';
import filterBarangs from '../lib/barang/filterBarangs.js';
import { paginateItems } from '../lib/paginate.js';

const PAGE_SIZE = 10;

const Barang = () => {
  const {
    barangs,
    customers,
    barangHargaCustomers,
    isLoading,
    fetchBarangs,
    fetchBarangHargaCustomers,
    handleDeleteBarang,
  } = useBarangData();
  const [page, setPage] = useState(1);
  const {
    query,
    setQuery,
    stokFilter,
    customerFilterId,
    hargaMin,
    hargaMax,
    isFilterOpen,
    isCustomerFilterOpen,
    draftStokFilter,
    draftHargaMin,
    draftHargaMax,
    draftCustomerFilterId,
    draftCustomerFilterSearch,
    filteredFilterCustomers,
    setDraftStokFilter,
    setDraftHargaMin,
    setDraftHargaMax,
    setDraftCustomerFilterId,
    setDraftCustomerFilterSearch,
    setIsCustomerFilterOpen,
    toggleFilter,
    applyFilters,
    cancelFilters,
    resetFilters,
  } = useBarangFilters(customers);
  const {
    formData,
    handleChange,
    handleSubmit,
    handleAddBarang,
    handleEditBarang,
    isSaving,
    errorMessage,
    isModalOpen,
    setIsModalOpen,
    editingBarangId,
    setCustomerKhususId,
    hargaKhusus,
    setHargaKhusus,
    customerSearch,
    setCustomerSearch,
    isCustomerOpen,
    setIsCustomerOpen,
    filteredCustomers,
  } = useBarangForm({
    customers,
    barangHargaCustomers,
    customerFilterId,
    onRefreshBarangs: fetchBarangs,
    onRefreshBarangHargaCustomers: fetchBarangHargaCustomers,
  });

  const {
    importError,
    isImporting,
    handleImportExcel,
    resetImportState,
  } = useBarangImport({
    customers,
    barangs,
    barangHargaCustomers,
    onRefreshBarangs: fetchBarangs,
    onRefreshBarangHargaCustomers: fetchBarangHargaCustomers,
  });

  const handleAddBarangWithImportReset = () => {
    handleAddBarang();
    resetImportState();
  };

  const handleEditBarangWithImportReset = (barang) => {
    handleEditBarang(barang);
    resetImportState();
  };

  const filteredBarangs = useMemo(
    () =>
      filterBarangs({
        barangs,
        query,
        stokFilter,
        hargaMin,
        hargaMax,
      }),
    [barangs, query, stokFilter, hargaMin, hargaMax],
  );

  const totalItems = filteredBarangs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedBarangs = useMemo(
    () => paginateItems(filteredBarangs, safePage, PAGE_SIZE).pagedItems,
    [filteredBarangs, safePage],
  );

  useEffect(() => {
    fetchBarangs();
  }, [fetchBarangs]);

  const handleQueryChange = (event) => {
    setPage(1);
    setQuery(event.target.value);
  };

  const handleApplyFiltersWithReset = () => {
    applyFilters();
    setPage(1);
  };

  const handleResetFiltersWithReset = () => {
    resetFilters();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,#fff3e8_0%,#fff7f0_35%,#fffdfb_100%)] text-[#3d2d24]">
      <div className="flex min-h-screen w-full flex-col md:flex-row md:flex-wrap">
        <Sidebar />

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <BarangToolbar
            query={query}
            onQueryChange={handleQueryChange}
            onToggleFilter={toggleFilter}
            isFilterOpen={isFilterOpen}
            onAddBarang={handleAddBarangWithImportReset}
            filterPanelProps={{
              draftStokFilter,
              onDraftStokFilterChange: (event) =>
                setDraftStokFilter(event.target.value),
              draftHargaMin,
              onDraftHargaMinChange: (event) =>
                setDraftHargaMin(event.target.value),
              draftHargaMax,
              onDraftHargaMaxChange: (event) =>
                setDraftHargaMax(event.target.value),
              draftCustomerFilterId,
              draftCustomerFilterSearch,
              onDraftCustomerFilterSearchChange: (event) => {
                setDraftCustomerFilterSearch(event.target.value);
                setIsCustomerFilterOpen(true);
                setDraftCustomerFilterId('');
              },
              onDraftCustomerFocus: () => setIsCustomerFilterOpen(true),
              onDraftCustomerBlur: () => {
                setTimeout(() => setIsCustomerFilterOpen(false), 120);
              },
              isCustomerFilterOpen,
              onClearCustomerFilter: () => {
                setDraftCustomerFilterId('');
                setDraftCustomerFilterSearch('');
                setIsCustomerFilterOpen(false);
              },
              filteredFilterCustomers,
              onSelectCustomerFilter: (customer) => {
                setDraftCustomerFilterId(customer.id_customer);
                setDraftCustomerFilterSearch(customer.nama_customer);
                setIsCustomerFilterOpen(false);
              },
              onApplyFilters: handleApplyFiltersWithReset,
              onCancelFilters: cancelFilters,
              onResetFilters: handleResetFiltersWithReset,
            }}
          />

          <div className="mt-6 rounded-2xl border border-[#f0e1d4] bg-white shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)] overflow-hidden">
            <BarangTable
              isLoading={isLoading}
              filteredCount={totalItems}
              pagedBarangs={pagedBarangs}
              page={safePage}
              pageSize={PAGE_SIZE}
              customerFilterId={customerFilterId}
              barangHargaCustomers={barangHargaCustomers}
              onEdit={handleEditBarangWithImportReset}
              onDelete={handleDeleteBarang}
            />
            <Pagination
              page={safePage}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onChange={setPage}
            />
          </div>
        </main>
      </div>

      <AddBarangPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editingBarangId={editingBarangId}
        isImporting={isImporting}
        onImportExcel={handleImportExcel}
        importError={importError}
        formData={formData}
        onChange={handleChange}
        customerSearch={customerSearch}
        onCustomerSearchChange={(event) => {
          setCustomerSearch(event.target.value);
          setIsCustomerOpen(true);
          setCustomerKhususId('');
        }}
        onCustomerFocus={() => setIsCustomerOpen(true)}
        onCustomerBlur={() => {
          setTimeout(() => setIsCustomerOpen(false), 120);
        }}
        isCustomerOpen={isCustomerOpen}
        filteredCustomers={filteredCustomers}
        onClearCustomer={() => {
          setCustomerKhususId('');
          setCustomerSearch('');
          setIsCustomerOpen(false);
        }}
        onSelectCustomer={(customer) => {
          setCustomerKhususId(customer.id_customer);
          setCustomerSearch(customer.nama_customer);
          setIsCustomerOpen(false);
        }}
        hargaKhusus={hargaKhusus}
        onHargaKhususChange={(event) => setHargaKhusus(event.target.value)}
        errorMessage={errorMessage}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Barang;