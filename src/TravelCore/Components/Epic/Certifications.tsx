// import hero from '../../../../Assets/hero.webp';

interface Certification {
  id: number;
  imageUrl: string;
  title: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    imageUrl: '/certificaciones/iso9001.jpg',
    title: 'Certificación ISO 9001'
  },
  {
    id: 2,
    imageUrl: '/certificaciones/iso14001.jpg',
    title: 'Certificación ISO 14001'
  },
  {
    id: 3,
    imageUrl: '/certificaciones/iso45001.jpg',
    title: 'Certificación ISO 45001'
  },
  {
    id: 4,
    imageUrl: '/certificaciones/iso27001.jpg',
    title: 'Certificación ISO 27001'
  }
];

export const Certifications = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">
          Nuestro respaldo y certificaciones
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {certifications.map((cert) => (
            <img
              key={cert.id}
              src={cert.imageUrl}
              alt={cert.title}
              className="grayscale hover:grayscale-0 transition-all w-[150px] h-[80px] object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;