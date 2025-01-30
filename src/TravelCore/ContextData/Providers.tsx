import {ReactNode} from 'react';
import {MasterProvider} from './Masters.tsx';
import {SessionProvider} from './Session.tsx';

interface ProviderProps {
  children: ReactNode;
}

const providers = [
  MasterProvider,
  SessionProvider,
]

export const Providers = ({children}: ProviderProps) => {
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