import { createContext } from 'react';

export type SoundState = {
  isSoundEnabled: boolean;
  toggleSound: () => void;
};

export const SoundContext = createContext<SoundState>({
  isSoundEnabled: true,
  toggleSound: () => {},
});
