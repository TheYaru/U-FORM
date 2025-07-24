import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Función para crear un nuevo cliente con un prefijo específico
export const createApiClient = (prefix = '') => {
    return axios.create({
        baseURL: `${baseURL}${prefix}`,
        timeout: 10000,
    });
};


export default api;