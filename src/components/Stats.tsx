import React from 'react';

const stats = [
  {
    number: '+de 290.000',
    label: 'seguros vendidos'
  },
  {
    number: '+de 500.000',
    label: 'viajeros asegurados'
  },
  {
    number: '+de 10 años',
    label: 'de experiencia en el mercado'
  }
];

const testimonials = [
  {
    text: "Seriedad y cumplimiento al instante. Laura y Dani fueron muy atentos conmigo en el WhatsApp, me resolvieron mi inquietud de inmediato. Los felicito",
    author: "César P.",
    date: "25 de julio 2021"
  },
  {
    text: "Ofrecen facilidad de compra, buenas condiciones y diferentes opciones en una sola pantalla",
    author: "Gloria S.",
    date: "26 de enero 2021"
  },
  {
    text: "La página te ofrece varias opciones y precios de compañías para elegir tu servicio. Esto me parece muy bueno, ya que algunos tienen menos compromiso un seguro de viaje internacional y no sabemos que agencias ofrecen este servicio",
    author: "Javier C.",
    date: "24 de julio 2021"
  }
];

export const Stats = () => {
  return (
    <section className="bg-primary text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div>{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white text-gray-800 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                {'⭐'.repeat(5)}
              </div>
              <p className="mb-4">{testimonial.text}</p>
              <div className="text-sm">
                <div className="font-bold">{testimonial.author}</div>
                <div className="text-gray-500">{testimonial.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};