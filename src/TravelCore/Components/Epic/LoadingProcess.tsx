import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";
import useData from "@/TravelCore/Hooks/useData.ts";

interface ModalLoadingProcessProps {
  isOpen: boolean,
  title: string,
  text: string
}

export const ModalLoadingProcess = ({ isOpen, title, text }: ModalLoadingProcessProps) => {
  const {setData} = useData() || {};

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
            <h3 className="md:text-lg text-sm text-center text-gray-500">{text}</h3>
          </div>
        </DialogContent>
      </Dialog>
  );
};