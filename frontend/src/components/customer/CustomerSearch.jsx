import { Search } from 'lucide-react';

const CustomerSearch = ({ query, onChange }) => {
  return (
    <div className="relative flex-1">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a38a]"
      />
      <input
        type="text"
        placeholder="Cari nama customer..."
        value={query}
        onChange={onChange}
        className="w-full rounded-xl border border-[#f0e1d4] bg-white py-2.5 pl-10 pr-3 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3]"
      />
    </div>
  );
};

export default CustomerSearch;
