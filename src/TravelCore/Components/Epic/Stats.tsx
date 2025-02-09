import {useTranslation} from "react-i18next";


export const Stats = () => {
  const { t } = useTranslation(["home"])
  const stats = [
    {
      number: t('data-sales-testimonials'),
      label: t('text-sales-testimonials'),
    },
    {
      number: t('data-travelers-testimonials'),
      label: t('text-travelers-testimonials'),
    },
    {
      number: t('data-experience-testimonials'),
      label: t('text-experience-testimonials'),
    },
  ];

  return (
    <section className="hidden lg:flex pt-4 pb-16 bg-red-800 text-white">
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