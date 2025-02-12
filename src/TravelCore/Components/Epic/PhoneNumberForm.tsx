import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Input} from "@/components/ui/input.tsx";

export function PhoneNumberForm({celType}: {celType: string}) {

  return (
    <div>
      <label className="block font-semibold text-gray-500 text-sm mb-1">{celType}</label>
      <div className="flex border border-gray-300 rounded-3xl">
        <Select defaultValue="co" >
          <SelectTrigger className="w-[80px] p-6 border-none focus:outline-none focus:ring-0">
            <SelectValue placeholder="🇨🇴" />
          </SelectTrigger>
          <SelectContent className="w-[80px] max-w-[80px] !important">
            <SelectItem className="w-[80px]" value="co">🇨🇴</SelectItem>
            <SelectItem className="w-[80px]" value="pe">🇵🇪</SelectItem>
            <SelectItem className="w-[80px]" value="ec">🇪🇨</SelectItem>
          </SelectContent>
        </Select>
        <Input className="flex-1 ml-2 p-6 border-none focus:outline-none focus:ring-0 focus:" placeholder="Número de teléfono" />
      </div>
    </div>
  )
}