const filterBarangs = ({
  barangs,
  query,
  stokFilter,
  hargaMin,
  hargaMax,
}) => {
  const q = query.trim().toLowerCase();
  return barangs.filter((barang) => {
    const matchName = String(barang.nama_barang || '')
      .toLowerCase()
      .includes(q);
    if (!matchName) return false;
    if (stokFilter === 'low') {
      return Number(barang.stok) <= 0;
    }
    if (stokFilter === 'positive') {
      return Number(barang.stok) > 0;
    }
    const harga = Number(barang.harga_tetap);
    if (hargaMin !== '' && harga < Number(hargaMin)) {
      return false;
    }
    if (hargaMax !== '' && harga > Number(hargaMax)) {
      return false;
    }
    return true;
  });
};

export default filterBarangs;
