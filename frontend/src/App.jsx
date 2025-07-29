import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import AdminPage from './pages/AdminPage';
import LoginAdmin from './components/LoginAdmin';
import AuthProvider from './context/AuthContext'; // Importa el proveedor
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import SuccessPage from './pages/SuccessPage';
import EstadisticsPage from './pages/StadisticsPage'; 
import AdminEditForm from './pages/AdminEditForm';  

function App() {
    return (
        <Router>
            <AuthProvider> {/* Usa el proveedor */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/formulario" element={<FormPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="/login" element={<LoginAdmin />} />
                    
                    <Route element={<PrivateRoutes />}>
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/stats" element={<EstadisticsPage />} />
                        <Route path="/admin/editar/:id" element={<AdminEditForm />} />
                    </Route>
                    
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;