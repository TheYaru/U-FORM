import React from 'react';

const FormCompany = ({ data, onChange }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">2. Datos de la Empresa</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre de la Empresa</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">NIT</label>
                <input
                    type="text"
                    value={data.nit}
                    onChange={(e) => onChange('nit', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
        </div>
    );
};

export default FormCompany;