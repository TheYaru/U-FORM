import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AdminHeader from '../components/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatisticsPanel from '../components/StatisticsPanel'; 
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css"; 
import * as XLSX from 'xlsx';

const AdminPage = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setLoading(true);
                // Usa la ruta correcta con '/api'
                const response = await api.get('/forms');
                setForms(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Sesión expirada, por favor inicia sesión nuevamente');
                    logout();
                    navigate('api/login');
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
            // Actualizar el estado local
            setForms(forms.map(form => 
                form._id === id ? { ...form, status: newStatus } : form
            ));
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Error al actualizar el estado');
        }
    };

    const generateExcel = (form) => {
        // Crear un libro de trabajo
        const wb = XLSX.utils.book_new();
        
        // Crear una hoja de cálculo con los datos del formulario
        const data = [
            ["FORMATO DE INICIACIÓN Y COMPROMISO DE LA ETAPA PRACTICA"],
            ["PROCESO: Prestación del Servicio / Extensión y Proyección a la Comunidad", "", "", "", "", "Código: FPESF-4.2-52", "Fecha: 06/11/2024", "Version: 1.0"],
            [],
            ["1. DATOS DEL ESTUDIANTE DE PRACTICA"],
            ["Nombre completo del estudiante:", form.student?.fullName || ''],
            ["Tipo de documento:", form.student?.documentType || '', "", "C.C. ___     C.E. ___", "", "Número de documento:", form.student?.documentNumber || ''],
            ["Nivel de formación:", form.student?.educationLevel || '', "", `Tecnología: ${form.student?.educationLevel === 'Tecnología' ? 'X' : ''}`, "", `Profesional Universitario: ${form.student?.educationLevel === 'Profesional' ? 'X' : ''}`],
            ["Programa académico:", form.student?.academicProgram || ''],
            ["Teléfonos de contacto:", form.student?.phone || '', "", "", "", "Correo electrónico FESC:", form.student?.email || ''],
            [],
            ["2. DATOS GENERALES DE LA EMPRESA"],
            ["Nombre de la Empresa:", form.company?.name || ''],
            ["Representante legal:", form.company?.legalRepresentative || ''],
            ["NIT:", form.company?.nit || ''],
            ["Actividad económica:", form.company?.economicActivity || ''],
            ["Sector Económico:", form.company?.economicSector || ''],
            ["Nacionalidad de la empresa:", form.company?.nationality || ''],
            ["Tamaño de la Empresa:", form.company?.size || ''],
            ["Pagina Web:", form.company?.website || ''],
            ["Dirección:", form.company?.address || ''],
            ["Teléfonos de contacto:", form.company?.phone || ''],
            [],
            ["3. INFORMACIÓN DEL JEFE INMEDIATO DEL PRACTICANTE EN LA EMPRESA:"],
            ["Nombre completo:", form.boss?.fullName || ''],
            ["Cargo:", form.boss?.position || ''],
            ["Correo electrónico:", form.boss?.email || ''],
            ["Teléfonos de contacto", form.boss?.phone || ''],
            [],
            ["4. ESCENARIO DE PRÁCTICA"],
            ["Por favor seleccione la modalidad de la práctica que va a desarrollar (Solo una opción)"],
            ["1. MODALIDAD CONVENIO", "", "", "2. MODALIDAD VINCULACIÓN LABORAL", "", "3. MODALIDAD INVESTIGACIÓN", "", "4. MODALIDAD PROYECTO PRODUCTIVO O SOCIAL"],
            ["Práctica (Regional o Nacional)", form.practice?.modality === 'convenio' ? 'X' : '', "Práctica Internacional", form.practice?.modality === 'vinculacion' ? 'X' : '', "Práctica contrato de aprendizaje", form.practice?.modality === 'investigacion' ? 'X' : '', "Propuesta mejora empresarial", form.practice?.modality === 'proyecto' ? 'X' : '', "Auxiliar de investigacion", "Plan de mejora para su emprendimiento", "Plan de Negocio"],
            ["Cargo del practicante:", form.practice?.position || ''],
            ["Periodo de la práctica:", `Fecha de inicio: ${form.practice?.startDate || ''}        Fecha fin: ${form.practice?.endDate || ''}`],
            ["Horario de labores concertado:", form.practice?.schedule || ''],
            ["Práctica remunerda:", form.practice?.isPaid ? 'SI' : 'NO', "", `Valor mensual de la remuneración: ${form.practice?.salary || ''}`],
            ["Suministra uniforme de dotacion al practicante:", form.practice?.providesUniform ? 'SI' : 'NO'],
            ["Funciones del practicante:", form.practice?.functions || ''],
            ["Recursos a disposición del practicante:", form.practice?.resources || '', "", "Otros:", form.practice?.otherResources || ''],
            ["Docente asesor FESC asignado:", form.practice?.advisor || ''],
            [],
            ["5. COMPROMISOS"],
            ["Con la firma de este documento, me comprometo hasta el día de la culminación de la Práctica cumplir respetuosa y responsablemente con:"],
            ["1. Los informes de practica en cada corte solicitados por el Asesor de Practica oportunamente según las fechas establecidas en el calendario académico y con las calidades esperadas segun mi plan de trabajo de practica."],
            ["2. (Solo aplica para estudiantes por convenio)  Las funciones asignadas, acatar las políticas internas de la empresa y del Reglamento de Prácticas FESC. De igual manera informaré oportunamente por escrito al jefe Inmediato y a la Coordinación de Prácticas cualquier solicitud o permiso de inasistencia, ya sea por enfermedad, calamidad familiar o actividad académica, presentando el respectivo soporte."],
            [],
            ["6. FIRMAS"],
            ["", "Estudiante Practicante", "", "", "Jefe Inmediato del practicante", "", "", "Docente Asesor Asignado"]
        ];

        const ws = XLSX.utils.aoa_to_sheet(data);
        
        // Ajustar anchos de columna
        const colWidths = [
            { wch: 30 }, { wch: 30 }, { wch: 10 }, { wch: 20 }, { wch: 20 },
            { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 },
            { wch: 20 }, { wch: 20 }, { wch: 20 }
        ];
        ws['!cols'] = colWidths;
        
        XLSX.utils.book_append_sheet(wb, ws, "Formulario de Práctica");

        // Escribir el libro de trabajo y descargarlo
        XLSX.writeFile(wb, `Formulario_${form._id}.xlsx`);
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => generateExcel(form)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 text-sm"
                                            >
                                                Descargar Excel
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