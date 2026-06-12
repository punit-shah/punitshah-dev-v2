import type { ReactNode, RefObject } from 'react';
import useScrollSpy from '../../hooks/useScrollSpy';
import { ActiveSectionContext } from './ActiveSectionContext';

type ActiveSectionProviderProps = {
  sections: RefObject<HTMLElement | null>[];
  children: ReactNode;
};

export const ActiveSectionProvider = ({
  sections,
  children,
}: ActiveSectionProviderProps) => {
  const activeSection = useScrollSpy(sections);

  return (
    <ActiveSectionContext.Provider value={{ activeSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};
