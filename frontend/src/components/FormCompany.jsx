import React from 'react';

const FormCompany = ({ data, onChange }) => {
    const economicSectors = [
        'Agropecuario',
        'Industrial',
        'Servicios',
        'Comercio',
        'Financiero',
        'Construcción',
        'TIC',
        'Otro'
    ];

    const companySizes = [
        'Microempresa (1-10 empleados)',
        'Pequeña empresa (11-50 empleados)',
        'Mediana empresa (51-200 empleados)',
        'Gran empresa (201+ empleados)'
    ];

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">2. Datos de la Empresa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nombre de la Empresa*</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => onChange('name', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Representante Legal*</label>
                    <input
                        type="text"
                        value={data.legalRepresentative}
                        onChange={(e) => onChange('legalRepresentative', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">NIT*</label>
                    <input
                        type="text"
                        value={data.nit}
                        onChange={(e) => onChange('nit', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Actividad Económica*</label>
                    <input
                        type="text"
                        value={data.economicActivity}
                        onChange={(e) => onChange('economicActivity', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sector Económico*</label>
                    <select
                        value={data.economicSector}
                        onChange={(e) => onChange('economicSector', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Seleccione...</option>
                        {economicSectors.map((sector, index) => (
                            <option key={index} value={sector}>{sector}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nacionalidad*</label>
                    <input
                        type="text"
                        value={data.nationality}
                        onChange={(e) => onChange('nationality', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Ej: Colombiana"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Tamaño de la Empresa*</label>
                    <select
                        value={data.size}
                        onChange={(e) => onChange('size', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Seleccione...</option>
                        {companySizes.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Página Web</label>
                    <input
                        type="url"
                        value={data.website}
                        onChange={(e) => onChange('website', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="https://www.empresa.com"
                    />
                </div>
                
                <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 mb-2">Dirección*</label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => onChange('address', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Teléfono*</label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default FormCompany;