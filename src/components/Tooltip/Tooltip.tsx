import classNames from 'classnames';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import classes from './Tooltip.module.css';

type Position = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  text: string;
  position?: Position;
  hasTip?: boolean;
} & React.JSX.IntrinsicElements['div'];

const Tooltip = ({
  text,
  position = 'top',
  hasTip = true,
  children,
  className,
  ...props
}: TooltipProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={classNames(classes.wrapper, { [classes.dark]: isDarkMode })}
    >
      {children}
      <div
        className={classNames(
          classes.tooltip,
          classes[position],
          { [classes.tip]: hasTip },
          className,
        )}
        {...props}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
