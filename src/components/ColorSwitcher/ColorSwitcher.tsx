import classNames from 'classnames';
import { useEffect, useState } from 'react';
import classes from './ColorSwitcher.module.css';

const accentColors = ['purple', 'sunset', 'lime', 'pink', 'blue'];

type ColorSwitcherProps = {
  children: React.ReactNode;
  className?: string;
};

const ColorSwitcher = ({ children, className }: ColorSwitcherProps) => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    document.body.style.setProperty(
      '--accent-gradient-from',
      `var(--color-${accentColors[colorIndex]}-1)`,
    );
    document.body.style.setProperty(
      '--accent-gradient-to',
      `var(--color-${accentColors[colorIndex]}-2)`,
    );
  }, [colorIndex]);

  return (
    <button
      className={classNames(classes.colorSwitcher, className)}
      type="button"
      onClick={() => {
        setColorIndex((prev) => (prev + 1) % accentColors.length);
        // todo: add sound effect
      }}
      aria-label="Switch color theme"
    >
      {children}
    </button>
  );
};

export default ColorSwitcher;
