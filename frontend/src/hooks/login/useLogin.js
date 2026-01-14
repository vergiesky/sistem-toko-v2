import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/apiAuth.js';

const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const response = await login(formData);
      const token = response.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || 'Login gagal. Coba lagi.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    errorMessage,
    handleChange,
    handleLogin,
  };
};

export default useLogin;
