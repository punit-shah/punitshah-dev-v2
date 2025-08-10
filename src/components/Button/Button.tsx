import classNames from 'classnames';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import classes from './Button.module.css';

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button' | 'link';
  className?: string;
  children: React.ReactNode;

  // button props
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;

  // link props
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

const Button = ({
  type,
  className,
  children,
  onClick,
  disabled,
  href,
  target,
  rel,
}: ButtonProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  if (type === 'link') {
    return (
      <a
        className={classNames([
          classes.button,
          { [classes.dark]: isDarkMode },
          className,
        ])}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

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
