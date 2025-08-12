import { LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../Button';
import classes from './FormSubmit.module.css';
import { CheckIcon, SendIcon } from './icons';

type FormSubmitProps = {
  isLoading: boolean;
  isSuccess: boolean;
};
type Icon = 'plane' | 'loader' | 'check';
type Text = 'Send' | 'Sending...' | 'Sent!';

const FormSubmit = ({ isLoading, isSuccess }: FormSubmitProps) => {
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

export default FormSubmit;
