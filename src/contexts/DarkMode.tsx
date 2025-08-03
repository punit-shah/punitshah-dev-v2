import { createContext, useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

export type DarkModeState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeState | undefined>(
  undefined,
) as React.Context<DarkModeState>;

type DarkModeProviderProps = { children: React.ReactNode };
export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useMediaQuery('(prefers-color-scheme: dark)', (isSystemDarkMode) => {
    setIsDarkMode(isSystemDarkMode);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext
      value={{
        isDarkMode,
        toggleDarkMode: () => {
          setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
        },
      }}
    >
      {children}
    </DarkModeContext>
  );
};
