import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFormContent } from "./searchFormContent";
import {useTranslation} from "react-i18next";

export function TravelForm() {
  const { t } = useTranslation(["home"])

  return (
    <div className="container mx-auto px-4 relative z-10">
      <Tabs
        defaultValue="tab1"
        className=""//bg-red-700 rounded-lg md:rounded-full shadow-lg p-8
      >
        <TabsList className="grid w-[500px] h-[50px] gap-2 grid-rows-2 md:grid-cols-2 mb-12 lg:ml-6 md:mb-0 -mt-16 rounded-md bg-red-700">
          <TabsTrigger
            className="text-white data-[state=active]:bg-white data-[state=active]:mt-3 data-[state=inactive]:pt-4"
            //rounded-sm text-white text-xs data-[state=active]:py-2 data-[state=inactive]:pt-4 h-6 data-[state=inactive]:mt-2
            value="tab1"
          >
            {t('label-tab-travel-assist')}
          </TabsTrigger>
          <TabsTrigger
            className="text-white data-[state=active]:bg-white data-[state=active]:mt-3 data-[state=inactive]:pt-4"
            //rounded-sm text-white text-xs data-[state=active]:py-2 data-[state=inactive]:pt-4 h-6 data-[state=inactive]:mt-2
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
          <div className="text-center text-white bg-red-700 rounded-lg md:rounded-full shadow-lg p-4 -mt-7">
            {t('content-tab-comms')}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
