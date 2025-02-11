import { FC , useState} from 'react';
import { Earth, Calendar, Users, Pencil, PlaneTakeoff, ArrowRight } from "lucide-react";

export const FilterForm: FC = () => {

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className={`bg-white rounded-lg flex flex-col md:flex-row items-end justify-between p-4 gap-4 flex-wrap transition-all border-2 ${
        isEditing ? "border-red-500" : "border-white"}`}>
        {/* Origen */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Earth className="w-10 h-10" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">Origen</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>Colombia</div>
          </div>
          <div className="text-black">
            <PlaneTakeoff className="w-5 h-5" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">Destino</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>Destino</div>
          </div>
        </div>

        {/* Desde */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Calendar className="w-10 h-10" />
          </div>
          <div className="leading-4">
            <div className="text-base font-bold text-red-700">Desde</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>30/01/2025</div>
          </div>
          <div className="text-black">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">Hasta</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>06/02/2025</div>
          </div>
        </div>

        {/* Pasajeros */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Users className="w-10 h-10" />
          </div>
          <div className="leading-4">
            <div className="text-base font-bold text-red-700">Pasajeros</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>2 Pasajeros</div>
          </div>
        </div>

        {/* Botón Modificar */}
        <button
          onClick={toggleEditing}
          className={`px-4 py-2 ${isEditing ? 'text-white bg-red-800' : 'text-red-700 bg-white hover:bg-red-50' } rounded-md transition-colors border border-red-200
          hover:cursor-pointer active:text-red-900 active:border-red-900 flex items-center gap-2 w-full sm:w-auto`}>
          <Pencil className="w-4 h-4" />
          {`${isEditing ? 'Guardar': 'Modificar'}`}
        </button>
      </div>
    </div>
  );
};