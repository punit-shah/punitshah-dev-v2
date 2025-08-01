import classNames from 'classnames';
import classes from './Logo.module.css';

type LogoProps = React.JSX.IntrinsicElements['a'];

const Logo = ({ className, ...props }: LogoProps) => (
  <a className={classNames(classes.logo, className)} {...props}>
    :P
  </a>
);

export default Logo;
