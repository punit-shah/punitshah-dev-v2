import classNames from 'classnames';
import { useEffect, useState, type HTMLInputTypeAttribute } from 'react';
import useApiRequest from '../../hooks/useApiRequest';
import useSound from '../../hooks/useSound';
import classes from './Form.module.css';
import FormStatusMessage, {
  type FormStatusMessages,
} from './FormStatusMessage';
import Input from './Input';
import error from './sounds/error.mp3';
import success from './sounds/success.mp3';
import Submit from './Submit';

export type Field = {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute | 'textarea';
  required?: boolean;
  placeholder?: string;
};

type FormProps = {
  fields?: Field[];
  apiEndpoint: string;
  statusMessages?: FormStatusMessages;
  children?: React.ReactNode;
  className?: string;
};

const Form = ({
  fields = [],
  apiEndpoint,
  statusMessages,
  children,
  className,
}: FormProps) => {
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [playSuccess] = useSound(success);
  const [playError] = useSound(error, { volume: 0.5 });
  const { sendRequest, status, isLoading, isSuccess } = useApiRequest(
    apiEndpoint,
    'POST',
    { onSuccess: () => playSuccess(), onError: () => playError() },
  );

  useEffect(() => {
    setFieldValues((prevFieldValues) =>
      fields.reduce<Record<string, string>>(
        (acc, field) => ({
          ...acc,
          [field.name]: prevFieldValues[field.name] || '',
        }),
        {},
      ),
    );
  }, [fields]);

  return (
    <form
      className={classNames(classes.form, className)}
      onSubmit={(e) => {
        e.preventDefault();
        void sendRequest(fieldValues);
      }}
    >
      {children}

      {fields.map((field) => (
        <Input
          key={field.name}
          {...field}
          value={fieldValues[field.name]}
          onChange={(value) => {
            setFieldValues((prevFieldValues) => ({
              ...prevFieldValues,
              [field.name]: value,
            }));
          }}
          disabled={isLoading || isSuccess}
        />
      ))}
      <Submit isLoading={isLoading} isSuccess={isSuccess} />
      {statusMessages && (
        <FormStatusMessage status={status} messages={statusMessages} />
      )}
    </form>
  );
};

export default Form;
