import classNames from 'classnames';
import LogoItem from './LogoItem';
import classes from './Navbar.module.css';
import SectionLinks from './SectionLinks';
import Settings from './Settings';

type NavbarProps = {
  activeSection: string | null;
};

const Navbar = ({ activeSection }: NavbarProps) => (
  <nav className={classNames(classes.nav)}>
    <LogoItem />
    <SectionLinks activeSection={activeSection} />
    <Settings />
  </nav>
);

export default Navbar;
