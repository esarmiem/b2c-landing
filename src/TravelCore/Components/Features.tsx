import { Disclosure } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

const features = [
  {
    title: 'Asistencia médica internacional',
    content: 'Cotiza un seguro de viaje internacional con las coberturas que necesitas.'
  },
  {
    title: 'Medicamentos',
    content: 'Cobertura para medicamentos prescritos durante el viaje.'
  },
  {
    title: 'Odontología',
    content: 'Atención dental de emergencia durante tu viaje.'
  },
  {
    title: 'Cancelación de vuelos',
    content: 'Protección contra cancelaciones imprevistas.'
  },
  {
    title: 'Pérdida de equipaje',
    content: 'Compensación por pérdida o daño de equipaje.'
  },
  {
    title: 'Asistencia médica con preexistencias',
    content: 'Cobertura para condiciones médicas preexistentes.'
  }
];

export const Features = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-12 text-center">
          ¿Qué debe tener un seguro internacional?
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img
              src="/robot-assistant.png"
              alt="Asistente virtual"
              className="w-full max-w-md mx-auto"
            />
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 bg-white rounded-lg shadow-sm">
                      <span>{feature.title}</span>
                      <FaChevronDown
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-primary`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600">
                      {feature.content}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};