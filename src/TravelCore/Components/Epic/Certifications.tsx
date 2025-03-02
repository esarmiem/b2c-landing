import {useTranslation} from "react-i18next";
import certification1 from '../../../../Assets/certifications (1).webp';
import certification2 from '../../../../Assets/certifications (4).webp';
import certification3 from '../../../../Assets/certifications (2).webp';
import certification4 from '../../../../Assets/certifications (3).webp';


interface Certification {
  id: number;
  imageUrl: string;
  title: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    imageUrl: certification1, 
    title: 'Certificación ISO 9001',
  },
  {
    id: 2,
    imageUrl: certification2, 
    title: 'Certificación ISO 14001',
  },
  {
    id: 3,
    imageUrl: certification3, 
    title: 'Certificación ISO 45001',
  },
  {
    id: 4,
    imageUrl: certification4, 
    title: 'Certificación ISO 27001',
  },
];

export const Certifications = () => {
  const { t } = useTranslation(["home"])
  return (
    <section className="py-16 bg-gray-100 border-t-2 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('title-certifications')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          {certifications.map((cert) => (
            <img
              key={cert.id}
              src={cert.imageUrl}
              alt={cert.title}
              className=" w-[200px] h-[200px] lg:w-[270px] lg:h-[270px] object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;