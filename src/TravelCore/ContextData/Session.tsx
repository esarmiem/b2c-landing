import {createContext, useEffect, useState, ReactElement, Dispatch, SetStateAction, ReactNode} from 'react';
import { getPersistedSession, saveSession } from './Persistence/session.ts'

// Define the type for the state
type SessionState = Record<string, string>;

// Define the context type
interface SessionContextType {
    session: SessionState;
    setSession: Dispatch<SetStateAction<SessionState>>;
    token?: string;
    token_isl?: string;
}

// Create the context with a default value of undefined
export const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Define the props for the provider component
interface SessionProviderProps {
    children: ReactNode | ReactNode[]
}

// Define the SessionProvider component
export function SessionProvider({ children }: SessionProviderProps): ReactElement {
    const [session, setSession] = useState<SessionState>(getPersistedSession);

    useEffect(() => {
        saveSession(session)
    }, [session]);

    return (
        <SessionContext.Provider value={{ session, setSession, token: session.token, token_isl: session.token_isl }}>
            {children}
        </SessionContext.Provider>
    );
}