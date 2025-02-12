import {Button} from "@/components/ui/button.tsx";
import {Receipt} from "lucide-react";

export function ProcessButton({url}: {url: string}) {

  return(
    <a href={url} className="w-full rounded-full">
      <Button className="w-full p-7 rounded-full bg-red-700 text-white hover:bg-black hover:text-white">
        <span className="flex text-lg font-semibold items-center gap-2"><Receipt className="w-4 h-4 ml-2" />Proceder al pago</span>
      </Button>
    </a>
  )
}