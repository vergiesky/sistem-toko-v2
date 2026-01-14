import useAxios from './index.jsx';

export async function getProfile() {
  const res = await useAxios.get('/profile');
  return res.data;
}

export async function updateProfile(payload) {
  const res = await useAxios.put('/profile', payload);
  return res.data;
}

export async function updatePassword(payload) {
  const res = await useAxios.put('/profile/password', payload);
  return res.data;
}

export default {
  getProfile,
  updateProfile,
  updatePassword,
};
