import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Crea el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const verifyAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            
            if (!storedToken) {
                setLoading(false);
                return;
            }
            
            try {
                const response = await api.get('/admin/verify');
                setUser(response.data.user);
            } catch (error) {
                console.error('Verification error:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };
        
        verifyAuth();
    }, []);
    
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };
    
    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Exporta el proveedor por defecto
export default AuthProvider;