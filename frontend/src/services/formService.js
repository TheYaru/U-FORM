import api from './api';

export const saveForm = async (formData) => {
    try {
        const response = await api.post('/forms', formData);
        return response.data;
    } catch (error) {
        console.error('Error en saveForm:', {
            message: error.message,
            response: error.response?.data,
            config: error.config
        });
        throw new Error(error.response?.data?.error || 'Error al guardar el formulario');
    }
};

export const signForm = async (formId, role, signature) => {
    try {
        const response = await api.put(`/forms/${formId}/sign`, { role, signature });
        return response.data;
    } catch (error) {
        console.error('Error en signForm:', error);
        throw new Error(error.response?.data?.error || 'Error al guardar la firma');
    }
};

export const getForms = async () => {
    try {
        const response = await api.get('/forms');
        return response.data;
    } catch (error) {
        console.error('Error en getForms:', error);
        throw new Error(error.response?.data?.error || 'Error al obtener los formularios');
    }
};

export const createForm = async (formData) => {
    try {
        // Validaciones previas
        if (!formData.student || !formData.company || !formData.practice) {
            throw new Error('Datos incompletos del formulario');
        }

        // Validar horas mínimas
        if (formData.student.educationLevel === 'Tecnología' && 
            (!formData.practice.hours || formData.practice.hours < 480)) {
            throw new Error('Para Tecnología se requieren mínimo 480 horas');
        }
        
        if (formData.student.educationLevel === 'Profesional Universitario' && 
            (!formData.practice.hours || formData.practice.hours < 640)) {
            throw new Error('Para Profesional Universitario se requieren mínimo 640 horas');
        }

        const response = await api.post('/forms', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.data) {
            throw new Error('El servidor no devolvió datos');
        }

        return response.data;
    } catch (error) {
        console.error('Error en createForm:', {
            message: error.message,
            response: error.response?.data,
            request: {
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        });

        let errorMessage = 'Error al crear el formulario';
        if (error.response) {
            errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         `Error ${error.response.status}`;
        } else if (error.message) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const downloadFormExcel = async (formId) => {
    try {
        const response = await api.get(`/forms/${formId}/download`, {
            responseType: 'blob' // Esto es crucial para descargas
        });
        
        // Crear enlace de descarga
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `formato_practica_${formId}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        
    } catch (error) {
        console.error('Error al descargar Excel:', error);
        throw new Error(error.response?.data?.error || 'Error al descargar el formato');
    }
};