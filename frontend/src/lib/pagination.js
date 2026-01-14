// untuk ngitung pagination (total halaman, start/end index tampilan)
export function getPagination(totalItems, page, pageSize) {
  // jumlah halaman (jumlah halaman dibulatin ke atas), minumal 1.
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  // startIndex dan endIndex dipakai untuk teks: "Menampilkan 1-9 dari 52 hotel"
  const startIndex = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex =
    totalItems === 0 ? 0 : Math.min(page * pageSize, totalItems);
  return { totalPages, startIndex, endIndex };
}

export default getPagination;
