import formatDate from '../../lib/formatDate.js';
import formatRupiah from '../../lib/formatRupiah.js';
import splitIntoPages from '../../lib/splitIntoPages.js';

const NotaHistoryCard = ({ nota, onPreview, onDelete, isDeleting }) => {
  const details = nota.detail_notas || nota.detailNotas || [];
  const detailPages = splitIntoPages(details, 15);

  return (
    <div className="rounded-2xl border border-[#f0e1d4] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-[#7a6151]">
            Nota No
          </p>
          <p className="text-lg font-semibold text-[#3f2b20]">
            {String(nota.nomor_nota || '').padStart(3, '0')}
          </p>
          <p className="mt-1 text-sm text-[#7a6151]">
            {formatDate(nota.tanggal)}
          </p>
          <p className="mt-2 text-sm text-[#3d2d24]">
            Customer:{' '}
            <span className="font-semibold">
              {nota.customers?.nama_customer || nota.nama_customer || ''}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase text-[#7a6151]">
            Total
          </p>
          <p className="text-lg font-semibold text-[#3f2b20]">
            {formatRupiah(nota.total)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onPreview(nota)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#f0e1d4] bg-white px-4 py-2 text-sm font-semibold text-[#3d2d24] shadow-sm transition hover:bg-[#fff9f3]"
          >
            Preview Nota
          </button>
          <button
            type="button"
            onClick={() => onDelete(nota)}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-xl border border-[#f3d2d2] bg-white px-4 py-2 text-sm font-semibold text-[#b42318] shadow-sm transition hover:bg-[#fff5f5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Menghapus...' : 'Hapus Nota'}
          </button>
        </div>
        <span className="text-xs font-semibold text-[#7a6151]">
          Total item: {details.length}
        </span>
      </div>

      {detailPages.map((pageDetails, pageIndex) => (
        <div
          key={`${nota.id_nota}-page-${pageIndex}`}
          className="mt-5 overflow-x-auto"
        >
          <div className="mb-2 text-xs font-semibold text-[#7a6151]">
            Detail {pageIndex + 1} dari {detailPages.length}
          </div>
          <table className="min-w-full text-sm">
            <thead className="bg-[#fff9f3] text-[#7a6151]">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Barang</th>
                <th className="px-4 py-2 text-center font-semibold">Jumlah</th>
                <th className="px-4 py-2 text-right font-semibold">Harga</th>
                <th className="px-4 py-2 text-right font-semibold">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3e6db]">
              {pageDetails.map((detail) => (
                <tr key={detail.id_detail_nota}>
                  <td className="px-4 py-2">
                    {detail.barang?.nama_barang || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">{detail.jumlah}</td>
                  <td className="px-4 py-2 text-right">
                    {formatRupiah(detail.harga_satuan)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatRupiah(detail.sub_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default NotaHistoryCard;
