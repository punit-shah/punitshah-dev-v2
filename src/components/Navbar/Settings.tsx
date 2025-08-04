import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import { SoundContext } from '../../contexts/Sound';
import classes from './Navbar.module.css';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isSoundEnabled, toggleSound } = useContext(SoundContext);

  const items = [
    {
      key: 'darkModeToggle',
      label: isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
      icon: isDarkMode ? <Moon size={32} /> : <Sun size={32} />,
      onClick: toggleDarkMode,
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
