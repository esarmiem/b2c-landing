import { FileText, Globe, Clock, LucideIcon } from 'lucide-react';
import hero from '../../../../Assets/hero.webp';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WhyChooseUs: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: FileText,
      title: 'Conoce cada detalle',
      description: 'Te brindamos información clara y completa sobre las asistencias de viaje para que tomes decisiones informadas y sin sorpresas.',
    },
    {
      icon: Globe,
      title: 'Encuentra la asistencia perfecta',
      description: 'Compara precios, coberturas y beneficios, elige la opción que mejor se ajuste a tu viaje y asegúrate de estar protegido en todo momento.',
    },
    {
      icon: Clock,
      title: 'Siempre a tu lado',
      description: 'Te apoyamos durante todo el proceso, desde la cotización hasta el uso de tu asistencia, resolviendo cualquier duda o necesidad que surja en tu viaje.',
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={hero} 
              alt="Mobile app illustration"
              className="w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">¿Por qué elegir TravelKit?</h2>
            <p className="text-gray-600 mb-8">
              Te ayudamos a encontrar la asistencia ideal para tu viaje.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-center gap-4 border-2 border-gray-300 rounded-xl p-4">
                    <div>
                  <benefit.icon className="h-6 w-6 text-red-600 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};