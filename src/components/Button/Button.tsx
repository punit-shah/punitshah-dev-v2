import classNames from 'classnames';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import classes from './Button.module.css';

type ButtonProps = React.JSX.IntrinsicElements['button'];

const Button = ({ className, children, ...props }: ButtonProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <button
      className={classNames([
        classes.button,
        { [classes.dark]: isDarkMode },
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
