import { useEffect, useState, type ReactNode } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { DarkModeContext } from './DarkModeContext';

type DarkModeProviderProps = { children: ReactNode };

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useMediaQuery('(prefers-color-scheme: dark)', (isSystemDarkMode) => {
    setIsDarkMode(isSystemDarkMode);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.dataset.darkMode = '';
    } else {
      delete document.documentElement.dataset.darkMode;
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
