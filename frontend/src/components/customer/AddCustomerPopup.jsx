import { X } from 'lucide-react';

const AddCustomerPopup = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  isSaving,
  errorMessage,
  editingCustomerId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.6)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#3f2b20]">
            {editingCustomerId ? 'Ubah Customer' : 'Tambah Customer Baru'}
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
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">
              Nama
            </label>
            <input
              type="text"
              name="nama_customer"
              value={formData.nama_customer}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-[#f2c699] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">
              Nama Perusahaan
            </label>
            <input
              type="text"
              name="nama_perusahaan"
              value={formData.nama_perusahaan}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#3f2b20]">
              Alamat
            </label>
            <textarea
              rows={3}
              name="alamat"
              value={formData.alamat}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
              required
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
                : editingCustomerId
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

export default AddCustomerPopup;
