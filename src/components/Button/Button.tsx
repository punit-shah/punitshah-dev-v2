import classNames from 'classnames';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import classes from './Button.module.css';

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button = ({
  type,
  className,
  children,
  onClick,
  disabled,
}: ButtonProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <button
      type={type}
      className={classNames([
        classes.button,
        { [classes.dark]: isDarkMode },
        className,
      ])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
