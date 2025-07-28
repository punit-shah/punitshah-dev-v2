import classNames from 'classnames';
import './Container.css';

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
  <div className={classNames('Container', { centered }, className)} {...rest}>
    {children}
  </div>
);

export default Container;
