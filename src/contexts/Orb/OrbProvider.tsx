import { useState, type ReactNode } from 'react';
import { OrbContext } from './OrbContext';
import { smile } from './faces';

type OrbProviderProps = { children: ReactNode };

export const OrbProvider = ({ children }: OrbProviderProps) => {
  const [face, setFace] = useState(smile);

  return <OrbContext value={{ face, setFace }}>{children}</OrbContext>;
};
