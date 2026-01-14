import useAxios from './index.jsx';

export async function login(payload) {
  const res = await useAxios.post('/login', payload);
  return res.data;
}

export async function logout() {
  const res = await useAxios.post('/logout');
  return res.data;
}

export default {
  login,
  logout,
};
