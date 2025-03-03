import {
  ClipboardList,
  FileText,
  CreditCard,
  Sparkle,
  Stamp as Passport,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import steps1 from '../../../../Assets/steps1.webp';
import steps2 from '../../../../Assets/steps2.webp';
import steps3 from '../../../../Assets/steps3.webp';
import steps4 from '../../../../Assets/steps4.webp';

export const TravelSteps = () => {
  const { t } = useTranslation(["home"]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Habilita el scroll suave
    });
  };

  const steps = [
    {
      number: "1",
      title: t("label-title-content-step-1"),
      description: t("label-text-content-step-1"),
      image: steps1, 
      icon: ClipboardList,
    },
    {
      number: "2",
      title: t("label-title-content-step-2"),
      description: t("label-text-content-step-2"),
      image: steps2, 
      icon: FileText,
    },
    {
      number: "3",
      title: t("label-title-content-step-3"),
      description: t("label-text-content-step-3"),
      image: steps3, 
      icon: CreditCard,
    },
    {
      number: "4",
      title: t("label-title-content-step-4"),
      description: t("label-text-content-step-4"),
      image: steps4,
      icon: Passport,
    },
  ];

  return (
    <section className="container mx-auto py-10 md:py-12 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {/* Header */}
      <div className="text-center flex flex-col items-center mb-12">
        <Sparkle className="h-6 w-6 md:h-8 md:w-8 lg:h-8 lg:w-8 text-primary" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          {t("title-stepper")}
        </h2>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold italic">
          {t("subtitle-stepper")}
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
        <div className="space-y-4 md:space-y-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className="flex-1 md:w-1/2 flex items-center">
                <div
                  className={`bg-white flex gap-2 items-center p-6 rounded-lg shadow-lg md:hover:shadow-xl border relative ${
                    index % 2 === 0
                      ? "md:text-start"
                      : "md:flex-row-reverse md:gap-4"
                  }`}
                >
                  <div className="flex flex-col items-start gap-2 mb-2 text-red-600 font-bold">
                    <span>
                      {step.number}. {step.title}
                    </span>
                    <p className="text-gray-600 font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="bg-red-700 text-white rounded-md p-1">
                    <step.icon className="h-7 w-7" />
                  </div>
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
          className="relative overflow-hidden border border-red-600 bg-red-600 text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-600 hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black rounded-full px-8 py-6 text-lg cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t("label-button-stepper")} →
          </span>
        </button>
      </div>
    </section>
  );
};
