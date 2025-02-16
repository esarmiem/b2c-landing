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
      className="relative overflow-hidden border border-red-600 bg-red-600 text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-600 hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black rounded-full lg:w-full h-auto px-4 py-2 flex items-center justify-center gap-2"
      onClick={handleSearch}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Search className="w-5 h-5" /> {/* Ajusta el tamaño del ícono si es necesario */}
        {t('label-button-search')}
      </span>
    </Button>
  );
};