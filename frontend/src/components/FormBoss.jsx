import React from 'react';

const FormBoss = ({ data, onChange }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">3. Jefe Inmediato</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre completo</label>
                <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => onChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Cargo</label>
                <input
                    type="text"
                    value={data.position}
                    onChange={(e) => onChange('position', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
        </div>
    );
};

export default FormBoss;