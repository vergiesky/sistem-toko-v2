import NotaPreviewPage from './NotaPreviewPage.jsx';
import splitIntoPages from '../../lib/splitIntoPages.js';

const NotaPreviewPopup = ({
  nota,
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  onClose,
  formatDate,
  formatRupiah,
}) => {
  if (!nota) return null;

  const details = nota.detail_notas || nota.detailNotas || [];
  const detailPages = splitIntoPages(details, 15);
  const customerName = nota.customers?.nama_customer || nota.nama_customer || '';
  const selectedCustomer =
    nota.customers ||
    (nota.nama_perusahaan || nota.alamat
      ? { nama_perusahaan: nota.nama_perusahaan, alamat: nota.alamat }
      : null);
  const notaNumber = String(nota.nomor_nota || '').padStart(3, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.7)]">
        <div className="flex items-center justify-between border-b border-[#f0e1d4] bg-[#fff9f3] px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase text-[#7a6151]">
              Preview Nota
            </p>
            <p className="text-lg font-semibold text-[#3f2b20]">
              NOTA NO {notaNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onZoomOut}
              className="rounded-xl border border-[#f0e1d4] bg-white px-3 py-1.5 text-sm font-semibold text-[#3d2d24] transition hover:bg-[#fff1e5]"
            >
              -
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-xl border border-[#f0e1d4] bg-white px-3 py-1.5 text-sm font-semibold text-[#3d2d24] transition hover:bg-[#fff1e5]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onZoomIn}
              className="rounded-xl border border-[#f0e1d4] bg-white px-3 py-1.5 text-sm font-semibold text-[#3d2d24] transition hover:bg-[#fff1e5]"
            >
              +
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#f0e1d4] bg-white px-3 py-1.5 text-sm font-semibold text-[#3d2d24] transition hover:bg-[#fff1e5]"
            >
              Tutup
            </button>
          </div>
        </div>

        <div
          className="max-h-[80vh] overflow-y-auto px-6 py-6"
          style={{ '--nota-preview-zoom': zoom }}
        >
          {detailPages.map((pageDetails, pageIndex) => {
            const pageTotal = pageDetails.reduce(
              (sum, detail) => sum + Number(detail.sub_total || 0),
              0,
            );
            return (
              <div
                key={`preview-${nota.id_nota}-${pageIndex}`}
                className="nota-preview-page"
              >
                <NotaPreviewPage
                  pageDetails={pageDetails}
                  notaNumber={notaNumber}
                  date={formatDate(nota.tanggal)}
                  customerName={customerName}
                  selectedCustomer={selectedCustomer}
                  pageTotal={pageTotal}
                  formatRupiah={formatRupiah}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotaPreviewPopup;
