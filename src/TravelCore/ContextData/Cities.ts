/*
import { createContext, useState, useEffect } from 'react';
import { getPersisted, savePersistense } from '../ContextData/Persistence/index.ts'

export const CityContext = createContext()

export const CityProvider = (children: any) => {
    const [city, setCity] = useState(getPersisted)

    useEffect(() => {
        savePersistense(city)
    }, [city])

    return (
        <CityContext.Provider value={{city, setCity}}>
            {children}
        </CityContext.Provider>
    )
}*/
