import classNames from 'classnames';
import classes from './Tooltip.module.css';

type Position = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  text: string;
  position?: Position;
} & React.JSX.IntrinsicElements['div'];

const Tooltip = ({
  text,
  position = 'top',
  children,
  className,
  ...props
}: TooltipProps) => {
  return (
    <div className={classes.wrapper}>
      {children}
      <div
        className={classNames(classes.tooltip, classes[position], className)}
        {...props}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
