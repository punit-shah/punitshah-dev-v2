import classNames from 'classnames';
import { CircleCheck, CircleX } from 'lucide-react';
import type { Status } from '../../../hooks/useApiRequest';
import classes from './StatusMessage.module.css';

export type StatusMessages = { error: string; success: string };

type StatusMessageProps = {
  status: Status;
  messages: StatusMessages;
  className?: string;
};

const StatusMessage = ({ status, messages, className }: StatusMessageProps) => {
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

export default StatusMessage;
