import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Adjust import path as needed
import { LoadingScreen } from './LoadingScreen'; // Your loading screen component

export const TravelButtonForm: React.FC = () => {
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
    return <LoadingScreen />;
  }

  return (
      <Button 
        className="bg-red-600 hover:bg-red-700 rounded-full"
        onClick={handleSearch}
      >
        Buscar
      </Button>
  );
};