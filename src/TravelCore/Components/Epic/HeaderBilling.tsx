import { Users } from "lucide-react";
import { useTranslation } from "react-i18next"; 

export function HeaderBilling() {
  const { t } = useTranslation(["invoice"]); 

  return (
    <header className="my-3">
      <div className="flex items-center gap-1 justify-start">
        <Users className="w-4 h-4 text-gray-800 mx-4" />
        <h1 className="text-2xl sm:text-3xl font-stretch-75 font-medium">
          {t("billing-header-title")} 
        </h1>
      </div>
    </header>
  );
}