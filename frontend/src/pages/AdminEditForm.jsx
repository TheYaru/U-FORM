import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import FormStudent from '../components/FormStudent';
import FormCompany from '../components/FormCompany';
import FormBoss from '../components/FormBoss';
import FormPractice from '../components/FormPractice';
import FormCommitments from '../components/FormCommitments';
import SignatureSection from '../components/SignatureSection';

const AdminEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Normaliza los datos para evitar undefined en recursos y otros campos anidados
    const normalizeFormData = (form) => ({
        ...form,
        student: {
            fullName: '',
            documentType: 'CC',
            documentNumber: '',
            educationLevel: 'Tecnología',
            academicProgram: '',
            phone: '',
            email: '',
            ...(form.student || {})
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
            phone: '',
            ...(form.company || {})
        },
        boss: {
            fullName: '',
            position: '',
            email: '',
            phone: '',
            documentType: 'CC',
            documentNumber: '',
            ...(form.boss || {})
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
                othersDescription: '',
                ...(form.practice?.resources || {})
            },
            hours: '',
            advisor: '',
            career: '',
            ...(form.practice || {})
        },
        commitments: {
            reports: false,
            compliance: false,
            attendance: false,
            confidentiality: false,
            intellectualProperty: false,
            ...(form.commitments || {})
        },
        signatures: {
            student: '',
            boss: '',
            advisor: '',
            ...(form.signatures || {})
        }
    });

    useEffect(() => {
        api.get(`/forms/${id}`).then(res => {
            setFormData(normalizeFormData(res.data));
            setLoading(false);
        });
    }, [id]);

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
        setFormData(prev => ({
            ...prev,
            signatures: {
                ...prev.signatures,
                ...signatures
            }
        }));
    };

    const handleSave = async () => {
        await api.put(`/forms/${id}`, formData);
        alert('Formulario actualizado correctamente');
        navigate('/admin');
    };

    if (loading || !formData) return <div className="p-4 text-center">Cargando...</div>;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Editar Formulario</h1>
            <div className="mb-6">
                <FormStudent
                    data={formData.student}
                    onChange={(field, value) => handleChange('student', field, value)}
                />
            </div>
            <div className="mb-6">
                <FormCompany
                    data={formData.company}
                    onChange={(field, value) => handleChange('company', field, value)}
                />
            </div>
            <div className="mb-6">
                <FormBoss
                    data={formData.boss}
                    onChange={(field, value) => handleChange('boss', field, value)}
                />
            </div>
            <div className="mb-6">
                <FormPractice
                    data={formData.practice}
                    onChange={(field, value) => handleChange('practice', field, value)}
                    onNestedChange={handleNestedChange}
                />
            </div>
            <div className="mb-6">
                <FormCommitments
                    data={formData.commitments}
                    onChange={(field, value) => handleChange('commitments', field, value)}
                />
            </div>
            <div className="mb-6">
                <SignatureSection
                    onSave={handleSignatureSave}
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default AdminEditForm;