import { Plus } from 'lucide-react';
import formatRupiah from '../../lib/formatRupiah.js';
import NotaItemRow from './NotaItemRow.jsx';

const NotaItemsTable = ({
  items,
  barangs,
  getItemProduct,
  getItemUnitPrice,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  totalHarga,
  selectedCustomer,
}) => {
  return (
    <>
      <table className="mt-3 w-full border border-[#e6d6c7] overflow-hidden print-table">
        <thead>
          <tr className="bg-[#f5eee8] text-sm font-semibold text-[#6f5a4a]">
            <th className="border-r border-[#e6d6c7] px-3 py-2 text-center col-jumlah w-22.5">
              Banyaknya
            </th>
            <th className="border-r border-[#e6d6c7] px-3 py-2 text-center col-name">
              Nama Barang
            </th>
            <th className="border-r border-[#e6d6c7] px-3 py-2 text-center col-price w-52.5">
              Harga Satuan
            </th>
            <th className="px-3 py-2 text-center col-total w-45">
              Jumlah
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const product = getItemProduct(item);
            const unitPrice = getItemUnitPrice(item);
            const jumlah = Number(item.jumlah) || 0;
            const subtotal = jumlah * unitPrice;

            return (
              <NotaItemRow
                key={item.id}
                item={item}
                product={product}
                unitPrice={unitPrice}
                subtotal={subtotal}
                barangs={barangs}
                onUpdate={onUpdateItem}
                onRemove={onRemoveItem}
                selectedCustomer={selectedCustomer}
              />
            );
          })}
          <tr className="border-t border-[#efe2d6] text-sm print:hidden">
            <td className="px-3 py-2" colSpan={4}>
              <button
                type="button"
                onClick={onAddItem}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#f0e1d4] bg-white px-4 py-2 text-sm font-semibold text-[#3d2d24] shadow-sm transition hover:bg-[#fff9f3]"
              >
                <Plus size={18} />
                Tambah Item
              </button>
            </td>
          </tr>
          {Array.from({ length: Math.max(0, 15 - items.length) }).map(
            (_, index) => (
              <tr
                key={`row-${index}`}
                className="border-t border-[#efe2d6] text-sm"
              >
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
            ),
          )}
        </tbody>
      </table>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 text-sm text-[#6f5a4a] print-footer">
        <div className="flex flex-wrap items-start gap-4 print-footer-left">
          <p className="print-tanda-terima">Tanda Terima,</p>
          <div className="rounded-xl border border-[#e6d6c7] bg-[#fff9f3] px-4 py-2 text-xs text-[#7a6151] print-warning">
            <strong>PERHATIAN!!!</strong>
            <br />
            Barang-barang yang telah dibeli
            <br />
            tidak dapat dikembalikan / ditukar
          </div>
        </div>
        <div className="text-right print-total-section">
          <div className="print-total-row">
            <p className="font-semibold print-total-label">Total</p>
            <span className="text-sm font-semibold text-[#3d2d24] print-total-amount">
              {formatRupiah(totalHarga || 0)}
            </span>
          </div>
          <p className="print-signature">Hormat Kami,</p>
        </div>
      </div>
    </>
  );
};

export default NotaItemsTable;
