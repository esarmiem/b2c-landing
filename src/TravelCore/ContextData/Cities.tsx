import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { getPersisted, savePersistense } from './Persistence/data.ts'

// Define the type for the state
type CityState = Record<string, any> | null;

// Define the context type
interface CityContextType {
    city: CityState;
    setCity: Dispatch<SetStateAction<CityState>>;
}

// Create the context with a default value of undefined
export const CityContext = createContext<CityContextType | undefined>(undefined);

// Define the props for the provider component
interface CityProviderProps {
    children: ReactNode | ReactNode[]
}

// Define the CityProvider component
export function CityProvider({ children }: CityProviderProps): React.JSX.Element {
    const [city, setCity] = useState<CityState>(getPersisted('tk-cities'));

    useEffect(() => {
        savePersistense(city, 'tk-cities');
    }, [city]);

    return (
        <CityContext.Provider value={
            {
                city,
                setCity
            }
        }>
            {children}
        </CityContext.Provider>
    );
}