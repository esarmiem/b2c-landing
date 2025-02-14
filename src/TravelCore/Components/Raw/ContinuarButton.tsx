import {Button} from "@/components/ui/button.tsx";
import {ChevronRight} from "lucide-react";

export function ContinuarButton({url}: {url: string}) {

  return (
    <a href={url} className="w-full rounded-full">
      <Button className="w-full p-7 rounded-full border-2 border-black bg-white text-black hover:bg-gray-100">
        <span className="flex text-lg font-semibold items-center">Continuar<ChevronRight className="w-4 h-4 ml-2" /></span>
      </Button>
    </a>
  )
}