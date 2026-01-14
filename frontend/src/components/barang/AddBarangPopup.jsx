import { X } from 'lucide-react';

const AddBarangPopup = ({
  isOpen,
  onClose,
  onSubmit,
  editingBarangId,
  isImporting,
  onImportExcel,
  importError,
  formData,
  onChange,
  customerSearch,
  onCustomerSearchChange,
  onCustomerFocus,
  onCustomerBlur,
  isCustomerOpen,
  filteredCustomers,
  onClearCustomer,
  onSelectCustomer,
  hargaKhusus,
  onHargaKhususChange,
  errorMessage,
  isSaving,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.6)] scrollbar-hide">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#3f2b20]">
            {editingBarangId ? 'Ubah Barang' : 'Tambah Barang Baru'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#7a6151] transition hover:bg-[#fff1e5]"
          >
            <X size={18} />
          </button>
        </div>

        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          {!editingBarangId && (
            <div className="rounded-xl border border-[#f0e1d4] bg-[#fff9f3] p-4 text-sm">
              <p className="text-sm font-semibold text-[#3f2b20]">
                Import dari Excel (opsional)
              </p>
              <p className="mt-1 text-xs text-[#7a6151]">
                Format Excel: Sheet Barang (Nama Barang, Stok, Harga Tetap) +
                Sheet Harga Khusus (Nama Barang, Nama Customer, Harga Khusus).
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label
                  htmlFor="barang-import-file"
                  className="inline-flex cursor-pointer items-center rounded-xl border border-[#f0e1d4] bg-white px-3 py-2 text-xs font-semibold text-[#3d2d24] shadow-sm transition hover:bg-[#fff1e5]"
                >
                  {isImporting && (
                    <span className="mr-2 inline-flex h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#f2780c] border-t-transparent" />
                  )}
                  {isImporting ? 'Mengimpor...' : 'Pilih File'}
                </label>
                <input
                  id="barang-import-file"
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={onImportExcel}
                  disabled={isImporting}
                  className="hidden"
                />
                <span className="text-xs text-[#9a8678]">.xlsx / .csv</span>
              </div>
              {isImporting && (
                <p className="mt-2 text-xs text-[#9a8678]">
                  Sedang mengimpor file, mohon tunggu...
                </p>
              )}
              {importError && (
                <p className="mt-2 text-xs text-[#e25822]">{importError}</p>
              )}
            </div>
          )}
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">
              Nama Barang
            </label>
            <input
              type="text"
              name="nama_barang"
              value={formData.nama_barang}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-[#f2c699] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">Stok</label>
            <input
              type="number"
              name="stok"
              value={formData.stok}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">
              Harga Tetap
            </label>
            <input
              type="number"
              name="harga_tetap"
              value={formData.harga_tetap}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">
              Customer (opsional)
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                value={customerSearch}
                onChange={onCustomerSearchChange}
                onFocus={onCustomerFocus}
                onBlur={onCustomerBlur}
                className="w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              />
              {isCustomerOpen && (
                <div className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl border border-[#f0e1d4] bg-white text-sm shadow-lg">
                  <button
                    type="button"
                    onMouseDown={onClearCustomer}
                    className="w-full px-4 py-2 text-left text-[#7a6151] hover:bg-[#fff9f3]"
                  >
                    Pilih customer
                  </button>
                  {filteredCustomers.length === 0 ? (
                    <div className="px-4 py-2 text-[#9a8678]">
                      Customer tidak ditemukan
                    </div>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <button
                        key={customer.id_customer}
                        type="button"
                        onMouseDown={() => onSelectCustomer(customer)}
                        className="w-full px-4 py-2 text-left text-[#3d2d24] hover:bg-[#fff9f3]"
                      >
                        {customer.nama_customer}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">
              Harga khusus
            </label>
            <input
              type="number"
              value={hargaKhusus}
              onChange={onHargaKhususChange}
              className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              min="0"
              step="0.01"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-[#e25822]">{errorMessage}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-xl bg-[#f2780c] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-18px_rgba(242,120,12,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving
                ? 'Menyimpan...'
                : editingBarangId
                  ? 'Simpan'
                  : 'Tambah'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm font-semibold text-[#3d2d24]"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBarangPopup;
