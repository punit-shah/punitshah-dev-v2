import type { ReactNode, RefObject } from 'react';
import { ActiveSectionProvider } from './ActiveSection/ActiveSectionProvider';
import { DarkModeProvider } from './DarkMode/DarkModeProvider';
import { MotionConfig } from './Motion';
import { OrbProvider } from './Orb/OrbProvider';
import { SoundProvider } from './Sound/SoundProvider';

type ProvidersProps = {
  sections: RefObject<HTMLElement | null>[];
  children: ReactNode;
};

const Providers = ({ sections, children }: ProvidersProps) => (
  <MotionConfig>
    <DarkModeProvider>
      <SoundProvider>
        <OrbProvider>
          <ActiveSectionProvider sections={sections}>
            {children}
          </ActiveSectionProvider>
        </OrbProvider>
      </SoundProvider>
    </DarkModeProvider>
  </MotionConfig>
);

export default Providers;
