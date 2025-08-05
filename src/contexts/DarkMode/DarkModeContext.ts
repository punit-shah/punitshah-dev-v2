import { createContext } from 'react';

export type DarkModeState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeState>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});
