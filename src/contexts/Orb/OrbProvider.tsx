import { useState } from 'react';
import { OrbContext } from './OrbContext';
import { smile } from './faces';

type OrbProviderProps = { children: React.ReactNode };

export const OrbProvider = ({ children }: OrbProviderProps) => {
  const [face, setFace] = useState(smile);

  return <OrbContext value={{ face, setFace }}>{children}</OrbContext>;
};
