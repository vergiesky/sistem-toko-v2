import NotaHeader from './NotaHeader.jsx';
import formatRupiahDefault from '../../lib/formatRupiah.js';

const NotaReceiptPage = ({
  notaNumber,
  date,
  customerName,
  rows,
  pageTotal,
  blankRows = 0,
  contentClassName = '',
  formatRupiah = formatRupiahDefault,
}) => {
  return (
    <div className="relative print-container">
      <img
        src="/logo.jpg"
        alt="Watermark"
        className="pointer-events-none absolute inset-0 m-auto w-[60%] opacity-10 print-watermark"
      />

      <div className={`relative ${contentClassName}`.trim()}>
        <NotaHeader
          notaNumber={notaNumber}
          date={date}
          customerName={customerName}
          mode="print"
        />

        <table className="mt-6 w-full border border-[#e6d6c7] overflow-hidden print-table">
          <thead>
            <tr className="bg-[#f5eee8] text-sm font-semibold text-[#6f5a4a]">
              <th className="border-r border-[#e6d6c7] px-3 py-2 text-center col-jumlah w-[90px]">
                Banyaknya
              </th>
              <th className="border-r border-[#e6d6c7] px-3 py-2 text-center col-name">
                Nama Barang
              </th>
              <th className="border-r border-[#e6d6c7] px-3 py-2 text-center col-price w-[210px]">
                Harga Satuan
              </th>
              <th className="px-3 py-2 text-center col-total w-[180px]">
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const qty = Number(row.qty);
              const qtyLabel = qty ? qty : '';
              return (
                <tr key={`${row.key ?? 'row'}-${index}`} className="border-t border-[#efe2d6] text-sm">
                  <td className="border-r border-[#efe2d6] px-3 py-2 col-jumlah w-[90px]">
                    <span>{qtyLabel}</span>
                  </td>
                  <td className="border-r border-[#efe2d6] px-3 py-2 col-name">
                    <span>{row.name || ''}</span>
                  </td>
                  <td className="border-r border-[#efe2d6] px-3 py-2 col-price w-[210px]">
                    <span>{formatRupiah(row.price || 0)}</span>
                  </td>
                  <td className="px-3 py-2 col-total w-[180px]">
                    <span>{formatRupiah(row.subtotal || 0)}</span>
                  </td>
                </tr>
              );
            })}
            {Array.from({ length: blankRows }).map((_, index) => (
              <tr key={`blank-${index}`} className="border-t border-[#efe2d6] text-sm">
                <td className="border-r border-[#efe2d6] px-3 py-2">
                  &nbsp;
                </td>
                <td className="border-r border-[#efe2d6] px-3 py-2">
                  &nbsp;
                </td>
                <td className="border-r border-[#efe2d6] px-3 py-2">
                  &nbsp;
                </td>
                <td className="px-3 py-2">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 text-sm text-[#6f5a4a] print-footer">
          <div className="flex flex-wrap items-start gap-4 print-footer-left">
            <p className="print-tanda-terima">Tanda Terima,</p>
            <div className="rounded-xl border border-[#e6d6c7] bg-[#fff9f3] px-4 py-2 text-xs text-[#7a6151] print-warning">
              <strong>PERHATIAN!!!</strong>
              <br />
              <br />
              Barang-barang yang telah dibeli
              <br />
              tidak dapat dikembalikan / ditukar
            </div>
          </div>
          <div className="text-right print-total-section">
            <div className="print-total-row">
              <p className="font-semibold print-total-label">Total (Rp)</p>
              <span className="text-sm font-semibold text-[#3d2d24] print-total-amount">
                {formatRupiah(pageTotal || 0)}
              </span>
            </div>
            <p className="print-signature">Hormat Kami,</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaReceiptPage;
