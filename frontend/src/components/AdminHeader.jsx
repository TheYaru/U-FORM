import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo-fesc.png';

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
    };

    return (
        <header className="bg-black text-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img 
                        src={logo} 
                        alt="Logo FESC" 
                        className="h-16 mr-4"   
                    />
                </Link>
                <div className="flex justify-between items-center px-4 py-3">
                    
                    {user && (
                        <div className="flex items-center space-x-4">
                            <nav className="hidden md:block">
                                <ul className="flex space-x-1">
                                    <li>
                                        <Link 
                                            to="/admin" 
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin')}`}
                                        >
                                            Formularios
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/admin/stats" 
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/stats')}`}
                                        >
                                            Estadísticas
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            
                            <button 
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition text-sm"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;