import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button = ({
  type,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
}: ButtonProps) => {
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
        className={classNames(classes.button, className)}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
