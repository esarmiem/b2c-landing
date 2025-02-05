import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import profile1 from '../../../../Assets/emma.webp';
import profile2 from '../../../../Assets/jhon.webp';
import profile3 from '../../../../Assets/valen.webp';
import {useTranslation} from "react-i18next";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  image: string;
}

export const Testimonials = () => {
  const { t } = useTranslation(["home"])
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    testimonials.forEach((testimonial) => {
      const img = new Image();
      img.src = testimonial.image;
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [testimonial.image]: true
        }));
      };
    });
  }, []);

  const testimonials: Testimonial[] = [
    {
      name: 'Valen A.',
      text: t('text-testimonials-1'),
      rating: 5,
      image: profile1
    },
    {
      name: 'Juan P.',
      text:  t('text-testimonials-2'),
      rating: 5,
      image: profile2
    },
    {
      name: 'María S.',
      text:  t('text-testimonials-3'),
      rating: 5,
      image: profile3
    },
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/api/placeholder/64/64";
  };

  return (
    <section className="py-16 bg-red-800 text-white px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          {t('title-testimonials')}
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative h-[200px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-500 transform ${
                  index === currentIndex 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    onError={handleImageError}
                    className={`rounded-full w-16 h-16 object-cover transition-opacity duration-300 ${
                      imagesLoaded[testimonial.image] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mb-4">{testimonial.text}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
