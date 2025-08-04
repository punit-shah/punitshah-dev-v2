import { DarkModeProvider } from './DarkMode';
import { SoundProvider } from './Sound';

type ProvidersProps = { children: React.ReactNode };

const Providers = ({ children }: ProvidersProps) => (
  <SoundProvider>
    <DarkModeProvider>{children}</DarkModeProvider>
  </SoundProvider>
);

export default Providers;
