import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Adjust import path as needed
import { LoadingScreen } from './LoadingScreen';
import {useTranslation} from "react-i18next"; // Your loading screen component
import { Search } from 'lucide-react';
import useData from "@/TravelCore/Hooks/useData.ts";
import {dataOrder} from "@/TravelCore/Utils/interfaces/Order.ts";

interface TravelButtonFormProps {
  getOrder: ({ orderPayload }: { orderPayload: dataOrder }) => void;
}

export const TravelButtonForm = ({getOrder}: TravelButtonFormProps) => {
  const { t } = useTranslation(["home"])
  const { data } = useData() || {};
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (data) {
        getOrder({ orderPayload: data });
      }
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
        className="bg-red-600 hover:bg-black rounded-full lg:w-full h-auto"
        onClick={handleSearch}
      >
        <Search />
        {t('label-button-search')}
      </Button>
  );
};