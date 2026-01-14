import { Plus } from 'lucide-react';
import Pagination from '../components/Pagination.jsx';
import CustomerSearch from '../components/customer/CustomerSearch.jsx';
import CustomerTable from '../components/customer/CustomerTable.jsx';
import AddCustomerPopup from '../components/customer/AddCustomerPopup.jsx';
import useCustomers from '../hooks/customer/useCustomers.js';
import Sidebar from '../components/Sidebar.jsx';

const Customer = () => {
  const pageSize = 10;
  const {
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
  } = useCustomers({ pageSize });

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,#fff3e8_0%,#fff7f0_35%,#fffdfb_100%)] text-[#3d2d24]">
      <div className="flex min-h-screen w-full flex-col md:flex-row md:flex-wrap">
        <Sidebar />

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#3f2b20]">
                Daftar Customer
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CustomerSearch
                query={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                type="button"
                onClick={handleAddCustomer}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2780c] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-18px_rgba(242,120,12,0.9)] transition hover:brightness-105 sm:w-auto"
              >
                <Plus size={18} />
                Tambah Customer
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#f0e1d4] bg-white shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)] overflow-hidden">
            <CustomerTable
              isLoading={isLoading}
              customers={pagedCustomers}
              page={page}
              pageSize={pageSize}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
            />
            <Pagination
              page={page}
              totalItems={totalItems}
              pageSize={pageSize}
              onChange={setPage}
            />
          </div>
        </main>
      </div>

      <AddCustomerPopup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        isSaving={isSaving}
        errorMessage={errorMessage}
        editingCustomerId={editingCustomerId}
      />
    </div>
  );
};

export default Customer;
