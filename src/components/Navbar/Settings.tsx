import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import { SoundContext } from '../../contexts/Sound';
import useMediaQuery from '../../hooks/useMediaQuery';
import useSound from '../../hooks/useSound';
import classes from './Navbar.module.css';
import SettingsMenu from './SettingsMenu';
import lightOff from './sounds/light-off.mp3';
import lightOn from './sounds/light-on.mp3';
import soundOff from './sounds/sound-off.mp3';
import soundOn from './sounds/sound-on.mp3';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isSoundEnabled, toggleSound } = useContext(SoundContext);

  const isMenu = !useMediaQuery('(min-width: 600px) and (min-height: 600px)');

  const [playLightOn] = useSound(lightOn);
  const [playLightOff] = useSound(lightOff);
  const [playSoundOn] = useSound(soundOn);
  const [playSoundOff] = useSound(soundOff);

  const items = [
    {
      key: 'darkModeToggle',
      label: isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
      icon: isDarkMode ? <Moon /> : <Sun />,
      onClick: () => {
        toggleDarkMode();

        if (isDarkMode) {
          playLightOn();
        } else {
          playLightOff();
        }
      },
    },
    {
      key: 'soundToggle',
      label: isSoundEnabled ? 'Disable sounds' : 'Enable sounds',
      icon: isSoundEnabled ? <Volume2 /> : <VolumeX />,
      onClick: () => {
        toggleSound();

        if (isSoundEnabled) {
          playSoundOff();
        } else {
          playSoundOn({ forceSoundEnabled: true });
        }
      },
    },
  ];

  if (isMenu) {
    return <SettingsMenu items={items} />;
  }

  return (
    <ul className={classes.list}>
      {items.map(({ key, label, icon, onClick }) => (
        <li key={key}>
          <button
            className={classes.button}
            type="button"
            aria-label={label}
            onClick={onClick}
          >
            {icon}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Settings;
