import { DarkModeProvider } from './DarkMode/DarkModeProvider';
import { MotionConfig } from './Motion';
import { OrbProvider } from './Orb/OrbProvider';
import { SoundProvider } from './Sound/SoundProvider';

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => (
  <MotionConfig>
    <DarkModeProvider>
      <SoundProvider>
        <OrbProvider>{children}</OrbProvider>
      </SoundProvider>
    </DarkModeProvider>
  </MotionConfig>
);

export default Providers;
