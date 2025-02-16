import {
  ClipboardList,
  FileText,
  CreditCard,
  Sparkle,
  Stamp as Passport,
} from "lucide-react";
import { useTranslation } from "react-i18next";

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
      image: "../../../../Assets/steps1.webp",
      icon: ClipboardList,
    },
    {
      number: "2",
      title: t("label-title-content-step-2"),
      description: t("label-text-content-step-2"),
      image: "../../../../Assets/steps2.webp",
      icon: FileText,
    },
    {
      number: "3",
      title: t("label-title-content-step-3"),
      description: t("label-text-content-step-3"),
      image: "../../../../Assets/steps3.webp",
      icon: CreditCard,
    },
    {
      number: "4",
      title: t("label-title-content-step-4"),
      description: t("label-text-content-step-4"),
      image: "../../../../Assets/steps4.webp",
      icon: Passport,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-10 md:py-12 lg:py-12">
      {/* Header */}
      <div className="text-center flex flex-col items-center mb-12">
        <Sparkle className="h-6 w-6 md:h-8 md:w-8 lg:h-8 lg:w-8 text-primary"/>
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
                  className={`bg-white flex gap-2 items-center p-6 rounded-lg shadow-lg border relative ${
                    index % 2 === 0 ? "md:text-start" : "md:flex-row-reverse md:gap-4"
                  }`}
                >
                  <div className="flex flex-col items-start gap-2 mb-2 text-red-600 font-bold">
                    <span>
                      {step.number}. {step.title}
                    </span>
                    <p className="text-gray-600 font-normal">{step.description}</p>
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
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full cursor-pointer"
        >
          {t("label-button-stepper")} →
        </button>
      </div>
    </section>
  );
};
