import {
  ClipboardList,
  FileText,
  CreditCard,
  Stamp as Passport,
} from "lucide-react";
import {useTranslation} from "react-i18next";

export const TravelSteps = () => {
  const { t } = useTranslation(["home"])


  const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Habilita el scroll suave
        });
      };

  const steps = [
    {
      number: "1",
      title: t('label-title-content-step-1'),
      description: t('label-text-content-step-1'),
      image: "../../../../Assets/steps1.webp",
      icon: ClipboardList,
    },
    {
      number: "2",
      title: t('label-title-content-step-2'),
      description: t('label-text-content-step-2'),
      image: "../../../../Assets/steps2.webp",
      icon: FileText,
    },
    {
      number: "3",
      title: t('label-title-content-step-3'),
      description: t('label-text-content-step-3'),
      image: "../../../../Assets/steps3.webp",
      icon: CreditCard,
    },
    {
      number: "4",
      title: t('label-title-content-step-4'),
      description:
          t('label-text-content-step-4'),
      image: "../../../../Assets/steps4.webp",
      icon: Passport,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          {t('title-stepper')}
        </h2>
        <p className="text-lg md:text-xl text-gray-500 italic">
          {t('subtitle-stepper')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
        <div className="space-y-4 md:space-y-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1 md:w-1/2 flex items-center shadow-lg md:shadow-none">
                <div
                  className={`bg-white p-6 rounded-lg shadow-sm border relative ${
                    index % 2 === 0 ? "md:text-start" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
            
                    <span>
                      {step.number}. {step.title}
                    </span>
                    <div className="bg-red-500 text-white rounded-md p-1">
                    <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              {/* Image */}
              <div className={`flex-1 md:w-1/2 hidden md:block`}>
                <div
                  className={`relative aspect-square max-w-md mx-auto rounded-full overflow-hidden`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <button
          onClick={scrollToTop} // Llama a la función de scroll suave
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full cursor-pointer"
        >
          {t('label-button-stepper')} →
        </button>
      </div>
    </section>
  );
};
