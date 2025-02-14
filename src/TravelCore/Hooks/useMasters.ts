import { useContext } from 'react';
import {MasterContext} from '../ContextData/Masters.tsx';

const useMasters = () => useContext(MasterContext);

export default useMasters;