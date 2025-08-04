import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import { SoundContext } from '../../contexts/Sound';
import useSound from '../../hooks/useSound';
import classes from './Navbar.module.css';
import switchOff from './switch-off.mp3';
import switchOn from './switch-on.mp3';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isSoundEnabled, toggleSound } = useContext(SoundContext);
  const [playSwitchOn] = useSound(switchOn);
  const [playSwitchOff] = useSound(switchOff);

  const items = [
    {
      key: 'darkModeToggle',
      label: isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
      icon: isDarkMode ? <Moon size={32} /> : <Sun size={32} />,
      onClick: () => {
        toggleDarkMode();

        if (isDarkMode) {
          playSwitchOff();
        } else {
          playSwitchOn();
        }
      },
    },
    {
      key: 'soundToggle',
      label: isSoundEnabled ? 'Disable sounds' : 'Enable sounds',
      icon: isSoundEnabled ? <Volume2 size={32} /> : <VolumeX size={32} />,
      onClick: toggleSound,
    },
  ];

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
