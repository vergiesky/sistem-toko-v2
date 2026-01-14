const LoginCard = ({ children }) => (
  <div className="w-full rounded-2xl border border-[#f1e3d5] bg-white/95 p-8 shadow-[0_18px_40px_-25px_rgba(120,70,30,0.45)] backdrop-blur">
    <div className="text-center">
      <h1 className="text-xl font-semibold text-[#5a4b43]">Sistem Toko</h1>
      <p className="mt-1 text-sm text-[#a19084]">
        Masukkan username dan password Anda
      </p>
    </div>
    {children}
  </div>
);

export default LoginCard;
