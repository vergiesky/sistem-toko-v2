import useAxios from './index.jsx';

export async function getCustomers(params) {
  const res = await useAxios.get('/customers', { params });
  return res.data;
}

export async function createCustomer(payload) {
  const res = await useAxios.post('/customers/create', payload);
  return res.data;
}

export async function updateCustomer(id, payload) {
  const res = await useAxios.put(`/customers/update/${id}`, payload);
  return res.data;
}

export async function deleteCustomer(id) {
  const res = await useAxios.delete(`/customers/delete/${id}`);
  return res.data;
}

export default {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
