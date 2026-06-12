import { createContext } from 'react';

export type ActiveSectionState = {
  activeSection: string | null;
};

export const ActiveSectionContext = createContext<ActiveSectionState>({
  activeSection: null,
});
