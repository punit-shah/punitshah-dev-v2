import classNames from 'classnames';
import { useEffect, useState } from 'react';
import useSound from '../../hooks/useSound';
import classes from './ColorSwitcher.module.css';
import changeColor from './change-color.mp3';

const accentColors = ['purple', 'sunset', 'lime', 'pink', 'blue'];

type ColorSwitcherProps = {
  children: React.ReactNode;
  className?: string;
};

const ColorSwitcher = ({ children, className }: ColorSwitcherProps) => {
  const [colorIndex, setColorIndex] = useState(0);
  const [playChangeColor] = useSound(changeColor);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--color-accent-1',
      `var(--color-${accentColors[colorIndex]}-1)`,
    );
    document.documentElement.style.setProperty(
      '--color-accent-2',
      `var(--color-${accentColors[colorIndex]}-2)`,
    );
    document.documentElement.style.setProperty(
      '--color-accent-bg-mid',
      `var(--color-${accentColors[colorIndex]}-bg-mid)`,
    );
    document.documentElement.style.setProperty(
      '--color-accent-bg-end',
      `var(--color-${accentColors[colorIndex]}-bg-end)`,
    );
  }, [colorIndex]);

  return (
    <button
      className={classNames(classes.colorSwitcher, className)}
      type="button"
      onClick={() => {
        setColorIndex((prev) => (prev + 1) % accentColors.length);
        playChangeColor();
      }}
    >
      {children}
    </button>
  );
};

export default ColorSwitcher;
