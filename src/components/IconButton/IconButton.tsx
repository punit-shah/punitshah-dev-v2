import classNames from 'classnames';
import type { ReactNode } from 'react';
import classes from './IconButton.module.css';

type IconButtonProps = {
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Circular button for icons
 */
const IconButton = ({ children, className, ...props }: IconButtonProps) => (
  <button
    type="button"
    className={classNames(classes.iconButton, className)}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
