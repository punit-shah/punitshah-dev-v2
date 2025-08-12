import { LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../Button';
import classes from './Submit.module.css';
import { CheckIcon, SendIcon } from './icons';

type SubmitProps = { isLoading: boolean; isSuccess: boolean };
type Icon = 'plane' | 'loader' | 'check';
type Text = 'Send' | 'Sending...' | 'Sent!';

const Submit = ({ isLoading, isSuccess }: SubmitProps) => {
  const [icon, setIcon] = useState<Icon>('plane');
  const [text, setText] = useState<Text>('Send');

  useEffect(() => {
    if (isSuccess) {
      setIcon('check');
      setText('Sent!');
      return;
    }

    setIcon('plane');
    setText('Send');
  }, [isSuccess, isLoading]);

  return (
    <Button type="submit" disabled={isLoading || isSuccess}>
      {icon === 'plane' && (
        <SendIcon
          isSending={isLoading}
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
