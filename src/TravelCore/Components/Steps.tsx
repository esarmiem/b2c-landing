
import { 
  FaClipboard, 
  FaExchangeAlt,
  FaFileInvoiceDollar, 
  FaUmbrella 
} from 'react-icons/fa';

const steps = [
  {
    icon: <FaClipboard className="w-8 h-8 text-primary" />,
    title: '1. Ingresa tus datos',
    description: 'Completa los datos del viaje para ver ofertas exclusivas.'
  },
  {
    icon: <FaExchangeAlt className="w-8 h-8 text-primary" />,
    title: '2. Compara seguros de viaje',
    description: 'Analiza las coberturas y elige qué necesitas para viajar.'
  },
  {
    icon: <FaFileInvoiceDollar className="w-8 h-8 text-primary" />,
    title: '3. Paga tu asistencia',
    description: 'Revisa los datos y paga tu seguro médico internacional.'
  },
  {
    icon: <FaUmbrella className="w-8 h-8 text-primary" />,
    title: '4. Viaja sin preocuparte',
    description: 'Recibe en tu correo el voucher con las instrucciones de uso.'
  }
];

export const Steps = () => {
  return (
    <section className="py-16 px-6">
      <h2 className="text-2xl font-bold text-center mb-12">
        Compra tu seguro de viaje en pocos pasos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="bg-primary text-white rounded-full py-2 px-8 hover:bg-primary-dark transition-colors">
          Cotizar
        </button>
      </div>
    </section>
  );
};