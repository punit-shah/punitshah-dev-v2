import { LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Status } from '../../../hooks/useApiRequest';
import Button from '../../Button';
import classes from './Submit.module.css';
import { CheckIcon, SendIcon } from './icons';

type SubmitProps = { status: Status };
type Icon = 'plane' | 'loader' | 'check';
type Text = 'Send' | 'Sending...' | 'Sent!';

const Submit = ({ status }: SubmitProps) => {
  const [icon, setIcon] = useState<Icon>('plane');
  const [text, setText] = useState<Text>('Send');

  useEffect(() => {
    if (status === 'success') {
      setIcon('check');
      setText('Sent!');
      return;
    }

    setIcon('plane');
    setText('Send');
  }, [status]);

  return (
    <Button
      type="submit"
      disabled={status === 'loading' || status === 'success'}
    >
      {icon === 'plane' && (
        <SendIcon
          isSending={status === 'loading'}
          onAnimationComplete={() => {
            setIcon('loader');
            setText('Sending...');
          }}
        />
      )}
      {icon === 'loader' && <LoaderCircleIcon className={classes.loader} />}
      {icon === 'check' && <CheckIcon />}

      {text}
    </Button>
  );
};

export default Submit;
