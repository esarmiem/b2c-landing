import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Adjust import path as needed
import { LoadingScreen } from './LoadingScreen';
import {useTranslation} from "react-i18next"; // Your loading screen component
import { Search } from 'lucide-react';

export const TravelButtonForm: React.FC = () => {
  const { t } = useTranslation(["home"])
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate('/quote/travel');
    }, 4000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  };

  if (isLoading) {
    return <LoadingScreen message={t("label-title-loader")} subMessage={t("label-text-loader")}/>;
  }

  return (
      <Button 
        className="bg-red-600 hover:bg-black rounded-full lg:w-full"
        onClick={handleSearch}
      >
        <Search />
        {t('label-button-search')}
      </Button>
  );
};