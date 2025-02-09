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
      content: t('content-accordion-feature-medicines')
    },
    {
      title: t('title-accordion-feature-dental'),
      content: t('content-accordion-feature-dental')
    },
    {
      title: t('title-accordion-feature-cancel'),
      content: t('content-accordion-feature-cancel')
    },
    {
      title: t('title-accordion-feature-loss'),
      content: t('content-accordion-feature-loss')
    },
    {
      title:  t('title-accordion-feature-preexisting'),
      content: t('content-accordion-feature-preexisting')
    }
  ];

  const toggleItem = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <section className="py-6 lg:py-2 px-6 mx-auto bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12 lg:mb-0">
            {t('title-features')}
          </h2>
      <div className="grid md:grid-cols-2 gap-4 px-8 items-center">
        <div className="relative order-last md:order-first">
          <img
            src={travelImage}
            alt="Travel illustration"
            className="w-full"
          />
        </div>
        
        <div>
          <div className="w-full space-y-2">
            {features.map((feature, i) => (
              <div key={i} className="border-2 rounded-lg bg-white">
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