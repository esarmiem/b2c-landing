import { Button } from "@/components/ui/button.tsx";
import { Receipt } from "lucide-react";
import { useTranslation } from "react-i18next"; 

export function ProcessButton({ url }: { url: string }) {
  const { t } = useTranslation(["invoice"]); 

  return (
    <a href={url} className="w-full rounded-full">
      <Button className="w-full p-7 rounded-full bg-red-700 text-white hover:bg-black hover:text-white">
        <span className="flex text-lg font-semibold items-center gap-2">
          <Receipt className="w-4 h-4 ml-2" />
          {t("button-proceed-to-payment")} 
        </span>
      </Button>
    </a>
  );
}