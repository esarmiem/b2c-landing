import React, {ReactNode} from 'react';
import {MasterProvider} from './Masters.tsx';
import {SessionProvider} from './Session.tsx';

interface ProviderProps {
  children: ReactNode;
}

const providers = [
  MasterProvider,
  SessionProvider,
]

export const Providers: React.FC<ProviderProps> = ({children}) => {
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