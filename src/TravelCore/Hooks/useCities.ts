import { useContext } from 'react';
import {CityContext} from '../ContextData/Cities.tsx';

//TODO: Puedo recomendar usar un unico hook para todas las listas comunes o masters que usa la app (Att: Julian Rivera)

const useCities = () => useContext(CityContext);

export default useCities;