import api from './api';

export const saveForm = async (formData) => {
    try {
        const response = await api.post('/forms', formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al guardar el formulario');
    }
};

export const signForm = async (formId, role, signature) => {
    try {
        const response = await api.put(`/forms/${formId}/sign`, { role, signature });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al guardar la firma');
    }
};

export const getForms = async () => {
    try {
        const response = await api.get('/forms');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener los formularios');
    }
};

// Nueva función para crear formularios
export const createForm = async (formData) => {
    try {
        const response = await api.post('/forms', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear el formulario');
    }
};