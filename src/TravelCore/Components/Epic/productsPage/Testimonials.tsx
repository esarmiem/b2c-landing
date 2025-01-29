import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Valen A.',
    text: 'Seriedad y cumplimiento al instante. Laura y Dani fueron muy atentos conmigo en el WhatsApp, me resolvieron mi inquietud de inmediato.',
    rating: 5,
  },
  {
    name: 'María S.',
    text: 'Excelente servicio y atención al cliente. Muy recomendado.',
    rating: 5,
  },
  {
    name: 'Juan P.',
    text: 'La mejor asistencia de viaje que he tenido. Muy profesionales.',
    rating: 5,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-red-800 text-white px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          Hemos acompañado a miles de viajeros increíbles
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
                    src="/api/placeholder/64/64"
                    alt={testimonial.name}
                    className="rounded-full w-16 h-16"
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

export default Testimonials;