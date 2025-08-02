import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import classes from './DarkMode.module.css';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useMediaQuery('(prefers-color-scheme: dark)', (isSystemDarkMode) => {
    setIsDarkMode(isSystemDarkMode);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      className={classes.button}
      type="button"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => {
        setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
      }}
    >
      {isDarkMode ? <Moon size={32} /> : <Sun size={32} />}
    </button>
  );
};

export default DarkMode;
