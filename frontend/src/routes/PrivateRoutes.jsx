import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return <div className="p-4 text-center">Cargando...</div>;
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
