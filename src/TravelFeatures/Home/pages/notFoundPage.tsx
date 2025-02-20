import React from 'react';
import { useTranslation } from 'react-i18next';
import maleta from '../../../../Assets/maleta.webp';
import {Link} from '../../../TravelCore/Components/Raw/Link';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation(["header"]);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-red-300">404</p>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-red-300 mt-2">
          {t('label-page-not-found')}
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12 mx-4 md:mx-0">
          {t('label-page-not-found-description')}
        </p>
        <a
          href="/"
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-gray-100 px-4 py-2 rounded-full transition duration-150"
          title={t('label-return-home')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{t('label-return-home')}</span>
        </a>
      </div>
      <div className="w-1/2 flex lg:items-end justify-center p-4">
        <img src={maleta} alt="Maleta" className="w-full lg:w-1/2" />
      </div>
      <div className="flex lg:hidden items-center text-center">
          <Link
            href="/"
            className="font-extrabold text-2xl md:text-3xl text-red-600 hover:text-red-600"
          >
            TRAVELKIT
          </Link>
        </div>
    </div>
  );
};

export default NotFoundPage;