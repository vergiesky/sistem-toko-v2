import { Pencil, Trash2 } from 'lucide-react';
import getHargaKhusus from '../../lib/barang/getHargaKhusus.js';
import formatRupiah from '../../lib/formatRupiah.js';

const BarangTable = ({
  isLoading,
  filteredCount,
  pagedBarangs,
  page,
  pageSize,
  customerFilterId,
  barangHargaCustomers,
  onEdit,
  onDelete,
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-[#fff9f3] text-[#7a6151]">
        <tr>
          <th className="px-6 py-3 text-left font-semibold">No</th>
          <th className="px-6 py-3 text-left font-semibold">Nama Barang</th>
          <th className="px-6 py-3 text-left font-semibold">Stok</th>
          <th className="px-6 py-3 text-left font-semibold">Harga Tetap</th>
          <th className="px-6 py-3 text-left font-semibold">Harga Customer</th>
          <th className="px-6 py-3 text-center font-semibold">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#f3e6db]">
        {isLoading ? (
          <tr>
            <td colSpan="6" className="px-6 py-8 text-center text-[#9a8678]">
              Memuat data barang...
            </td>
          </tr>
        ) : filteredCount === 0 ? (
          <tr>
            <td colSpan="6" className="px-6 py-8 text-center text-[#9a8678]">
              Belum ada data barang
            </td>
          </tr>
        ) : (
          pagedBarangs.map((barang, index) => (
            <tr
              key={barang.id_barang}
              className={`text-[#3d2d24] hover:bg-[#fff9f3] ${
                Number(barang.stok) <= 0
                  ? 'bg-[#ffd6d6] text-[#7f1d1d] hover:bg-[#ffc9c9]'
                  : ''
              }`}
            >
              <td className="px-6 py-2.5">
                {(page - 1) * pageSize + index + 1}
              </td>
              <td className="px-6 py-2.5 font-semibold text-[#3f2b20]">
                {barang.nama_barang}
              </td>
              <td className="px-6 py-2.5">{barang.stok}</td>
              <td className="px-6 py-2.5">
                {formatRupiah(barang.harga_tetap)}
              </td>
              <td className="px-6 py-2.5">
                {getHargaKhusus({
                  barangHargaCustomers,
                  barangId: barang.id_barang,
                  customerId: customerFilterId,
                })}
              </td>
              <td className="px-6 py-2.5 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(barang)}
                    className="rounded-full p-2 text-[#f2780c] transition hover:bg-[#fff1e5]"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(barang)}
                    className="rounded-full p-2 text-[#e25822] transition hover:bg-[#fee7dd]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default BarangTable;
