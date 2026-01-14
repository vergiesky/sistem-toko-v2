const LoginForm = ({
  formData,
  isSubmitting,
  errorMessage,
  onChange,
  onSubmit,
}) => (
  <form className="mt-6 space-y-4" onSubmit={onSubmit}>
    <div>
      <label className="text-sm font-medium text-[#6d5c51]">Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={onChange}
        placeholder="Masukkan username"
        className="mt-2 w-full rounded-lg bg-[#f4f1ef] px-4 py-3 text-sm text-[#5b4c43] placeholder-[#b5a89f] shadow-inner shadow-white/80 outline-none ring-1 ring-transparent transition focus:ring-[#f4b16f]"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-[#6d5c51]">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Masukkan password"
        className="mt-2 w-full rounded-lg bg-[#f4f1ef] px-4 py-3 text-sm text-[#5b4c43] placeholder-[#b5a89f] shadow-inner shadow-white/80 outline-none ring-1 ring-transparent transition focus:ring-[#f4b16f]"
      />
    </div>

    {errorMessage && <p className="text-sm text-[#e25822]">{errorMessage}</p>}

    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-2 w-full rounded-lg bg-linear-to-r from-[#f78a1d] to-[#f17300] py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-18px_rgba(255,140,0,0.9)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? 'Memproses...' : 'Login'}
    </button>
  </form>
);

export default LoginForm;
