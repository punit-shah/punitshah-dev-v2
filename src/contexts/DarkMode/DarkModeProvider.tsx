import { useEffect, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { DarkModeContext } from './DarkModeContext';

type DarkModeProviderProps = { children: React.ReactNode };

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
