const StatCard = ({ icon, label, value, accent }) => {
  const Icon = icon;
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#f0e1d4] bg-white p-4 shadow-[0_12px_30px_-24px_rgba(137,95,49,0.35)]">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-inner ${accent}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-[#7a6151]">{label}</p>
        <p className="text-2xl font-semibold text-[#3f2b20]">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
