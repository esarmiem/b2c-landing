import React, { useState } from 'react';
import { FilterForm } from '@/TravelCore/Components/Epic/FilterForm';
import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb';
import ProductsRow from '@/TravelCore/Components/Epic/ProductsRow';
import DropdownFiltersProducts from '@/TravelCore/Components/Epic/DropdownFiltersProducts';
import useData from "@/TravelCore/Hooks/useData.ts";
import { useTranslation } from 'react-i18next'; // Importar useTranslation

const TripQuotePage: React.FC = () => {
  const { t } = useTranslation(["products"]); // Obtener la función de traducción
  const [viewType, setViewType] = useState<'list' | 'grid'>("grid");
  const {data} = useData() || {}

  return (
    <>
      <Breadcrumb />
      <FilterForm />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center">
          <h3 className='font-display tracking-tight font-bold text-slate-900 md:text-3xl'>
            {t("label-trip-assistance")} 
          </h3>
          <DropdownFiltersProducts setViewType={setViewType} />
        </div>
        <ProductsRow viewType={viewType} plans={data?.responseOrder?.planes}/>
        
      </div>
    </>
  );            
};

export default TripQuotePage;