import classNames from 'classnames';
import classes from './Container.module.css';

type ContainerProps = React.JSX.IntrinsicElements['div'] & {
  className?: string;
  centered?: boolean;
  children: React.ReactNode;
};

const Container = ({
  className,
  centered,
  children,
  ...rest
}: ContainerProps) => (
  <div
    className={classNames(
      classes.container,
      { [classes.centered]: centered },
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Container;
