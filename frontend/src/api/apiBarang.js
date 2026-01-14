import useAxios from './index.jsx';

export async function getBarangs(params) {
  const res = await useAxios.get('/barang', { params });
  return res.data;
}

export async function createBarang(payload) {
  const res = await useAxios.post('/barang/create', payload);
  return res.data;
}

export async function updateBarang(id, payload) {
  const res = await useAxios.put(`/barang/update/${id}`, payload);
  return res.data;
}

export async function deleteBarang(id) {
  const res = await useAxios.delete(`/barang/delete/${id}`);
  return res.data;
}

export default {
  getBarangs,
  createBarang,
  updateBarang,
  deleteBarang,
};
