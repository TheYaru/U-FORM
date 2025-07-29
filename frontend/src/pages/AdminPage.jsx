import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AdminHeader from '../components/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "react-datepicker/dist/react-datepicker.css";

const AdminPage = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [downloading, setDownloading] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setLoading(true);
                const response = await api.get('/forms');
                setForms(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Sesión expirada, por favor inicia sesión nuevamente');
                    logout();
                    navigate('/login');
                } else {
                    setError('Error al cargar formularios');
                    console.error('Fetch error:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, [navigate, logout]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/forms/${id}`, { status: newStatus });
            setForms(forms.map(form => 
                form._id === id ? { ...form, status: newStatus } : form
            ));
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Error al actualizar el estado');
        }
    };

    const handleDownloadExcel = async (formId) => {
        try {
            setDownloading(formId);
            const response = await api.get(`/forms/${formId}/download`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `formato_practica_${formId}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            
        } catch (error) {
            console.error('Error al descargar Excel:', error);
            setError('Error al descargar el formulario');
        } finally {
            setDownloading(null);
        }
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return 'Fecha inválida';
        }
    };

    if (loading) return <div className="p-4 text-center">Cargando formularios...</div>;
    
    if (error) return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-red-500 text-center">{error}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
                
                {forms.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        No hay formularios registrados
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {forms.map(form => (
                                    <tr key={form._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {form._id.substring(0, 8)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {form.student?.fullName || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {form.student?.email || ''}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {form.company?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select 
                                                value={form.status || 'pending'} 
                                                onChange={(e) => handleStatusChange(form._id, e.target.value)}
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${form.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                                    form.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                                    'bg-yellow-100 text-yellow-800'}`}
                                            >
                                                <option value="pending">Pendiente</option>
                                                <option value="approved">Aprobado</option>
                                                <option value="rejected">Rechazado</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(form.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                                            <button
                                                onClick={() => handleDownloadExcel(form._id)}
                                                disabled={downloading === form._id}
                                                className={`bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 text-sm ${
                                                    downloading === form._id ? 'opacity-50 cursor-wait' : ''
                                                }`}
                                            >
                                                {downloading === form._id ? 'Descargando...' : 'Descargar Excel'}
                                            </button>
                                            <button
                                                onClick={() => navigate(`/admin/editar/${form._id}`)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800 text-sm"
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;