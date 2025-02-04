import { FC } from 'react';
import { Earth, Calendar, Users, Pencil, PlaneTakeoff, ArrowRight } from "lucide-react";

export const FilterForm: FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg flex flex-col md:flex-row items-end justify-between p-4 gap-4 flex-wrap  ">
        {/* Origen */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Earth className="w-10 h-10" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">Origen</div>
            <div className="text-sm mt-0">Colombia</div>
          </div>
          <div className="text-black">
            <PlaneTakeoff className="w-5 h-5" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">Destino</div>
            <div className="text-sm mt-0">Destino</div>
          </div>
        </div>

        {/* Desde */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Calendar className="w-10 h-10" />
          </div>
          <div className="leading-4">
            <div className="text-base font-bold text-red-700">Desde</div>
            <div className="text-sm mt-0">30/01/2025</div>
          </div>
          <div className="text-black">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">Hasta</div>
            <div className="text-sm mt-0">06/02/2025</div>
          </div>
        </div>

        {/* Pasajeros */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Users className="w-10 h-10" />
          </div>
          <div className="leading-4">
            <div className="text-base font-bold text-red-700">Pasajeros</div>
            <div className="text-sm mt-0">2 Pasajeros</div>
          </div>
        </div>

        {/* Botón Modificar */}
        <button
          className="px-4 py-2 text-red-700 hover:bg-red-50 rounded-md transition-colors border border-red-200
          hover:cursor-pointer active:text-red-900 active:border-red-900 flex items-center gap-2 w-full sm:w-auto"
        >
          <Pencil className="w-4 h-4" />
          Modificar
        </button>
      </div>
    </div>
  );
};