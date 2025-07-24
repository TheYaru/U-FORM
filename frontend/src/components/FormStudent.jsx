import React from 'react';

const FormStudent = ({ data, onChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">1. Datos del Estudiante</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nombre completo</label>
                    <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => onChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Tipo de documento</label>
                    <select
                        value={data.documentType}
                        onChange={(e) => onChange('documentType', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Número de documento</label>
                    <input
                        type="text"
                        value={data.documentNumber}
                        onChange={(e) => onChange('documentNumber', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nivel de formación</label>
                    <select
                        value={data.educationLevel}
                        onChange={(e) => onChange('educationLevel', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="Tecnología">Tecnología</option>
                        <option value="Pregrado">Pregrado</option>
                        <option value="Especialización">Especialización</option>
                        <option value="Maestría">Maestría</option>
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Programa académico</label>
                    <input
                        type="text"
                        value={data.academicProgram}
                        onChange={(e) => onChange('academicProgram', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Teléfono</label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 mb-2">Correo electrónico</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default FormStudent;