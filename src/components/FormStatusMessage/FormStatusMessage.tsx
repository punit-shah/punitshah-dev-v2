import classNames from 'classnames';
import { CircleCheck, CircleX } from 'lucide-react';
import type { Status } from '../../hooks/useApiRequest';
import classes from './FormStatusMessage.module.css';

type FormStatusMessageProps = {
  status: Status;
  messages: { error: string; success: string };
  className?: string;
};

const FormStatusMessage = ({
  status,
  messages,
  className,
}: FormStatusMessageProps) => {
  const isHidden = status !== 'error' && status !== 'success';

  return (
    <p
      className={classNames(classes.message, className, {
        [classes[status]]: !isHidden,
        [classes.hidden]: isHidden,
      })}
    >
      {status === 'error' && <CircleX />}
      {status === 'success' && <CircleCheck />}
      {isHidden ? null : messages[status]}
    </p>
  );
};

export default FormStatusMessage;
