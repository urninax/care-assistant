// import React, { createContext, useState, useEffect } from 'react';
// import { useColorScheme } from 'react-native';

// export const ThemeContext = createContext({
//   scheme: 'light',
//   toggleScheme: () => {}
// });

// export function ThemeProvider({ children }) {
//     const systemScheme = useColorScheme() || 'light';

//   useEffect(() => {
//     const sub = Appearance.addChangeListener(({ colorScheme }) => {
//       setScheme(colorScheme);
//       console.log("Theme changed to", colorScheme)
//     });
//     return () => sub.remove();
//   }, []);

//   const toggleScheme = () => {
//     setScheme(prev => (prev === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ scheme, toggleScheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'APP_THEME_PREFERENCE';

export const ThemeContext = createContext({
  scheme: 'light',
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

  const contextValue = useMemo(
    () => ({
      scheme,
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
