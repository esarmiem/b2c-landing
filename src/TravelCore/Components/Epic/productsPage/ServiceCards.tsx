import { Phone, Globe, HeadphonesIcon } from 'lucide-react';
import { Link } from '../../Raw/Link';

interface ServiceCard {
  icon: React.ElementType;
  title: string;
  href: string;
}

interface ServiceCardsProps {}

export const ServiceCards: React.FC<ServiceCardsProps> = () => {
  const services: ServiceCard[] = [
    {
      icon: Globe,
      title: 'Asistencia Internacional',
      href: '/Home',
    },
    {
      icon: Phone,
      title: 'Comunicación Internacional',
      href: '/comunicacion-internacional',
    },
    {
      icon: HeadphonesIcon,
      title: 'Contacta con un asesor',
      href: '/contacto-asesor',
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href}>
              <div className="bg-gray-200 rounded-xl shadow-md p-4 flex flex-row justify-center items-center gap-2 border-2 border-gray-500 hover:bg-gray-50 hover:translate-y-[-0.485rem] transition-all duration-800 ease-in-out">
                <service.icon className="h-6 w-6 text-gray-600" />
                <h4 className="font-semibold text-lg">{service.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
