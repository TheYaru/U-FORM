import React from 'react';

const FormPractice = ({ data, onChange, onNestedChange }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">4. Escenario de Práctica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Modalidad */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Modalidad</label>
                    <select
                        value={data.modality}
                        onChange={(e) => onChange('modality', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="CONVENIO">Convenio</option>
                        <option value="VINCULACION">Vinculación Laboral</option>
                        <option value="INVESTIGACION">Investigación</option>
                        <option value="PROYECTO">Proyecto Productivo o Social</option>
                    </select>
                </div>
                
                {/* Submodalidad */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Submodalidad</label>
                    <select
                        value={data.subModality}
                        onChange={(e) => onChange('subModality', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="Regional o Nacional">Regional o Nacional</option>
                        <option value="Internacional">Internacional</option>
                    </select>
                </div>
                
                {/* Cargo del practicante */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Cargo del practicante</label>
                    <input
                        type="text"
                        value={data.position}
                        onChange={(e) => onChange('position', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Ej: Asistente de Marketing"
                        required
                    />
                </div>
                
                {/* Departamento/Área */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Departamento/Área</label>
                    <input
                        type="text"
                        value={data.department}
                        onChange={(e) => onChange('department', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Ej: Marketing Digital"
                        required
                    />
                </div>
                
                {/* Fecha de inicio */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Fecha de inicio</label>
                    <input
                        type="date"
                        value={data.startDate}
                        onChange={(e) => onChange('startDate', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                {/* Fecha de finalización */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Fecha de finalización</label>
                    <input
                        type="date"
                        value={data.endDate}
                        onChange={(e) => onChange('endDate', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                
                {/* Horario de trabajo */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Horario de trabajo</label>
                    <input
                        type="text"
                        value={data.workSchedule}
                        onChange={(e) => onChange('workSchedule', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Ej: Lunes a Viernes 8am-5pm"
                        required
                    />
                </div>
                
                {/* ¿Es remunerada? */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">¿Es remunerada?</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.isPaid}
                            onChange={(e) => onChange('isPaid', e.target.checked)}
                            className="mr-2"
                        />
                        <span>Sí</span>
                    </div>
                </div>
                
                {/* Monto de remuneración (si aplica) */}
                {data.isPaid && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Monto de remuneración</label>
                        <input
                            type="text"
                            value={data.salary}
                            onChange={(e) => onChange('salary', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Ej: $1.000.000"
                        />
                    </div>
                )}
                
                {/* ¿Provee uniforme? */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">¿Provee uniforme?</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.providesUniform}
                            onChange={(e) => onChange('providesUniform', e.target.checked)}
                            className="mr-2"
                        />
                        <span>Sí</span>
                    </div>
                </div>
                
                {/* Funciones a desempeñar */}
                <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 mb-2">Funciones a desempeñar</label>
                    <textarea
                        value={data.functions}
                        onChange={(e) => onChange('functions', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        rows="3"
                        placeholder="Describe las principales responsabilidades..."
                        required
                    ></textarea>
                </div>
                
                {/* Recursos proporcionados */}
                <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 mb-2">Recursos proporcionados</label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={data.resources.computer}
                                    onChange={(e) => onNestedChange('practice', 'resources', 'computer', e.target.checked)}
                                    className="mr-2"
                                />
                                <span>Computador</span>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.resources.others}
                                    onChange={(e) => onNestedChange('practice', 'resources', 'others', e.target.checked)}
                                    className="mr-2"
                                />
                                <span>Otros</span>
                            </div>
                        </div>
                        
                        {data.resources.others && (
                            <div>
                                <label className="block text-gray-700 mb-2">Especifique otros recursos</label>
                                <input
                                    type="text"
                                    value={data.resources.othersDescription}
                                    onChange={(e) => onNestedChange('practice', 'resources', 'othersDescription', e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Ej: Teléfono corporativo, herramientas especializadas..."
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Docente asesor */}
                <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 mb-2">Docente asesor</label>
                    <input
                        type="text"
                        value={data.advisor}
                        onChange={(e) => onChange('advisor', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Nombre completo del docente asesor"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default FormPractice;