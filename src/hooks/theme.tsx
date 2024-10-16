/* eslint-disable @typescript-eslint/no-redeclare */
import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

import { ThemeProvider as Theme } from 'styled-components';

import light from '../themes/light';
import dark from '../themes/dark';

interface ThemeContext {
  changeTheme?(): void;
  theme: string;
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const changeTheme = useCallback(() => {
    setTheme((previousState) => (previousState === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        theme,
      }}
    >
      <Theme theme={theme === 'dark' ? dark : light}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

function useThemeContext(): ThemeContext {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext should be used with an ThemeProvider');
  }
  return context;
}

export { useThemeContext, ThemeProvider };
