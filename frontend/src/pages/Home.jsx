import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100 bg-cover bg-center px-4">
            <div className="bg-white bg-opacity-80 rounded-lg shadow-xl p-10 max-w-lg w-full text-center">
                <h1 className="text-3xl font-semibold text-black mb-8">
                    Plataforma de Prácticas FESC
                </h1>

                <div className="flex flex-col gap-6">   
                    <button
                        onClick={() => navigate('/formulario')}
                        className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all font-medium"
                    >
                        Llenar formulario de práctica
                    </button>

                    <button
                        onClick={() => navigate('/admin')}
                        className="border border-black text-black py-3 px-6 rounded-lg hover:bg-black hover:text-white transition-all font-medium"
                    >
                        Ingresar como administrador
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;