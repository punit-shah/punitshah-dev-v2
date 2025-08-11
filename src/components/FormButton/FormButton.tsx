import { LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../Button';
import classes from './FormButton.module.css';
import { CheckIcon, SendIcon } from './icons';

type FormButtonProps = {
  isLoading: boolean;
  isSuccess: boolean;
};
type Text = 'Send' | 'Sending...' | 'Sent!';
type Icon = 'plane' | 'loader' | 'check';

const FormButton = ({ isLoading, isSuccess }: FormButtonProps) => {
  const [text, setText] = useState<Text>('Send');
  const [icon, setIcon] = useState<Icon>('plane');

  useEffect(() => {
    if (isSuccess) {
      setText('Sent!');
      setIcon('check');
      return;
    }

    setText('Send');
    setIcon('plane');
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

export default FormButton;
