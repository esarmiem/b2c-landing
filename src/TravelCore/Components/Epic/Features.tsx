import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import travelImage from '../../../../Assets/TRAVELKIT_Banners-02.webp'
import {useTranslation} from "react-i18next";

export const Features = () => {
  const { t } = useTranslation(["home"])

  const [openItem, setOpenItem] = useState<string | null>(null);

  const features = [
    {
      title: t('title-accordion-feature-medical'),
      content: t('content-accordion-feature-medical')
    },
    {
      title: t('title-accordion-feature-medicines'),
      content: 'Reembolso de medicamentos prescritos durante el viaje, con cobertura para medicamentos esenciales y de emergencia.'
    },
    {
      title: t('title-accordion-feature-dental'),
      content: 'Atención dental de emergencia en el extranjero, incluyendo tratamientos para aliviar el dolor y emergencias dentales.'
    },
    {
      title: t('title-accordion-feature-cancel'),
      content: 'Compensación por cancelaciones de vuelo, incluyendo reembolso de gastos de hotel y nuevos tickets cuando sea necesario.'
    },
    {
      title: t('title-accordion-feature-loss'),
      content: 'Compensación por pérdida, robo o daño del equipaje durante el viaje, con cobertura para artículos personales.'
    },
    {
      title:  t('title-accordion-feature-preexisting'),
      content: 'Cobertura para condiciones médicas preexistentes, incluyendo seguimiento y tratamiento de enfermedades crónicas durante el viaje.'
    }
  ];

  const toggleItem = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <section className="py-16 px-6 container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={travelImage}
            alt="Travel illustration"
            className="w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-8">
            {t('title-features')}
          </h2>
          <div className="w-full space-y-2">
            {features.map((feature, i) => (
              <div key={i} className="border rounded-lg">
                <button
                  className="w-full flex justify-between items-center p-4 font-medium text-left"
                  onClick={() => toggleItem(`item-${i}`)}
                >
                  {feature.title}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      openItem === `item-${i}` ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openItem === `item-${i}` && (
                  <div className="p-4 pt-0">
                    {feature.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;