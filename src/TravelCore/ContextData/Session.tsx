import {createContext, useEffect, useState, ReactElement, Dispatch, SetStateAction, ReactNode} from 'react';
import {getPersistedSession, saveSession} from './Persistence/session.ts'
import {AUTH_API} from '../Services/Apis/Authentication';

// Define the type for the state
type SessionState = Record<string, string>;

// Define the context type
interface SessionContextType {
    session: SessionState;
    setSession: Dispatch<SetStateAction<SessionState>>;
}

// Create the context with a default value of undefined
export const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Define the props for the provider component
interface SessionProviderProps {
    children: ReactNode | ReactNode[]
}

// Define the SessionProvider component
export function SessionProvider({children}: SessionProviderProps): ReactElement {
    const [session, setSession] = useState<SessionState>(getPersistedSession);

    const fetchSession = async () => {
        const loginData = {username: "cotizante", password: "12345"}
        const response = await AUTH_API.login(loginData);
        if (response && response.data && !response.error) {
            setSession(response.data.payload);
            window.localStorage.setItem('token', response.data.payload.accessToken);
        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            fetchSession();
        }
    }, []);

    useEffect(() => {
        saveSession(session);
    }, [session]);

    return (
        <SessionContext.Provider value={{session, setSession}}>
            {children}
        </SessionContext.Provider>
    );
}