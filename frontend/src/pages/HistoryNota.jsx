import { useEffect, useMemo, useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import Sidebar from '../components/Sidebar.jsx';
import HistoryNotaToolbar from '../components/notaHistory/HistoryNotaToolbar.jsx';
import NotaHistoryCard from '../components/notaHistory/NotaHistoryCard.jsx';
import NotaPreviewPopup from '../components/notaHistory/NotaPreviewPopup.jsx';
import HistoryNotaPrintPage from '../components/notaHistory/HistoryNotaPrintPage.jsx';
import { deleteNota } from '../api/apiNota.js';
import useNotaHistoryData from '../hooks/notaHistory/useNotaHistoryData.js';
import useNotaHistoryFilters from '../hooks/notaHistory/useNotaHistoryFilters.js';
import useNotaPreview from '../hooks/notaHistory/useNotaPreview.js';
import { alertConfirm } from '../lib/alert.js';
import formatDate from '../lib/formatDate.js';
import formatRupiah from '../lib/formatRupiah.js';
import splitIntoPages from '../lib/splitIntoPages.js';
import { toastError, toastSuccess } from '../lib/toastUtils.js';
import '../styles/notaHistoryPrint.css';
import '../styles/notaPreview.css';

const HistoryNota = () => {
  const { notas, pagination, isLoading, errorMessage, fetchNotas } =
    useNotaHistoryData();
  const [deletingId, setDeletingId] = useState(null);
  const [page, setPage] = useState(1);
  const [printNota, setPrintNota] = useState(null);
  const {
    query,
    setQuery,
    dateFrom,
    dateTo,
    isFilterOpen,
    draftDateFrom,
    draftDateTo,
    setDraftDateFrom,
    setDraftDateTo,
    toggleFilter,
    applyFilter,
    cancelFilter,
    resetFilter,
  } = useNotaHistoryFilters();
  const pageSize = 10;
  const {
    previewNota,
    previewZoom,
    openPreview,
    closePreview,
    zoomIn,
    zoomOut,
    resetZoom,
  } = useNotaPreview();

  const printPages = useMemo(() => {
    if (!printNota) return [];
    const details = printNota.detail_notas || printNota.detailNotas || [];
    const pages = splitIntoPages(details, 15);
    return pages.map((pageDetails) => ({
      pageDetails,
      total: pageDetails.reduce(
        (sum, detail) => sum + Number(detail.sub_total || 0),
        0,
      ),
    }));
  }, [printNota]);

  useEffect(() => {
    if (!printNota) return undefined;
    const handleAfterPrint = () => setPrintNota(null);
    window.addEventListener('afterprint', handleAfterPrint);
    const timer = setTimeout(() => {
      window.print();
    }, 100);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [printNota]);

  useEffect(() => {
    const params = {
      page,
      per_page: pageSize,
    };
    if (query.trim() !== '') {
      params.query = query.trim();
    }
    if (dateFrom) {
      params.date_from = dateFrom;
    }
    if (dateTo) {
      params.date_to = dateTo;
    }
    fetchNotas(params);
  }, [fetchNotas, page, pageSize, query, dateFrom, dateTo]);

  useEffect(() => {
    if (pagination.pages && page > pagination.pages) {
      setPage(pagination.pages);
    }
  }, [page, pagination.pages]);

  const handleDeleteNota = async (nota) => {
    const { isConfirmed } = await alertConfirm({
      title: 'Konfirmasi',
      text: 'Hapus nota ini?',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      icon: 'warning',
    });
    if (!isConfirmed) return;
    setDeletingId(nota.id_nota);
    try {
      await deleteNota(nota.id_nota);
      await fetchNotas();
      toastSuccess('Nota berhasil dihapus.');
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Gagal menghapus nota.';
      toastError(message);
    } finally {
      setDeletingId(null);
    }
  };

  const handlePrintNota = (nota) => {
    setPrintNota(nota);
  };

  const printCustomerName =
    printNota?.customers?.nama_customer || printNota?.nama_customer || '';
  const printSelectedCustomer =
    printNota?.customers ||
    (printNota?.nama_perusahaan || printNota?.alamat
      ? { nama_perusahaan: printNota?.nama_perusahaan, alamat: printNota?.alamat }
      : null);
  const printNotaNumber = String(printNota?.nomor_nota || '').padStart(3, '0');
  const printDate = printNota ? formatDate(printNota.tanggal) : '';

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,#fff3e8_0%,#fff7f0_35%,#fffdfb_100%)] text-[#3d2d24]">
      <div className="flex min-h-screen w-full flex-col md:flex-row md:flex-wrap">
        <Sidebar />

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10 print:p-0 print:bg-white">
          {printNota && (
            <div className="hidden print:block">
              {printPages.map((page, pageIndex) => (
                <div key={`print-page-${pageIndex}`} className="print-page">
                  <HistoryNotaPrintPage
                    pageDetails={page.pageDetails}
                    pageTotal={page.total}
                    notaNumber={printNotaNumber}
                    customerName={printCustomerName}
                    selectedCustomer={printSelectedCustomer}
                    date={printDate}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="print:hidden">
            <HistoryNotaToolbar
              query={query}
              onQueryChange={(value) => {
                setPage(1);
                setQuery(value);
              }}
              isFilterOpen={isFilterOpen}
              toggleFilter={toggleFilter}
              draftDateFrom={draftDateFrom}
              draftDateTo={draftDateTo}
              onDraftDateFromChange={setDraftDateFrom}
              onDraftDateToChange={setDraftDateTo}
              onApplyFilter={() => {
                applyFilter();
                setPage(1);
              }}
              onCancelFilter={cancelFilter}
              onResetFilter={() => {
                resetFilter();
                setPage(1);
              }}
            />

            {errorMessage && (
              <div className="mt-4 rounded-2xl border border-[#f4c7b6] bg-[#fff1ea] px-4 py-3 text-sm text-[#9a3412]">
                {errorMessage}
              </div>
            )}

            <div className="mt-6 space-y-4">
              {isLoading ? (
                <div className="rounded-2xl border border-[#f0e1d4] bg-white px-6 py-8 text-center text-sm text-[#9a8678] shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)]">
                  Memuat data nota...
                </div>
              ) : pagination.total === 0 ? (
                <div className="rounded-2xl border border-[#f0e1d4] bg-white px-6 py-8 text-center text-sm text-[#9a8678] shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)]">
                  Belum ada history nota
                </div>
              ) : (
                notas.map((nota) => (
                  <NotaHistoryCard
                    key={nota.id_nota}
                    nota={nota}
                    onPreview={openPreview}
                    onPrint={handlePrintNota}
                    onDelete={handleDeleteNota}
                    isDeleting={deletingId === nota.id_nota}
                  />
                ))
              )}
            </div>
            <Pagination
              page={page}
              totalItems={pagination.total}
              pageSize={pageSize}
              onChange={setPage}
            />
          </div>
        </main>
      </div>

      <NotaPreviewPopup
        nota={previewNota}
        zoom={previewZoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
        onClose={closePreview}
        formatDate={formatDate}
        formatRupiah={formatRupiah}
      />
    </div>
  );
};

export default HistoryNota;
