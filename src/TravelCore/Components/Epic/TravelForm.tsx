import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFormContent } from "./searchFormContent";
import {useTranslation} from "react-i18next";
import { Luggage } from 'lucide-react';
import {MouseEvent} from "react";

interface TravelFormProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function TravelForm({ onClick }: TravelFormProps) {
  const { t } = useTranslation(["home"])

  return (
    <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <Tabs
        defaultValue="tab1"
        className=""//bg-red-700 rounded-lg md:rounded-full shadow-lg p-8
      >
        <TabsList className="grid md:w-[500px] md:h-[50px] gap-2 grid-cols-2 md:grid-cols-2 pt-0 lg:ml-6 mb-3 md:mb-0 md:-mt-20 -mt-10 rounded-lg bg-red-700">
          <TabsTrigger
            className="text-gray-400 text-xs md:text-sm data-[state=active]:text-white data-[state=active]:bg-red-700 md:data-[state=active]:-mt-2 data-[state=inactive]:pt-0"
            //rounded-sm text-white text-xs data-[state=active]:py-2 data-[state=inactive]:pt-4 h-6 data-[state=inactive]:mt-2
            value="tab1"
          >
            <Luggage className="mr-2 h-4 w-4 hidden md:block" />
            {t('label-tab-travel-assist')}
          </TabsTrigger>
          <TabsTrigger
            className="text-gray-400 text-xs md:text-sm data-[state=active]:text-white data-[state=active]:bg-red-700 md:data-[state=active]:-mt-2 data-[state=inactive]:pt-0"
            //rounded-sm text-white text-xs data-[state=active]:py-2 data-[state=inactive]:pt-4 h-6 data-[state=inactive]:mt-2
            value="tab2"
            //disabled
          >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-card-sd mr-2 h-4 w-4 text-xs md:text-sm hidden md:block"
              >
                <path d="M6 22a2 2 0 0 1-2-2V6l4-4h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2Z" />
                <path d="M8 10V7.5" />
                <path d="M12 6v4" />
                <path d="M16 6v4" />
              </svg>
            {t('label-tab-comms')}
            {/* agregar atributo disabled a tab2 para desactivar elder*/}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <SearchFormContent onClick={onClick} />
        </TabsContent>
        <TabsContent value="tab2">
          <div className="text-center text-white bg-red-700 rounded-lg md:rounded-full shadow-lg p-4 -mt-7">
            {t('content-tab-comms')}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
