import { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  autoplayInterval?: number;
}

export const HeroCarousel: React.FC<CarouselProps> = ({ 
  images, 
  autoplayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoplayInterval]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-[30vh] sm:h-[30vh] md:h-[50vh] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex items-center justify-center ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={image}
                className="absolute w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
              {/* Overlay para mejorar la visibilidad en imágenes claras */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous button */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 start-0 z-30 flex items-center justify-center h-12 px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevious}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full "> 
        {/* bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none */}
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