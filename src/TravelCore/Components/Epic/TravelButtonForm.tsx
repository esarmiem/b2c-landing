import { MouseEvent } from 'react';
import { Button } from '@/components/ui/button'; // Adjust import path as needed
import {useTranslation} from "react-i18next"; // Your loading screen component
import { Search } from 'lucide-react';

interface TravelButtonFormProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const TravelButtonForm = ({onClick}: TravelButtonFormProps) => {
  const { t } = useTranslation(["home"])

  return (
      <Button 
        className="bg-red-600 hover:bg-black rounded-full lg:w-full h-auto"
        onClick={onClick}
      >
        <Search />
        {t('label-button-search')}
      </Button>
  );
};