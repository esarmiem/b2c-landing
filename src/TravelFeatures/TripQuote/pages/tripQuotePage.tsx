import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb'
import DropdownFiltersProducts from '@/TravelCore/Components/Epic/DropdownFiltersProducts'
import { FilterForm } from '@/TravelCore/Components/Epic/FilterForm'
import ProductsRow from '@/TravelCore/Components/Epic/ProductsRow'
import useData from '@/TravelCore/Hooks/useData.ts'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const TripQuotePage: React.FC = () => {
  const { t } = useTranslation(['products'])
  const [viewType, setViewType] = useState<'list' | 'grid'>('grid')
  const { data } = useData() || {}

  return (
    <>
      <Breadcrumb />
      <FilterForm />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center">
          <h3 className="font-display tracking-tight font-bold text-slate-900 md:text-3xl">{t('label-trip-assistance')}</h3>
          <DropdownFiltersProducts setViewType={setViewType} />
        </div>
        <ProductsRow viewType={viewType} plans={data?.responseOrder?.planes} />
      </div>
    </>
  )
}

export default TripQuotePage
