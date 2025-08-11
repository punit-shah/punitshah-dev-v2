import classNames from 'classnames';
import { CircleCheck, CircleX } from 'lucide-react';
import classes from './FormMessage.module.css';

type FormMessageProps = {
  type: 'error' | 'success' | 'hidden';
  className?: string;
  children: React.ReactNode;
};

const FormMessage = ({ type, className, children }: FormMessageProps) => (
  <p
    className={classNames(classes.message, className, {
      [classes.show]: type !== 'hidden',
      [classes.error]: type === 'error',
      [classes.success]: type === 'success',
    })}
  >
    {type === 'error' && <CircleX />}
    {type === 'success' && <CircleCheck />}
    {children}
  </p>
);

export default FormMessage;
