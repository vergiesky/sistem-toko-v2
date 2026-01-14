import { Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import formatRupiah from '../../lib/formatRupiah.js';

const NotaItemRow = ({
  item,
  product,
  unitPrice,
  subtotal,
  barangs,
  onUpdate,
  onRemove,
  selectedCustomer,
}) => {
  const filteredBarang = useMemo(() => {
    const q = item.search.trim().toLowerCase();
    if (!q) return barangs;
    return barangs.filter((barang) =>
      String(barang.nama_barang || '').toLowerCase().includes(q),
    );
  }, [item.search, barangs]);

  return (
    <tr className="border-t border-[#efe2d6] text-sm">
      <td className="border-r border-[#efe2d6] px-3 py-2 col-jumlah w-22.5">
        <input
          type="number"
          min="1"
          value={item.jumlah}
          onChange={(event) =>
            onUpdate(item.id, { jumlah: event.target.value })
          }
          className="w-full rounded-lg border border-[#f0e1d4] bg-white px-0 py-1.5 text-center text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3] print:hidden jumlah-input"
        />
        <span className="hidden print:block">{Number(item.jumlah) || ''}</span>
      </td>
      <td className="border-r border-[#efe2d6] px-3 py-2 col-name">
        <div className="relative print:hidden">
          <input
            type="text"
            value={item.search}
            onChange={(event) =>
              onUpdate(item.id, {
                search: event.target.value,
                isOpen: true,
                productId: '',
              })
            }
            onFocus={() => onUpdate(item.id, { isOpen: true })}
            onBlur={() =>
              setTimeout(() => onUpdate(item.id, { isOpen: false }), 120)
            }
            placeholder="Pilih barang..."
            className="w-full rounded-lg border border-[#f0e1d4] bg-white px-3 py-1.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
          />
          {item.isOpen && (
            <div className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl border border-[#f0e1d4] bg-white text-sm shadow-lg">
              {filteredBarang.length === 0 ? (
                <div className="px-3 py-2 text-[#9a8678]">
                  Barang tidak ditemukan
                </div>
              ) : (
                filteredBarang.map((barang) => (
                  <button
                    key={barang.id_barang}
                    type="button"
                    onMouseDown={() =>
                      onUpdate(item.id, {
                        productId: barang.id_barang,
                        search: barang.nama_barang,
                        isOpen: false,
                      })
                    }
                    className="w-full px-3 py-2 text-left text-[#3d2d24] hover:bg-[#fff9f3]"
                  >
                    {barang.nama_barang}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <span className="hidden print:block">{product?.nama_barang || ''}</span>
      </td>
      <td className="border-r border-[#efe2d6] px-3 py-2 col-price w-52.5">
        <div className="flex flex-col gap-2 print:hidden">
          <select
            value={item.priceType}
            onChange={(event) =>
              onUpdate(item.id, {
                priceType: event.target.value,
              })
            }
            className="w-full rounded-lg border border-[#f0e1d4] bg-white px-2 py-1.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
          >
            <option value="tetap">Harga Tetap</option>
            <option value="customer" disabled={!selectedCustomer}>
              Harga Customer
            </option>
          </select>
          <span>{formatRupiah(unitPrice)}</span>
        </div>
        <span className="hidden print:block">{formatRupiah(unitPrice)}</span>
      </td>
      <td className="px-3 py-2 col-total w-45">
        <div className="flex items-center justify-between gap-2 print:hidden">
          <span>{formatRupiah(subtotal)}</span>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="rounded-lg p-1 text-[#e25822] transition hover:bg-[#fee7dd]"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <span className="hidden print:block">{formatRupiah(subtotal)}</span>
      </td>
    </tr>
  );
};

export default NotaItemRow;
