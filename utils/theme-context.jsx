import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './theme';

const STORAGE_KEY = 'APP_THEME_PREFERENCE';

export const ThemeContext = createContext({
  scheme: 'light',
  theme: lightTheme,
  setScheme: () => {},
});

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme() || 'light';
  const [preference, setPreference] = useState('system');
  const scheme = preference === 'system' ? systemScheme : preference;

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value === 'system' || value === 'light' || value === 'dark') {
          setPreference(value);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (preference === 'system') {
      AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    } else {
      AsyncStorage.setItem(STORAGE_KEY, preference).catch(() => {});
    }
  }, [preference]);

  const theme = useMemo(
    () => (scheme == 'dark' ? darkTheme : lightTheme),
    [scheme]
  );

  const contextValue = useMemo(
    () => ({
      scheme,
      theme,
      setScheme: setPreference,
    }),
    [scheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
