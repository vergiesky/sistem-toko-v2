/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
const useAxios = axios.create({
    baseURL: `${BASE_URL}/api`,
});

useAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default useAxios;
