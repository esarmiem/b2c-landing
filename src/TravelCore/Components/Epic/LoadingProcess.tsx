import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";

import money from "../../../../Assets/money.gif"
import payment from "../../../../Assets/payment-app.gif"
import receipt from "../../../../Assets/receipt.gif"
import briefcase from "../../../../Assets/briefcase.gif" //maleta que no es roja

interface ModalLoadingProcessProps {
  isOpen: boolean,
  title: string,
  text: string
}

export const ModalLoadingProcess = ({ isOpen, title, text }: ModalLoadingProcessProps) => {
  const gifs = [money, payment, receipt, briefcase ]; //eliminar briefcase si se quita la maleta
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isOpen) {
      intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => 
          prevIndex < gifs.length - 1 ? prevIndex + 1 : 0
        );
      }, 2000); // Change GIF every 2 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription className="flex m-auto items-center gap-2 text-md md:text-xl font-medium text-gray-700">
            <Loader2 className="h-5 w-5 animate-spin text-red-600" />
            {title}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <img 
              src={gifs[currentGifIndex]} 
              alt="Loading animation" 
              className="w-20 h-20 object-cover"
            />
          </div>
          <h3 className="md:text-lg text-sm text-center text-gray-500">{text}</h3>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLoadingProcess;