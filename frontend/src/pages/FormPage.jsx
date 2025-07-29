import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSection from "../components/FormStudent";
import CompanySection from "../components/FormCompany";
import BossSection from "../components/FormBoss";
import PracticeSection from "../components/FormPractice";
import CommitmentsSection from "../components/FormCommitments";
import SignatureSection from "../components/SignatureSection";
import { createForm } from '../services/formService';

const FormPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            student: {
                fullName: '',
                documentType: 'CC',
                documentNumber: '', 
                educationLevel: 'Tecnología',
                academicProgram: '',
                phone: '',
                email: ''
            },
            company: {
                name: '',
                legalRepresentative: '',
                nit: '',
                economicActivity: '',
                economicSector: '',
                nationality: '',
                size: '',
                website: '',
                address: '',
                phone: ''
            },
            boss: {
                fullName: '',
                position: '',
                email: '',
                phone: '',
                documentType: 'CC',
                documentNumber: ''
            },
            practice: {
                modality: 'CONVENIO',
                subModality: 'Regional o Nacional',
                position: '',
                department: '',
                startDate: '',
                endDate: '',
                workSchedule: '',
                isPaid: false,
                salary: '',
                providesUniform: false,
                selectedFunctions: [],
                otraFuncion: null,
                functionsDescription: '',
                functions: '',
                resources: {
                    computer: false,
                    others: false,
                    othersDescription: ''
                },
                hours: '',
                advisor: '',
                career: ''
            },
            commitments: {
                reports: false,
                compliance: false,
                attendance: false,
                confidentiality: false,
                intellectualProperty: false
            },
            signatures: {
                student: '',
                boss: '',
                advisor: ''
            }
        };
    });
    
    const [signature, setSignature] = useState('');
    const [bossSignature, setBossSignature] = useState('');
    const [advisorSignature, setAdvisorSignature] = useState('');
    const navigate = useNavigate();

    // Guardar datos en localStorage
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleNestedChange = (section, subSection, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subSection]: {
                    ...prev[section][subSection],
                    [field]: value
                }
            }
        }));
    };

    const handleSignatureSave = (signatures) => {
        setSignature(signatures.student);
        setBossSignature(signatures.boss);
        setAdvisorSignature(signatures.advisor);
        setFormData(prev => ({
            ...prev,
            signatures: {
                student: signatures.student,
                boss: signatures.boss,
                advisor: signatures.advisor
            }
        }));
        alert('Firmas guardadas correctamente');
    };

    // Aquí procesamos las funciones seleccionadas antes de enviar
    const processPracticeFunctions = (practice) => {
        if (practice.selectedFunctions?.length > 0 || practice.otraFuncion || practice.functionsDescription) {
            const funcionesFinal = [
                ...(practice.selectedFunctions || []),
                ...(practice.otraFuncion ? [practice.otraFuncion] : [])
            ].join(', ');
            return funcionesFinal + (practice.functionsDescription ? ` - ${practice.functionsDescription}` : '');
        }
        return practice.functions || '';
    };

    const handleSubmit = async () => {
        try {
            // Procesar funciones antes de enviar
            const processedPractice = {
                ...formData.practice,
                functions: processPracticeFunctions(formData.practice)
            };

            const completeFormData = {
                ...formData,
                practice: processedPractice,
                signatures: {
                    student: signature,
                    boss: bossSignature,
                    advisor: advisorSignature
                }
            };

            console.log('Enviando formulario:', completeFormData);

            const response = await createForm(completeFormData);
            console.log('Respuesta del servidor:', response);

            localStorage.removeItem('formData');
            navigate('/success', { state: { formId: response.id } });
        } catch (error) {
            console.error('Error completo:', error);
            alert(`Error al enviar el formulario: ${error.message}`);
        }
    };

    const nextStep = () => {
        let valid = true;
        let errorMessage = '';
        
        switch(step) {
            case 1:
                if (!formData.student.fullName || !formData.student.documentNumber) {
                    valid = false;
                    errorMessage = 'Nombre completo y documento son requeridos';
                }
                break;
            case 2:
                if (!formData.company.name || !formData.company.nit) {
                    valid = false;
                    errorMessage = 'Nombre de empresa y NIT son requeridos';
                }
                break;
            case 3:
                if (!formData.boss.fullName || !formData.boss.position) {
                    valid = false;
                    errorMessage = 'Nombre y cargo del jefe son requeridos';
                }
                break;
            case 4:
                if (!formData.practice.position || !formData.practice.startDate) {
                    valid = false;
                    errorMessage = 'Cargo y fecha de inicio son requeridos';
                }
                break;
            case 5:
                if (!formData.commitments.reports || !formData.commitments.compliance) {
                    valid = false;
                    errorMessage = 'Debes aceptar todos los compromisos';
                }
                break;
            case 6:
                if (!signature || !bossSignature || !advisorSignature) {
                    valid = false;
                    errorMessage = 'Debes guardar todas las firmas';
                }
                break;
        }
        
        if (!valid) {
            alert(errorMessage);
            return;
        }
        
        setStep(step + 1);
    };
    
    const prevStep = () => setStep(step > 1 ? step - 1 : 1);

    const stepLabels = [
        "Estudiante",
        "Empresa",
        "Jefe",
        "Práctica",
        "Compromisos",
        "Firma"
    ];

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Formato de Iniciación y Compromiso</h1>
            
            <div className="mb-8 bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-2">
                    {stepLabels.map((label, index) => (
                        <div key={index} className={`text-center flex-1 ${step > index ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                                step > index ? 'bg-green-500 text-white' : 
                                step === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200'
                            }`}>
                                {index + 1}
                            </div>
                            <span className="text-xs mt-1 block">{label}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${((step - 1) / 5) * 100}%` }}
                    ></div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                {step === 1 && (
                    <StudentSection 
                        data={formData.student} 
                        onChange={(field, value) => handleChange('student', field, value)} 
                    />
                )}
                
                {step === 2 && (
                    <CompanySection 
                        data={formData.company} 
                        onChange={(field, value) => handleChange('company', field, value)} 
                    />
                )}
                
                {step === 3 && (
                    <BossSection 
                        data={formData.boss} 
                        onChange={(field, value) => handleChange('boss', field, value)} 
                    />
                )}
                
                {step === 4 && (
                    <PracticeSection 
                        data={formData.practice} 
                        onChange={(field, value) => handleChange('practice', field, value)} 
                        onNestedChange={handleNestedChange} 
                    />
                )}
                
                {step === 5 && (
                    <CommitmentsSection 
                        data={formData.commitments} 
                        onChange={(field, value) => handleChange('commitments', field, value)} 
                    />
                )}
                
                {step === 6 && (
                    <SignatureSection onSave={handleSignatureSave} />
                )}
            </div>

            <div className="flex justify-between">
                <button 
                    onClick={prevStep} 
                    disabled={step === 1}
                    className={`px-4 py-2 rounded ${
                        step === 1 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                    }`}
                >
                    Anterior
                </button>
                
                {step < 6 ? (
                    <button 
                        onClick={nextStep} 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button 
                        onClick={handleSubmit} 
                        disabled={!signature || !bossSignature || !advisorSignature}
                        className={`px-4 py-2 rounded ${
                            signature && bossSignature && advisorSignature
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Enviar Formulario
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormPage;