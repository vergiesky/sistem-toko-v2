import { getPagination } from '../lib/pagination.js';

const Pagination = ({ page, totalItems, pageSize = 10, onChange }) => {
  const { totalPages } = getPagination(totalItems, page, pageSize);
  if (totalPages <= 1) return null;

  const goTo = (target) => {
    if (target < 1 || target > totalPages) return;
    onChange(target);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#f3e6db] bg-[#fff9f3] text-sm text-[#7a6151]">
      <span>
        Halaman {page} dari {totalPages} (total {totalItems} data)
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-lg border border-[#f2c699] bg-white text-[#c65a06] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#fff1e5] transition"
        >
          Sebelumnya
        </button>
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-lg border border-[#f2c699] bg-white text-[#c65a06] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#fff1e5] transition"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default Pagination;
