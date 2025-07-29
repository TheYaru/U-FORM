import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatisticsPanel = ({ forms }) => {
    // Estadísticas básicas
    const stats = {
        total: forms.length,
        pending: forms.filter(f => f.status === 'pending').length,
        approved: forms.filter(f => f.status === 'approved').length,
        rejected: forms.filter(f => f.status === 'rejected').length,
    };

    // Datos para gráfico de barras (por estado)
    const statusData = {
        labels: ['Pendientes', 'Aprobados', 'Rechazados'],
        datasets: [
            {
                label: 'Formularios por Estado',
                data: [stats.pending, stats.approved, stats.rejected],
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

    // Datos para gráfico de torta (por modalidad de práctica)
    const getPracticeModeData = () => {
        const modes = {
            convenio: 0,
            vinculacion: 0,
            investigacion: 0,
            proyecto: 0,
        };

        forms.forEach(form => {
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

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">Estadísticas</h2>
            
            {/* Tarjetas de resumen */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded shadow flex flex-col items-center border">
                    <p className="text-sm text-gray-500">Total formularios</p>
                    <p className="text-3xl font-extrabold text-gray-800">{stats.total}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded shadow flex flex-col items-center border">
                    <p className="text-sm text-gray-500">Pendientes</p>
                    <p className="text-3xl font-extrabold text-yellow-700">{stats.pending}</p>
                </div>
                <div className="bg-green-50 p-4 rounded shadow flex flex-col items-center border">
                    <p className="text-sm text-gray-500">Aprobados</p>
                    <p className="text-3xl font-extrabold text-green-700">{stats.approved}</p>
                </div>
                <div className="bg-red-50 p-4 rounded shadow flex flex-col items-center border">
                    <p className="text-sm text-gray-500">Rechazados</p>
                    <p className="text-3xl font-extrabold text-red-700">{stats.rejected}</p>
                </div>
            </div>

            <hr className="my-6" />

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-4 rounded shadow border flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-center">Formularios por Estado</h3>
                    <div className="flex-1 h-64">
                        <Bar 
                            data={statusData} 
                            options={{ 
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: false,
                                    },
                                },
                            }} 
                        />
                    </div>
                </div>
                
                {/* Separador solo visible en móvil */}
                <hr className="block md:hidden my-8 border-t-2 border-gray-500 rounded-full" />

                <div className="bg-gray-50 p-4 rounded shadow border flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-center">Modalidad de Práctica</h3>
                    <div className="flex-1 h-64">
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
                                        display: false,
                                    },
                                },
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPanel;