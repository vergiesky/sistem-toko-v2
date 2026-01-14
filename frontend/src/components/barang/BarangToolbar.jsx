import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import BarangFilterPanel from './BarangFilterPanel.jsx';

const BarangToolbar = ({
  query,
  onQueryChange,
  onToggleFilter,
  isFilterOpen,
  onAddBarang,
  filterPanelProps,
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-[#3f2b20]">Daftar Barang</h2>
    </div>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 flex-1">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a38a]"
          />
          <input
            type="text"
            placeholder="Cari nama barang..."
            value={query}
            onChange={onQueryChange}
            className="w-full rounded-xl border border-[#f0e1d4] bg-white py-2.5 pl-10 pr-3 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
          />
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={onToggleFilter}
            className="inline-flex items-center gap-2 rounded-xl border border-[#f0e1d4] bg-white px-3 py-2.5 text-sm font-semibold text-[#3d2d24] shadow-sm transition hover:bg-[#fff9f3]"
          >
            <SlidersHorizontal size={18} />
            Filter
          </button>
          {isFilterOpen && <BarangFilterPanel {...filterPanelProps} />}
        </div>
      </div>
      <button
        type="button"
        onClick={onAddBarang}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2780c] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-18px_rgba(242,120,12,0.9)] transition hover:brightness-105 sm:w-auto"
      >
        <Plus size={18} />
        Tambah Barang
      </button>
    </div>
  </div>
);

export default BarangToolbar;
