import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { getPersisted, savePersistense } from './Persistence/data';
import {ApiResponse, GenericItem} from "@/TravelCore/Utils/interfaces/context.ts";

const STORAGE_KEY = 'user-preferences';

type Preferences<T = GenericItem> = ApiResponse<T> | null;

type UserPreferencesContextType = {
  preferences: Preferences;
  setPreferences: Dispatch<SetStateAction<Preferences>>;
};

export const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

interface UserPreferencesProviderProps {
  children: ReactNode | ReactNode[];
}

export function UserPreferencesProvider({ children }: UserPreferencesProviderProps): JSX.Element {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const cachedPreferences = getPersisted(STORAGE_KEY);
    return cachedPreferences;
  });

  useEffect(() => {
    if (preferences) {
      savePersistense(preferences, STORAGE_KEY);
    }
  }, [preferences]);

  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}