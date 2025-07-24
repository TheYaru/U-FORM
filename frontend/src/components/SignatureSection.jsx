import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureSection = ({ onSave }) => {
    const sigRef = useRef(null);
    
    const clearSignature = () => {
        sigRef.current.clear();
    };

    const saveSignature = () => {
        if (sigRef.current.isEmpty()) {
            alert('Por favor, proporciona tu firma');
            return;
        }
        const signature = sigRef.current.toDataURL();
        onSave(signature);
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">6. Firma del Estudiante</h2>
            
            <div className="border rounded p-4 bg-white mb-4">
                <SignatureCanvas
                    ref={sigRef}
                    penColor="black"
                    canvasProps={{
                        className: 'signature-canvas w-full h-40 bg-gray-100'
                    }}
                />
                <p className="text-center text-sm text-gray-500">Firma aquí</p>
            </div>
            
            <div className="flex space-x-2 mb-4">
                <button 
                    type="button"
                    onClick={clearSignature}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                >
                    Limpiar
                </button>
                <button 
                    type="button"
                    onClick={saveSignature}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                >
                    Guardar Firma
                </button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <h3 className="font-semibold text-red-800 mb-2">Declaración Final</h3>
                <p className="text-sm text-red-700 mb-3">
                    Al guardar mi firma, declaro bajo juramento que toda la información proporcionada en este formulario 
                    es verídica y completa. Acepto los términos del convenio de prácticas profesionales y me comprometo 
                    a cumplir con todas las obligaciones establecidas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Fecha de firma</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border rounded"
                            value={new Date().toISOString().split('T')[0]}
                            readOnly
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 mb-2">Lugar de firma</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Ciudad, Departamento"
                            required
                        />
                    </div>
                </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-yellow-700 text-sm">
                    <span className="font-bold">Importante:</span> 
                    Tu firma digital tiene la misma validez legal que una firma manuscrita. 
                    Guarda una copia de este formulario para tus registros personales.
                </p>
            </div>
        </div>
    );
};

export default SignatureSection;