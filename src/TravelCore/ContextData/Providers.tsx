import React, { ReactNode} from 'react';
import { CityProvider } from './Cities.tsx';
import { SessionProvider } from './Session.tsx';

interface ProviderProps {
    children: ReactNode;
}

const providers = [
    CityProvider,
    SessionProvider,
]

export const Providers: React.FC<ProviderProps> = ({ children }) => {
    return (
        <>
            {providers.reduce(
                (AccumulatedProviders, CurrentProvider) => (
                    <CurrentProvider>{AccumulatedProviders}</CurrentProvider>
                ),
                children
            )}
        </>
    );
};