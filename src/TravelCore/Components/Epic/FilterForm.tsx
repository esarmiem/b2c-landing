import { FC, useState } from 'react';
import { Earth, Calendar, Users, Pencil, PlaneTakeoff, ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next'; 

export const FilterForm: FC = () => {
  const { t } = useTranslation(["products"]); 
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className={`bg-white rounded-lg flex flex-col md:flex-row items-end justify-between py-2 px-2 gap-4 flex-wrap transition-all border-2 ${
        isEditing ? "border-red-500" : "border-white"}`}>
        {/* Origen */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Earth className="w-10 h-10" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t("label-origin")}</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>
              {t("label-default-origin")}
            </div>
          </div>
          <div className="text-black">
            <PlaneTakeoff className="w-5 h-5" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t("label-destination")}</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>
              {t("label-default-destination")}
            </div>
          </div>
        </div>

        {/* Desde */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Calendar className="w-10 h-10" />
          </div>
          <div className="leading-4">
            <div className="text-base font-bold text-red-700">{t("label-from")}</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>
              {t("label-default-from-date")}
            </div>
          </div>
          <div className="text-black">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t("label-to")}</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>
              {t("label-default-to-date")}
            </div>
          </div>
        </div>

        {/* Pasajeros */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Users className="w-10 h-10" />
          </div>
          <div className="leading-4">
            <div className="text-base font-bold text-red-700">{t("label-passengers")}</div>
            <div className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer': ''}`}>
              {t("label-default-passengers")}
            </div>
          </div>
        </div>

        {/* Botón Modificar */}
        <button
          onClick={toggleEditing}
          className={`px-4 py-2 ${isEditing ? 'text-white bg-red-800' : 'text-red-700 bg-white hover:bg-red-50' } rounded-md transition-colors border border-red-200
          hover:cursor-pointer active:text-red-900 active:border-red-900 flex items-center gap-2 w-full sm:w-auto`}>
          <Pencil className="w-4 h-4" />
          {t(isEditing ? "button-save" : "button-edit")}
        </button>
      </div>
    </div>
  );
};