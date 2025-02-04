import {useTranslation} from "react-i18next";


interface Certification {
  id: number;
  imageUrl: string;
  title: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    imageUrl: '../../../../Assets/certifications (1).webp',
    title: 'Certificación ISO 9001'
  },
  {
    id: 2,
    imageUrl: '../../../../Assets/certifications (2).webp',
    title: 'Certificación ISO 14001'
  },
  {
    id: 3,
    imageUrl: '../../../../Assets/certifications (3).webp',
    title: 'Certificación ISO 45001'
  },
  {
    id: 4,
    imageUrl: '../../../../Assets/certifications (4).webp',
    title: 'Certificación ISO 27001'
  }
];

export const Certifications = () => {
  const { t } = useTranslation(["home"])
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">
          {t('title-certifications')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          {certifications.map((cert) => (
            <img
              key={cert.id}
              src={cert.imageUrl}
              alt={cert.title}
              className=" w-[200px] h-[200px] object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;