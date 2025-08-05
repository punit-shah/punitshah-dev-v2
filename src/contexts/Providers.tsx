import { DarkModeProvider } from './DarkMode';
import { OrbProvider } from './Orb';
import { SoundProvider } from './Sound';

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => (
  <OrbProvider>
    <SoundProvider>
      <DarkModeProvider>{children}</DarkModeProvider>
    </SoundProvider>
  </OrbProvider>
);

export default Providers;
