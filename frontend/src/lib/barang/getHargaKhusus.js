import formatRupiah from '../formatRupiah.js';

const getHargaKhusus = ({ barangHargaCustomers, barangId, customerId }) => {
  if (!customerId) return '-';
  const match = barangHargaCustomers.find(
    (item) =>
      String(item.id_barang) === String(barangId) &&
      String(item.id_customer) === String(customerId),
  );
  return match ? formatRupiah(match.harga_khusus) : '-';
};

export default getHargaKhusus;
