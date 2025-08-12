import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
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
  const [width, setWidth] = useState<number | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.getBoundingClientRect().width);
    }
  }, [children]);

  return (
    <>
      <motion.button
        type={type}
        className={classNames([
          classes.button,
          { [classes.dark]: isDarkMode },
          className,
        ])}
        onClick={onClick}
        disabled={disabled}
        animate={width !== null ? { width } : undefined}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {children}
      </motion.button>

      <span ref={measureRef} className={classes.measure}>
        {children}
      </span>
    </>
  );
};

export default Button;
