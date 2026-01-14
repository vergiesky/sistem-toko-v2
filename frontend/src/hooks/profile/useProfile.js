import { useEffect, useState } from 'react';
import { getProfile, updatePassword, updateProfile } from '../../api/apiUser.js';
import { alertConfirm } from '../../lib/alert.js';
import { toastError, toastSuccess } from '../../lib/toastUtils.js';

const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setProfileError('');
      try {
        const response = await getProfile();
        setUsername(response.data?.username || '');
      } catch (error) {
        setProfileError(
          error?.response?.data?.message || 'Gagal mengambil data profile.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileError('');

    try {
      const { isConfirmed } = await alertConfirm({
        title: 'Konfirmasi',
        text: 'Simpan perubahan username?',
        confirmButtonText: 'Ya, simpan',
        cancelButtonText: 'Batal',
        icon: 'warning',
      });
      if (!isConfirmed) return;
      const response = await updateProfile({ username });
      setUsername(response.data?.username || username);
      toastSuccess(response.message || 'Profile berhasil diperbarui.');
    } catch (error) {
      toastError(
        error?.response?.data?.message || 'Gagal memperbarui profile.',
      );
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      const { isConfirmed } = await alertConfirm({
        title: 'Konfirmasi',
        text: 'Simpan perubahan password?',
        confirmButtonText: 'Ya, simpan',
        cancelButtonText: 'Batal',
        icon: 'warning',
      });
      if (!isConfirmed) return;
      const response = await updatePassword({
        password_lama: passwordForm.oldPassword,
        password_baru: passwordForm.newPassword,
        password_baru_confirmation: passwordForm.confirmPassword,
      });
      toastSuccess(response.message || 'Password berhasil diperbarui.');
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toastError(
        error?.response?.data?.message || 'Gagal memperbarui password.',
      );
    }
  };

  return {
    isLoading,
    username,
    setUsername,
    profileError,
    passwordForm,
    setPasswordForm,
    handleProfileSubmit,
    handlePasswordSubmit,
  };
};

export default useProfile;
