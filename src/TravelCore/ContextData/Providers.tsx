import {ReactNode} from 'react';
import {MasterProvider} from './Masters.tsx';
import {SessionProvider} from './Session.tsx';
import {DataProvider} from "@/TravelCore/ContextData/Data.tsx";
import {OrderProvider} from "@/TravelCore/ContextData/Order.tsx";
import {UserPreferencesProvider} from "@/TravelCore/ContextData/UserPreferences.tsx";

interface ProviderProps {
  children: ReactNode;
}

const providers = [
  MasterProvider,
  SessionProvider,
  DataProvider,
  OrderProvider,
  UserPreferencesProvider
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