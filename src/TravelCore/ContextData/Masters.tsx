import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { getPersisted, savePersistense } from './Persistence/data.ts'

// Define the type for the state
type CityState = Record<string, any> | null;
type ArrivalsState = Record<string, any> | null;
type CountriesState = Record<string, any> | null;
type DocumentsState = Record<string, any> | null;
type MedicalsState = Record<string, any> | null;
type OrderState = Record<string, any> | null;
type ParametersState = Record<string, any> | null;
type ProductsState = Record<string, any> | null;
type QuestionsState = Record<string, any> | null;

// Define the context type
interface MasterContextType {
    city: CityState;
    setCity: Dispatch<SetStateAction<CityState>>;
    arrivals: ArrivalsState;
    setArrivals: Dispatch<SetStateAction<ArrivalsState>>;
    countries: CountriesState;
    setCountries: Dispatch<SetStateAction<CountriesState>>;
    documents: DocumentsState;
    setDocuments: Dispatch<SetStateAction<DocumentsState>>;
    medicals: MedicalsState;
    setMedicals: Dispatch<SetStateAction<MedicalsState>>;
    order: OrderState;
    setOrder: Dispatch<SetStateAction<OrderState>>;
    parameters: ParametersState;
    setParameters: Dispatch<SetStateAction<ParametersState>>;
    products: ProductsState;
    setProducts: Dispatch<SetStateAction<ProductsState>>;
    questions: QuestionsState;
    setQuestions: Dispatch<SetStateAction<QuestionsState>>;
}

// Create the context with a default value of undefined
export const MasterContext = createContext<MasterContextType | undefined>(undefined);

// Define the props for the provider component
interface MasterProviderProps {
    children: ReactNode | ReactNode[];
}

// Define the CityProvider component
export function MasterProvider({ children }: MasterProviderProps): JSX.Element {
    const [city, setCity] = useState<CityState>(getPersisted('tk-cities'));
    const [arrivals, setArrivals] = useState<ArrivalsState>(getPersisted('tk-arrivals'));
    const [countries, setCountries] = useState<CountriesState>(getPersisted('tk-countries'));
    const [documents, setDocuments] = useState<DocumentsState>(getPersisted('tk-documents'));
    const [medicals, setMedicals] = useState<MedicalsState>(getPersisted('tk-medicals'));
    const [order, setOrder] = useState<OrderState>(getPersisted('tk-order'));
    const [parameters, setParameters] = useState<ParametersState>(getPersisted('tk-parameters'));
    const [products, setProducts] = useState<ProductsState>(getPersisted('tk-products'));
    const [questions, setQuestions] = useState<QuestionsState>(getPersisted('tk-questions'));

    useEffect(() => {
        savePersistense(city, 'tk-cities');
    }, [city]);

    useEffect(() => {
        savePersistense(arrivals, 'tk-arrivals');
    }, [arrivals]);

    useEffect(() => {
        savePersistense(countries, 'tk-countries');
    }, [countries]);

    useEffect(() => {
        savePersistense(documents, 'tk-documents');
    }, [documents]);

    useEffect(() => {
        savePersistense(medicals, 'tk-medicals');
    }, [medicals]);
    //Analizar si es necesario guardar en persistencia, ya que son datos que se cargan una sola vez
    useEffect(() => {
        savePersistense(order, 'tk-order');
    }, [order]);

    useEffect(() => {
        savePersistense(parameters, 'tk-parameters');
    }, [parameters]);

    useEffect(() => {
        savePersistense(products, 'tk-products');
    }, [products]);

    useEffect(() => {
        savePersistense(questions, 'tk-questions');
    }, [questions]);

    return (
        <MasterContext.Provider value={{
            city, setCity,
            arrivals, setArrivals,
            countries, setCountries,
            documents, setDocuments,
            medicals, setMedicals,
            order, setOrder,
            parameters, setParameters,
            products, setProducts,
            questions, setQuestions
        }}>
            {children}
        </MasterContext.Provider>
    );
}