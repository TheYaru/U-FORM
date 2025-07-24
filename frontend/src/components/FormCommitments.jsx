import React from 'react';

const FormCommitments = ({ data, onChange }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">5. Compromisos</h2>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <p className="text-yellow-700 text-sm">
                    <span className="font-bold">Nota:</span> Marque las casillas para indicar su aceptación de cada compromiso.
                </p>
            </div>
            
            {/* Compromiso 1 */}
            <div className="mb-4 p-4 bg-white rounded border">
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        checked={data.reports}
                        onChange={(e) => onChange('reports', e.target.checked)}
                        className="mr-2 mt-1"
                        required
                    />
                    <span>
                        <span className="font-semibold">Compromiso 1:</span> 
                        Me comprometo a entregar los informes de práctica en cada corte solicitado por la institución educativa,
                        siguiendo los lineamientos y formatos establecidos.
                    </span>
                </label>
            </div>
            
            {/* Compromiso 2 */}
            <div className="mb-4 p-4 bg-white rounded border">
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        checked={data.compliance}
                        onChange={(e) => onChange('compliance', e.target.checked)}
                        className="mr-2 mt-1"
                        required
                    />
                    <span>
                        <span className="font-semibold">Compromiso 2:</span> 
                        Me comprometo a cumplir con las funciones asignadas y a seguir las políticas internas de la empresa,
                        manteniendo un comportamiento ético y profesional durante toda la práctica.
                    </span>
                </label>
            </div>
            
            {/* Compromiso 3 */}
            <div className="mb-4 p-4 bg-white rounded border">
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        checked={data.attendance}
                        onChange={(e) => onChange('attendance', e.target.checked)}
                        className="mr-2 mt-1"
                        required
                    />
                    <span>
                        <span className="font-semibold">Compromiso 3:</span> 
                        Me comprometo a mantener una asistencia puntual y constante, notificando con anticipación cualquier ausencia
                        tanto a la empresa como a la institución educativa.
                    </span>
                </label>
            </div>
            
            {/* Compromiso 4 */}
            <div className="mb-4 p-4 bg-white rounded border">
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        checked={data.confidentiality}
                        onChange={(e) => onChange('confidentiality', e.target.checked)}
                        className="mr-2 mt-1"
                        required
                    />
                    <span>
                        <span className="font-semibold">Compromiso 4:</span> 
                        Me comprometo a mantener la confidencialidad de la información interna de la empresa a la que tenga acceso
                        durante mi práctica, y a no divulgarla bajo ninguna circunstancia.
                    </span>
                </label>
            </div>
            
            {/* Acuerdo de propiedad intelectual */}
            <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <h3 className="font-semibold text-red-800 mb-2">Acuerdo de Propiedad Intelectual</h3>
                <p className="text-sm text-red-700 mb-3">
                    Declaro que cualquier creación, invento, diseño o desarrollo realizado durante mi práctica será propiedad 
                    de la empresa, de acuerdo con las políticas establecidas en el convenio de prácticas.
                </p>
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        checked={data.intellectualProperty}
                        onChange={(e) => onChange('intellectualProperty', e.target.checked)}
                        className="mr-2 mt-1"
                        required
                    />
                    <span className="text-sm">Acepto los términos del acuerdo de propiedad intelectual</span>
                </label>
            </div>
        </div>
    );
};

export default FormCommitments;