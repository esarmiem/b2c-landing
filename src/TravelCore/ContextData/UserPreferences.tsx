import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { getPersisted, savePersistense } from './Persistence/data';

const STORAGE_KEY = 'user-preferences';

type Preferences = {
  settings: Record<string, any>;
};

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
    return cachedPreferences || { settings: {} };
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