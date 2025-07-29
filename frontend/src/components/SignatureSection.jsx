import React, { useState, useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

const SignatureSection = ({ onSave }) => {
    const [signature, setSignature] = useState('');
    const [bossSignature, setBossSignature] = useState('');
    const [advisorSignature, setAdvisorSignature] = useState('');
    const signaturePadRef = useRef(null);
    const bossSignaturePadRef = useRef(null);
    const advisorSignaturePadRef = useRef(null);

    const handleSave = () => {
        onSave({
            student: signature,
            boss: bossSignature,
            advisor: advisorSignature
        });
        alert('Firmas guardadas correctamente');
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">6. Firmas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Firma del Estudiante */}
                <div className="border p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Estudiante Practicante</h3>
                    <SignaturePad
                        canvasProps={{width: 300, height: 150, className: 'sigCanvas border'}}
                        ref={signaturePadRef}
                    />
                    <div className="flex gap-2 mt-2">
                        <button 
                            onClick={() => setSignature(signaturePadRef.current.toDataURL())}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Guardar Firma
                        </button>
                        <button 
                            onClick={() => signaturePadRef.current.clear()}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
                
                {/* Firma del Jefe Inmediato */}
                <div className="border p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Jefe Inmediato</h3>
                    <SignaturePad
                        canvasProps={{width: 300, height: 150, className: 'sigCanvas border'}}
                        ref={bossSignaturePadRef}
                    />
                    <div className="flex gap-2 mt-2">
                        <button 
                            onClick={() => setBossSignature(bossSignaturePadRef.current.toDataURL())}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Guardar Firma
                        </button>
                        <button 
                            onClick={() => bossSignaturePadRef.current.clear()}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>

                {/* Firma del Docente Asignado */}
                <div className="border p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Docente Asignado</h3>
                    <SignaturePad
                        canvasProps={{width: 300, height: 150, className: 'sigCanvas border'}}
                        ref={advisorSignaturePadRef}
                    />
                    <div className="flex gap-2 mt-2">
                        <button 
                            onClick={() => setAdvisorSignature(advisorSignaturePadRef.current.toDataURL())}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Guardar Firma
                        </button>
                        <button 
                            onClick={() => advisorSignaturePadRef.current.clear()}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-6">
                <button 
                    onClick={handleSave}
                    disabled={!signature || !bossSignature || !advisorSignature}
                    className={`px-4 py-2 rounded ${
                        signature && bossSignature && advisorSignature
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Confirmar Firmas
                </button>
            </div>
        </div>
    );
};

export default SignatureSection;