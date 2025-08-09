import classNames from 'classnames';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import classes from './Input.module.css';

type InputProps = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

const Input = ({
  label,
  type = 'text',
  value = '',
  onChange,
  ...rest
}: InputProps) => {
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

export default Input;
