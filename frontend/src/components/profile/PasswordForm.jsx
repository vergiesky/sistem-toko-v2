const PasswordForm = ({
  passwordForm,
  onChange,
  onSubmit,
}) => (
  <form
    onSubmit={onSubmit}
    className="rounded-2xl border border-[#f0e1d4] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)]"
  >
    <div>
      <h3 className="text-lg font-semibold text-[#3f2b20]">Ubah Password</h3>
      <p className="text-sm text-[#7a6151]">
        Pastikan password baru berbeda dari sebelumnya.
      </p>
    </div>

    <div className="mt-4 space-y-4">
      <div>
        <label className="text-sm font-semibold text-[#7a6151]">
          Password Lama
        </label>
        <input
          type="password"
          value={passwordForm.oldPassword}
          onChange={(event) => onChange('oldPassword', event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#7a6151]">
          Password Baru
        </label>
        <input
          type="password"
          value={passwordForm.newPassword}
          onChange={(event) => onChange('newPassword', event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-[#7a6151]">
          Konfirmasi Password Baru
        </label>
        <input
          type="password"
          value={passwordForm.confirmPassword}
          onChange={(event) => onChange('confirmPassword', event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
        />
      </div>
    </div>

    <button
      type="submit"
      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#f2780c] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-18px_rgba(242,120,12,0.9)] transition hover:brightness-105"
    >
      Simpan Password
    </button>
  </form>
);

export default PasswordForm;
