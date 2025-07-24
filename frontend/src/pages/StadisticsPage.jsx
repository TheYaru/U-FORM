import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AdminHeader from '../components/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement,
    PointElement,
    LineElement
);

const StatisticsPage = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
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

    // Filtrar formularios por fecha seleccionada
    const filteredForms = startDate && endDate 
        ? forms.filter(form => {
            const formDate = new Date(form.created_at);
            return formDate >= startDate && formDate <= endDate;
        })
        : forms;

    // Datos para gráfico de formularios por día
    const getFormsByDayData = () => {
        const daysMap = {};
        
        filteredForms.forEach(form => {
            const date = new Date(form.created_at);
            const dayKey = date.toISOString().split('T')[0];
            
            if (!daysMap[dayKey]) {
                daysMap[dayKey] = {
                    date: date,
                    count: 0
                };
            }
            
            daysMap[dayKey].count++;
        });
        
        // Ordenar por fecha
        const sortedDays = Object.values(daysMap).sort((a, b) => a.date - b.date);
        
        return {
            labels: sortedDays.map(day => day.date.toLocaleDateString('es-ES')),
            datasets: [
                {
                    label: 'Formularios por día',
                    data: sortedDays.map(day => day.count),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }
            ]
        };
    };

    // Datos para gráfico de prácticas por modalidad
    const getPracticeModeData = () => {
        const modes = {
            convenio: 0,
            vinculacion: 0,
            investigacion: 0,
            proyecto: 0,
        };

        filteredForms.forEach(form => {
            if (form.practice?.modality) {
                modes[form.practice.modality] = (modes[form.practice.modality] || 0) + 1;
            }
        });

        return {
            labels: ['Convenio', 'Vinculación', 'Investigación', 'Proyecto'],
            datasets: [
                {
                    data: Object.values(modes),
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    // Datos para gráfico de formularios por estado
    const getStatusData = () => {
        const statusCounts = {
            pending: 0,
            approved: 0,
            rejected: 0,
        };

        filteredForms.forEach(form => {
            if (form.status) {
                statusCounts[form.status] = (statusCounts[form.status] || 0) + 1;
            }
        });

        return {
            labels: ['Pendientes', 'Aprobados', 'Rechazados'],
            datasets: [
                {
                    label: 'Formularios por Estado',
                    data: Object.values(statusCounts),
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    if (loading) return <div className="p-4 text-center">Cargando estadísticas...</div>;
    
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
                <h1 className="text-2xl font-bold mb-6">Estadísticas Detalladas</h1>
                
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                className="w-full border rounded px-3 py-2"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Seleccionar"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                            <DatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className="w-full border rounded px-3 py-2"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Seleccionar"
                            />
                        </div>
                        
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setStartDate(null);
                                    setEndDate(null);
                                }}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
                            >
                                Limpiar fechas
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="h-80">
                            <Bar 
                                data={getStatusData()} 
                                options={{ 
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Formularios por Estado',
                                        },
                                    },
                                }} 
                            />
                        </div>
                        
                        <div className="h-80">
                            <Pie 
                                data={getPracticeModeData()} 
                                options={{ 
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Modalidad de Práctica',
                                        },
                                    },
                                }} 
                            />
                        </div>
                    </div>
                    
                    <div className="h-96">
                        <Line 
                            data={getFormsByDayData()} 
                            options={{ 
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Formularios por Día',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            precision: 0
                                        }
                                    }
                                }
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;