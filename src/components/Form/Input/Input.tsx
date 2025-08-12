import classNames from 'classnames';
import { useContext, type HTMLInputTypeAttribute } from 'react';
import { DarkModeContext } from '../../../contexts/DarkMode';
import classes from './Input.module.css';

type FormInputProps = {
  className?: string;
  label: string;
  type?: HTMLInputTypeAttribute | 'textarea';
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

const FormInput = ({
  className,
  label,
  type = 'text',
  value = '',
  onChange,
  ...rest
}: FormInputProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const inputProps = {
    className: classes.input,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange?.(e.target.value),
    ...rest,
  };

  const inputElement =
    type === 'textarea' ? (
      <textarea {...inputProps} />
    ) : (
      <input type={type} {...inputProps} />
    );

  return (
    <label
      className={classNames([
        classes.inputContainer,
        { [classes.dark]: isDarkMode },
        className,
      ])}
    >
      {inputElement}
      <span
        className={classNames(classes.label, { [classes.hasValue]: value })}
      >
        {label}
      </span>
    </label>
  );
};

export default FormInput;
