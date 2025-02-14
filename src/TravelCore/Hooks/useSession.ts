import { useContext } from 'react';
import {SessionContext} from '../ContextData/Session.tsx';

const useSession = () => useContext(SessionContext);

export default useSession;