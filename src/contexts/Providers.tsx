import { DarkModeProvider } from './DarkMode/DarkModeProvider';
import { OrbProvider } from './Orb/OrbProvider';
import { SoundProvider } from './Sound/SoundProvider';

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => (
  <DarkModeProvider>
    <SoundProvider>
      <OrbProvider>{children}</OrbProvider>
    </SoundProvider>
  </DarkModeProvider>
);

export default Providers;
