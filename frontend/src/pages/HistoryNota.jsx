import { useState } from 'react';
import Pagination from '../components/Pagination.jsx';
import Sidebar from '../components/Sidebar.jsx';
import HistoryNotaToolbar from '../components/notaHistory/HistoryNotaToolbar.jsx';
import NotaHistoryCard from '../components/notaHistory/NotaHistoryCard.jsx';
import NotaPreviewPopup from '../components/notaHistory/NotaPreviewPopup.jsx';
import { deleteNota } from '../api/apiNota.js';
import useNotaHistoryData from '../hooks/notaHistory/useNotaHistoryData.js';
import useNotaHistoryFilters from '../hooks/notaHistory/useNotaHistoryFilters.js';
import useNotaHistoryPaging from '../hooks/notaHistory/useNotaHistoryPaging.js';
import useNotaPreview from '../hooks/notaHistory/useNotaPreview.js';
import { alertConfirm } from '../lib/alert.js';
import formatDate from '../lib/formatDate.js';
import formatRupiah from '../lib/formatRupiah.js';
import { toastError, toastSuccess } from '../lib/toastUtils.js';

const HistoryNota = () => {
  const { notas, isLoading, errorMessage, fetchNotas } = useNotaHistoryData();
  const [deletingId, setDeletingId] = useState(null);
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
    filteredNotas,
    toggleFilter,
    applyFilter,
    cancelFilter,
    resetFilter,
  } = useNotaHistoryFilters(notas);
  const pageSize = 10;
  const { page, setPage, totalItems, pagedNotas } = useNotaHistoryPaging({
    filteredNotas,
    pageSize,
    resetKeys: [query, dateFrom, dateTo],
  });
  const {
    previewNota,
    previewZoom,
    openPreview,
    closePreview,
    zoomIn,
    zoomOut,
    resetZoom,
  } = useNotaPreview();

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

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,#fff3e8_0%,#fff7f0_35%,#fffdfb_100%)] text-[#3d2d24]">
      <div className="flex min-h-screen w-full flex-col md:flex-row md:flex-wrap">
        <Sidebar />

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <HistoryNotaToolbar
            query={query}
            onQueryChange={setQuery}
            isFilterOpen={isFilterOpen}
            toggleFilter={toggleFilter}
            draftDateFrom={draftDateFrom}
            draftDateTo={draftDateTo}
            onDraftDateFromChange={setDraftDateFrom}
            onDraftDateToChange={setDraftDateTo}
            onApplyFilter={applyFilter}
            onCancelFilter={cancelFilter}
            onResetFilter={resetFilter}
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
            ) : filteredNotas.length === 0 ? (
              <div className="rounded-2xl border border-[#f0e1d4] bg-white px-6 py-8 text-center text-sm text-[#9a8678] shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)]">
                Belum ada history nota
              </div>
            ) : (
              pagedNotas.map((nota) => (
                <NotaHistoryCard
                  key={nota.id_nota}
                  nota={nota}
                  onPreview={openPreview}
                  onDelete={handleDeleteNota}
                  isDeleting={deletingId === nota.id_nota}
                />
              ))
            )}
          </div>
          <Pagination
            page={page}
            totalItems={totalItems}
            pageSize={pageSize}
            onChange={setPage}
          />
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


