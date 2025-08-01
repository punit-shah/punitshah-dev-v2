import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './ColorSwitcher.css';

const colorClasses = [
  'accent-purple',
  'accent-blue',
  'accent-sunset',
  'accent-lime',
  'accent-pink',
];

interface ColorSwitcherProps {
  children: React.ReactNode;
  className?: string;
}

const ColorSwitcher = ({ children, className }: ColorSwitcherProps) => {
  const [classIndex, setClassIndex] = useState(0);

  useEffect(() => {
    const body = document.body;
    colorClasses.forEach((colorClass) => {
      body.classList.remove(colorClass);
    });
    body.classList.add(colorClasses[classIndex]);
  }, [classIndex]);

  return (
    <button
      className={classNames('ColorSwitcher', className)}
      type="button"
      onClick={() => {
        setClassIndex((prev) => (prev + 1) % colorClasses.length);
        // todo: add sound effect
      }}
      aria-label="Switch color theme"
    >
      {children}
    </button>
  );
};

export default ColorSwitcher;
