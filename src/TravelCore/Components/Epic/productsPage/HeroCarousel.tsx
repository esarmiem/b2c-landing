import { useEffect, useState } from 'react';
// Importar las imágenes
import slide1 from '../../../../../src/Assets/hero.webp';
import slide2 from '../../../../../src/Assets/avion.webp';
import slide3 from '../../../../../src/Assets/cuba.webp';
import slide4 from '../../../../../src/Assets/lancha.webp';
import slide5 from '../../../../../src/Assets/hero.webp';

// Definir el tipo para las imágenes importadas
type ImageType = {
  src: string;
  alt: string;
};

const IMAGES: ImageType[] = [
  { src: slide1, alt: 'Slide 1' },
  { src: slide2, alt: 'Slide 2' },
  { src: slide3, alt: 'Slide 3' },
  { src: slide4, alt: 'Slide 4' },
  { src: slide5, alt: 'Slide 5' },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Utility function to replace cn
  const classNames = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className="relative h-[380px] w-full overflow-hidden">
      {IMAGES.map((image, index) => (
        <div
          key={index}
          className={classNames(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            style={{ position: 'absolute' }}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-end">
        <div className="container px-2">
          <div className="px-4 md:px-10 text-white">
            <p className="text-md md:text-md">
            ⭐⭐⭐⭐⭐ 4.99 calificación media
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Viajes Protegidos
            </h1>
            <p className="text-sm md:text-xl">
              Disfruta de soporte ante emergencias médicas, cancelaciones, 
            </p>
            <p className="text-sm md:text-xl">pérdida de equipaje y otros imprevistos durante tu aventura.</p>
          </div>
        </div>
      </div>
    </div>
  );
};