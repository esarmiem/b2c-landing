import {Users} from "lucide-react";

export function HeaderBilling() {

  return (
    <header className="my-3">
      <div className="flex items-center gap-1 justify-start">
        <Users className="w-4 h-4 text-gray-800 mx-4"/>
        <h1 className="text-2xl sm:text-3xl font-stretch-75 font-medium">Datos de facturación</h1>
      </div>
    </header>
  )
}