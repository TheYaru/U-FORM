import React from 'react';

const FormBoss = ({ data, onChange }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">3. Información del Jefe Inmediato</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nombre completo*</label>
                    <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => onChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Cargo*</label>
                    <input
                        type="text"
                        value={data.position}
                        onChange={(e) => onChange('position', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Correo electrónico*</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Teléfono de contacto*</label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 mb-2">Documento de identidad*</label>
                    <div className="flex gap-4">
                        <select
                            value={data.documentType}
                            onChange={(e) => onChange('documentType', e.target.value)}
                            className="w-1/2 px-3 py-2 border rounded"
                            required
                        >
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                            <option value="PAS">Pasaporte</option>
                        </select>
                        <input
                            type="text"
                            value={data.documentNumber}
                            onChange={(e) => onChange('documentNumber', e.target.value)}
                            className="w-1/2 px-3 py-2 border rounded"
                            placeholder="Número de documento"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormBoss;