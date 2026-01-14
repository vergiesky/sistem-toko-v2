import useAxios from './index.jsx';

export async function createBarangHargaCustomer(payload) {
  const res = await useAxios.post('/barang-harga-customer/create', payload);
  return res.data;
}

export async function getBarangHargaCustomers() {
  const res = await useAxios.get('/barang-harga-customer');
  return res.data;
}

export async function updateBarangHargaCustomer(id, payload) {
  const res = await useAxios.put(`/barang-harga-customer/update/${id}`, payload);
  return res.data;
}

export default {
  createBarangHargaCustomer,
  getBarangHargaCustomers,
  updateBarangHargaCustomer,
};
