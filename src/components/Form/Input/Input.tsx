import classNames from 'classnames';
import { type HTMLInputTypeAttribute } from 'react';
import classes from './Input.module.css';

type InputProps = {
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

const Input = ({
  className,
  label,
  type = 'text',
  value = '',
  onChange,
  ...rest
}: InputProps) => {
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
    <label className={classNames(classes.inputContainer, className)}>
      {inputElement}
      <span
        className={classNames(classes.label, { [classes.hasValue]: value })}
      >
        {label}
      </span>
    </label>
  );
};

export default Input;
