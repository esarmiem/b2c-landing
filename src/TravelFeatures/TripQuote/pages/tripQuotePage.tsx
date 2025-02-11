import { FilterForm } from '@/TravelCore/Components/Epic/FilterForm'
import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb'
import ProductsRow from '@/TravelCore/Components/Epic/ProductsRow'
import DropdownFiltersProducts from '@/TravelCore/Components/Epic/DropdownFiltersProducts';

const TripQuotePage: React.FC = () => {

    return (
        <>
            <Breadcrumb />
            <FilterForm />
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex justify-between items-center">
                    <h3 className='font-display tracking-tight font-bold text-slate-900 md:text-3xl'>
                        Asistencia para tu viaje
                    </h3>
                    <DropdownFiltersProducts />
                </div>
            </div>
            <ProductsRow />
        </>
    );
};

export default TripQuotePage;
