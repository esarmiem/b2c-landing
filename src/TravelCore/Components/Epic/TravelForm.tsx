import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFormContent } from "./searchFormContent";
import {useTranslation} from "react-i18next";

export function TravelForm() {
  const { t } = useTranslation(["home"])

  return (
    <div className="container mx-auto px-4 -mt-12 relative z-10">
      <Tabs
        defaultValue="tab1"
        className="bg-red-700 rounded-lg md:rounded-full shadow-lg p-8"
      >
        <TabsList className="grid w-1/2 gap-10 grid-rows-2 md:grid-cols-2 mb-12 md:mb-0 -mt-12 rounded-sm bg-red-700">
          <TabsTrigger
            className="rounded-sm text-white text-xs data-[state=active]:py-2 data-[state=inactive]:pt-6"
            value="tab1"
          >
            {t('label-tab-travel-assist')}
          </TabsTrigger>
          <TabsTrigger
            className="rounded-sm text-white text-xs data-[state=active]:py-2 data-[state=inactive]:pt-6"
            value="tab2"
            //disabled
          >
            {t('label-tab-comms')}
            {/* agregar atributo disabled a tab2 para desactivar elder*/}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <SearchFormContent />
        </TabsContent>
        <TabsContent value="tab2">
          <div className="text-center text-white">
            {t('content-tab-comms')}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
