import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoadingFormScreen } from './LoadingFormScreen';
import { useTranslation } from "react-i18next";
import { Search } from 'lucide-react';
import useData from "@/TravelCore/Hooks/useData.ts";
import { dataOrder } from "@/TravelCore/Utils/interfaces/Order.ts";

interface TravelButtonFormProps {
  getOrder: ({ orderPayload }: { orderPayload: dataOrder }) => void;
}

export const TravelButtonForm = ({ getOrder }: TravelButtonFormProps) => {
  const { t } = useTranslation(["home"]);
  const { data } = useData() || {};
  const [isLoading, setIsLoading] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setIsLoading(true);

    if (data) {
      getOrder({ orderPayload: data });
    }
  };

  const handleContinue = () => {
    setTimeout(() => {
      setShouldNavigate(true); // Indicar que se debe navegar
    }, 2000);
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/quote/travel'); // Navegar a la siguiente pantalla
    }
  }, [shouldNavigate, navigate]);

  if (isLoading) {
    return <LoadingFormScreen onContinue={handleContinue} />;
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