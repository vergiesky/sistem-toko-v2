import { Printer } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';
import NotaHeader from '../components/nota/NotaHeader.jsx';
import NotaItemsTable from '../components/nota/NotaItemsTable.jsx';
import NotaPrintPage from '../components/nota/NotaPrintPage.jsx';
import formatDate from '../lib/formatDate.js';
import useNota from '../hooks/nota/useNota.js';
import '../styles/notaPrint.css';
const Nota = () => {
  const {
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
  } = useNota();
  const todayLabel = formatDate(new Date());

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,#fff3e8_0%,#fff7f0_35%,#fffdfb_100%)] text-[#3d2d24]">
        <div className="flex min-h-screen w-full flex-col md:flex-row md:flex-wrap">
          <Sidebar />

          <main className="min-w-0 flex-1 px-6 py-8 lg:px-10 print:p-0 print:bg-white">
            <div className="hidden print:block">
              {printPages.map((page, pageIndex) => (
                <div key={`print-page-${pageIndex}`} className="print-page">
                  <NotaPrintPage
                    pageItems={page.items}
                    pageTotal={pageTotals[pageIndex] || 0}
                    notaNumber={notaNumber}
                    customerName={customerSearch.trim()}
                    selectedCustomer={selectedCustomer}
                    date={todayLabel}
                    getItemProduct={getItemProduct}
                    getItemUnitPrice={getItemUnitPrice}
                    blankRows={page.blanks.length}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div>
                <h2 className="text-2xl font-semibold text-[#3f2b20]">
                  Buat Nota
                </h2>
                <p className="mt-1 text-sm text-[#7a6151]">
                  Isi detail nota dan cetak
                </p>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl bg-[#f2780c] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-18px_rgba(242,120,12,0.9)] transition hover:brightness-105"
              >
                <Printer size={18} />
                Cetak
              </button>
            </div>

            <div className="mt-6 rounded-3xl border border-[#f0e1d4] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)] relative overflow-hidden print:hidden">
              <img
                src="/logo.jpg"
                alt="logo"
                className="pointer-events-none absolute inset-0 m-auto w-[60%] opacity-10 print-watermark"
              />

              <div className="relative print-container">
                <div className="overflow-x-auto md:overflow-visible print:overflow-visible">
                  <div className="min-w-180">
                    <NotaHeader
                      notaNumber={notaNumber}
                      date={todayLabel}
                      customerName={customerSearch.trim()}
                      selectedCustomer={selectedCustomer}
                      customerAutocompleteProps={{
                        value: customerSearch,
                        onChange: setCustomerSearch,
                        customers,
                        onSelectCustomer: setSelectedCustomer,
                        selectedCustomer,
                        placeholder: 'Ketik nama customer...',
                      }}
                    />
                    <NotaItemsTable
                      items={items}
                      barangs={barangs}
                      getItemProduct={getItemProduct}
                      getItemUnitPrice={getItemUnitPrice}
                      onAddItem={handleAddItem}
                      onUpdateItem={updateItem}
                      onRemoveItem={handleRemoveItem}
                      totalHarga={totalHarga}
                      selectedCustomer={selectedCustomer}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Nota;
