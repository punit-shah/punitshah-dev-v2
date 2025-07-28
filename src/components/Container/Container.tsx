import classNames from 'classnames';
import type { ReactNode } from 'react';
import './Container.css';

type ContainerProps = {
  className?: string;
  centered?: boolean;
  children: ReactNode;
};

const Container = ({ className, centered, children }: ContainerProps) => (
  <div className={classNames('Container', { centered }, className)}>
    {children}
  </div>
);

export default Container;
