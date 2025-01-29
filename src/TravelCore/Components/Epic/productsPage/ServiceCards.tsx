import { Phone, Globe } from 'lucide-react';
import { Link } from '../../Raw/Link';

interface ServiceCard {
  icon: React.ElementType;
  title: string;
  title2: string;
  href: string;
}

interface ServiceCardsProps {}

export const ServiceCards: React.FC<ServiceCardsProps> = () => {
  const services: ServiceCard[] = [
    {
      icon: Globe,
      title: 'Asistencia',
      title2: 'Internacional',
      href: '/Home',
    },
    {
      icon: Phone,
      title: 'Comunicación',
      title2: 'Internacional',
      href: '/comunicacion-internacional',
    },
  ];

  // {
  //   icon: HeadphonesIcon,
  //   title: 'Contacta con',
  //   title2: 'un asesor',
  //   href: '/contacto-asesor',
  // },

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-center gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Link 
              key={service.title} 
              href={service.href}
              className={`${
                index === 2 ? 'col-span-2 w-1/2 mx-auto lg:w-[300px] lg:mx-0' : ''
              }`}
            >
              <div className="z-10 relative bg-gray-200 rounded-xl w-full mt-[-95px] md:w-[300px] shadow-md p-4 flex flex-row justify-center items-center gap-2 border-2 border-gray-500 hover:bg-gray-50 hover:translate-y-[-0.485rem] transition-all duration-800 ease-in-out">
                <service.icon className="h-6 w-6 text-gray-600" />
                <div>
                  <h4 className="font-semibold text-sm md:text-base lg:text-lg xl:text-lg">{service.title}</h4>
                  <h4 className="font-semibold text-sm md:text-base lg:text-lg xl:text-lg">{service.title2}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};