import { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  autoplayInterval?: number;
}

export const HeroCarousel: React.FC<CarouselProps> = ({ 
  images, 
  autoplayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Empezamos en 1 porque el primer elemento es un duplicado
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Duplicamos las imágenes para crear un efecto de carrusel infinito
  const duplicatedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoplayInterval]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setIsTransitioning(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsTransitioning(true);
  };

  // Efecto para reiniciar el carrusel sin animación cuando llega al final
  useEffect(() => {
    if (currentIndex === 0) {
      // Si estamos en el primer duplicado, saltamos al último real sin animación
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(duplicatedImages.length - 2);
      }, 700); // Ajusta este tiempo para que coincida con la duración de la transición
    } else if (currentIndex === duplicatedImages.length - 1) {
      // Si estamos en el último duplicado, saltamos al primer real sin animación
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 700); // Ajusta este tiempo para que coincida con la duración de la transición
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-[30vh] sm:h-[30vh] md:h-[30vh] lg:h-[50vh] overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none',
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
            >
              <div className="relative w-full h-full">
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                  style={{ display: 'block' }} // Asegura que la imagen no tenga espacio inferior
                />
                {/* Overlay para mejorar la visibilidad en imágenes claras */}
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous button */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 start-0 z-30 flex items-center justify-center h-12 px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevious}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full"> 
          <svg
            className="w-4 h-4 text-gray-100 dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next button */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 end-0 z-30 flex items-center justify-center h-12 px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
          <svg
            className="w-4 h-4 text-gray-100 dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};