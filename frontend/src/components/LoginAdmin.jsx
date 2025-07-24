import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createApiClient } from '../services/api';
import Logo1 from '../assets/Logo-FESC1.png'; 


const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiClient = createApiClient(''); 
            const response = await apiClient.post('/admin/login', { email, password });
            
            // Guardar token y datos de usuario
            login(response.data.token, {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                role: response.data.user.role
            });
            
            // Redirigir al dashboard de administrador
            navigate('/admin');
        } catch (err) {
            setError('Credenciales incorrectas');
            console.error('Login error:', err);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <div className="container mx-auto px-4 py-3 flex justify-center items-center">
                 <img 
                     src={Logo1} 
                     alt="Logo FESC" 
                     className="h-32 mr-8"   
                     />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Acceso Administrativo</h2>
                
                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Correo Institucional
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;