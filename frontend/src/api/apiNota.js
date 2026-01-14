import useAxios from './index.jsx';

export async function getNotas() {
  const res = await useAxios.get('/nota');
  return res.data;
}

export async function getNextNotaNumber() {
  const res = await useAxios.get('/nota/next-number');
  return res.data;
}

export async function createNotaWithDetail(payload) {
  const res = await useAxios.post('/nota/print', payload);
  return res.data;
}

export async function deleteNota(id) {
  const res = await useAxios.delete(`/nota/delete/${id}`);
  return res.data;
}

export default {
  getNotas,
  getNextNotaNumber,
  createNotaWithDetail,
  deleteNota,
};
