import { Search, SlidersHorizontal } from 'lucide-react';

const HistoryNotaToolbar = ({
  query,
  onQueryChange,
  isFilterOpen,
  toggleFilter,
  draftDateFrom,
  draftDateTo,
  onDraftDateFromChange,
  onDraftDateToChange,
  onApplyFilter,
  onCancelFilter,
  onResetFilter,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#3f2b20]">History Nota</h2>
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
              placeholder="Cari nama customer / nomor nota..."
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              className="w-full rounded-xl border border-[#f0e1d4] bg-white py-2.5 pl-10 pr-3 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
            />
          </div>
          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={toggleFilter}
              className="inline-flex items-center gap-2 rounded-xl border border-[#f0e1d4] bg-white px-3 py-2.5 text-sm font-semibold text-[#3d2d24] shadow-sm transition hover:bg-[#fff9f3]"
            >
              <SlidersHorizontal size={18} />
              Filter
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 z-10 mt-2 w-[260px] rounded-2xl border border-[#f0e1d4] bg-white p-4 text-sm shadow-lg">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#7a6151]">
                      Tanggal dari
                    </label>
                    <input
                      type="date"
                      value={draftDateFrom}
                      onChange={(event) =>
                        onDraftDateFromChange(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#7a6151]">
                      Tanggal sampai
                    </label>
                    <input
                      type="date"
                      value={draftDateTo}
                      onChange={(event) =>
                        onDraftDateToChange(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={onApplyFilter}
                      className="flex-1 rounded-xl bg-[#f2780c] px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_18px_-12px_rgba(242,120,12,0.8)] transition hover:brightness-105"
                    >
                      Terapkan
                    </button>
                    <button
                      type="button"
                      onClick={onCancelFilter}
                      className="flex-1 rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-xs font-semibold text-[#7a6151] transition hover:bg-[#fff9f3]"
                    >
                      Batal
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={onResetFilter}
                    className="w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-xs font-semibold text-[#7a6151] transition hover:bg-[#fff9f3]"
                  >
                    Reset filter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryNotaToolbar;
