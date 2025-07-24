import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Formulario enviado con éxito!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu formulario ha sido registrado correctamente. 
          Recibirás un correo de confirmación próximamente.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
          >
            Volver al inicio
          </Link>
          
          <Link
            to="/admin"
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
          >
            Panel de administración
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Número de seguimiento: #{(Math.random() * 100000).toFixed(0)}</p>
          <p className="mt-2">Fecha y hora: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;