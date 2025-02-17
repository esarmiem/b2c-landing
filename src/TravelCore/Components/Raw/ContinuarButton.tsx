import { Button } from "@/components/ui/button.tsx";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next"; 

export function ContinuarButton({ url }: { url: string }) {
  const { t } = useTranslation(["traveler"]); 

  return (
    <a href={url} className="w-full rounded-full">
      <Button className="w-full p-7 rounded-full border-2 border-black bg-white text-black hover:bg-gray-100">
        <span className="flex text-lg font-semibold items-center">
          {t("button-continue")}
          <ChevronRight className="w-4 h-4 ml-2" />
        </span>
      </Button>
    </a>
  );
}