

export const Stats = () => {
  const stats = [
    {
      number: '+ de 290.000',
      label: 'Seguros Vendidos',
    },
    {
      number: '+ de 500.000',
      label: 'Viajeros Asegurados',
    },
    {
      number: '+ de 10 Años',
      label: 'de experiencia en el mercado',
    },
  ];

  return (
    <section className="py-16 bg-red-800 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold mb-2">{stat.number}</p>
              <p className="">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;