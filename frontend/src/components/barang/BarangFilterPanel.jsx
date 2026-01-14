const BarangFilterPanel = ({
  draftStokFilter,
  onDraftStokFilterChange,
  draftHargaMin,
  onDraftHargaMinChange,
  draftHargaMax,
  onDraftHargaMaxChange,
  draftCustomerFilterId,
  draftCustomerFilterSearch,
  onDraftCustomerFilterSearchChange,
  onDraftCustomerFocus,
  onDraftCustomerBlur,
  isCustomerFilterOpen,
  onClearCustomerFilter,
  filteredFilterCustomers,
  onSelectCustomerFilter,
  onApplyFilters,
  onCancelFilters,
  onResetFilters,
}) => (
  <div className="absolute right-0 z-10 mt-2 w-70 rounded-2xl border border-[#f0e1d4] bg-white p-4 text-sm shadow-lg">
    <div className="space-y-3">
      <div>
        <label className="text-xs font-semibold text-[#7a6151]">Stok</label>
        <select
          value={draftStokFilter}
          onChange={onDraftStokFilterChange}
          className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
        >
          <option value="all">Semua stok</option>
          <option value="positive">Stok &gt; 0</option>
          <option value="low">Stok &le; 0</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold text-[#7a6151]">
          Harga tetap
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input
            type="number"
            value={draftHargaMin}
            onChange={onDraftHargaMinChange}
            className="w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
            placeholder="Min"
          />
          <input
            type="number"
            value={draftHargaMax}
            onChange={onDraftHargaMaxChange}
            className="w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
            placeholder="Max"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-[#7a6151]">Customer</label>
        <div className="relative mt-2">
          <input
            type="text"
            value={draftCustomerFilterSearch}
            onChange={onDraftCustomerFilterSearchChange}
            onFocus={onDraftCustomerFocus}
            onBlur={onDraftCustomerBlur}
            placeholder="Ketik nama customer..."
            className="w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
          />
          {isCustomerFilterOpen && (
            <div className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl border border-[#f0e1d4] bg-white text-sm shadow-lg">
              <button
                type="button"
                onMouseDown={onClearCustomerFilter}
                className="w-full px-3 py-2 text-left text-[#7a6151] hover:bg-[#fff9f3]"
              >
                Pilih customer
              </button>
              {filteredFilterCustomers.length === 0 ? (
                <div className="px-3 py-2 text-[#9a8678]">
                  Customer tidak ditemukan
                </div>
              ) : (
                filteredFilterCustomers.map((customer) => (
                  <button
                    key={customer.id_customer}
                    type="button"
                    onMouseDown={() => onSelectCustomerFilter(customer)}
                    className={`w-full px-3 py-2 text-left hover:bg-[#fff9f3] ${
                      String(customer.id_customer) ===
                      String(draftCustomerFilterId)
                        ? 'bg-[#fff1e5] text-[#3f2b20]'
                        : 'text-[#3d2d24]'
                    }`}
                  >
                    {customer.nama_customer}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onApplyFilters}
          className="flex-1 rounded-xl bg-[#f2780c] px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_18px_-12px_rgba(242,120,12,0.8)] transition hover:brightness-105"
        >
          Terapkan
        </button>
        <button
          type="button"
          onClick={onCancelFilters}
          className="flex-1 rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-xs font-semibold text-[#7a6151] transition hover:bg-[#fff9f3]"
        >
          Batal
        </button>
      </div>
      <button
        type="button"
        onClick={onResetFilters}
        className="w-full rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-xs font-semibold text-[#7a6151] transition hover:bg-[#fff9f3]"
      >
        Reset filter
      </button>
    </div>
  </div>
);

export default BarangFilterPanel;
