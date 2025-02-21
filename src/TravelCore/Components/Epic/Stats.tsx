import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

interface StatItem {
  number: string;
  label: string;
  value: number;
}

export const Stats = () => {
  const { t } = useTranslation(["home"]);
  
  // Extraer los valores numéricos de los strings
  const extractNumberFromString = (str: string): number => {
    // Primero eliminar el "+" y "de" o "than" del string
    const cleanStr = str.replace(/\+\s*(de|than)\s*/gi, '').trim();
    // Extraer el número, eliminando los puntos de miles
    const match = cleanStr.match(/(\d+(?:[\.,]\d+)?)/);
    return match ? parseFloat(match[0].replace(/\./g, '')) : 0;
  };

  const rawStats: StatItem[] = [
    {
      number: t('data-sales-testimonials'),
      label: t('text-sales-testimonials'),
      value: extractNumberFromString(t('data-sales-testimonials')),
    },
    {
      number: t('data-travelers-testimonials'),
      label: t('text-travelers-testimonials'),
      value: extractNumberFromString(t('data-travelers-testimonials')),
    },
    {
      number: t('data-experience-testimonials'),
      label: t('text-experience-testimonials'),
      value: extractNumberFromString(t('data-experience-testimonials')),
    },
  ];

  // Estado para los valores animados
  const [animatedValues, setAnimatedValues] = useState<number[]>(rawStats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Función para formatear el número según el formato original
  const formatNumber = (value: number, originalFormat: string): string => {
    if (originalFormat.includes("Años") || originalFormat.includes("Years")) {
      return `+ ${t('data-experience-testimonials').includes('de') ? 'de' : 'than'} ${Math.round(value)} ${
        t('data-experience-testimonials').includes('Años') ? 'Años' : 'Years'
      }`;
    }
    return `+ ${t('data-sales-testimonials').includes('de') ? 'de' : 'than'} ${Math.floor(value).toLocaleString('es-ES')}`;
  };

  useEffect(() => {
    // Verificar si el elemento está visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const startAnimation = (): void => {
    // Duración de la animación en milisegundos
    const animationDuration = 2000;
    // Velocidad de actualización en milisegundos
    const updateInterval = 30;
    // Número total de pasos
    const steps = animationDuration / updateInterval;
    
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        // Finalizar animación con valores exactos
        setAnimatedValues(rawStats.map(stat => stat.value));
        clearInterval(interval);
        return;
      }

      // Calcular valores intermedios usando easeOutQuad para una animación más natural
      const progress = easeOutQuad(currentStep / steps);
      
      setAnimatedValues(
        rawStats.map(stat => stat.value * progress)
      );
    }, updateInterval);
  };

  // Función de easing para una animación más suave
  const easeOutQuad = (t: number): number => t * (2 - t);

  return (
    <section 
      ref={sectionRef}
      className="hidden lg:flex pt-4 pb-16 bg-red-800 text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {rawStats.map((stat, index) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold mb-2">
                {formatNumber(animatedValues[index], stat.number)}
              </p>
              <p className="">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;