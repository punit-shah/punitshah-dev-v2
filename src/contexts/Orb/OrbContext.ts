import { createContext } from 'react';
import { smile } from './faces';

export type OrbState = {
  face: string;
  setFace: (face: string) => void;
};

export const OrbContext = createContext<OrbState>({
  face: smile,
  setFace: () => {},
});
