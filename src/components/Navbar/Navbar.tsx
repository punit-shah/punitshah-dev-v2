import classNames from 'classnames';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import LogoItem from './LogoItem';
import classes from './Navbar.module.css';
import Sections from './Sections';
import Settings from './Settings';

type NavbarProps = {
  activeSection: string | null;
};

const Navbar = ({ activeSection }: NavbarProps) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <nav className={classNames(classes.nav, { [classes.dark]: isDarkMode })}>
      <LogoItem />
      <Sections activeSection={activeSection} />
      <Settings />
    </nav>
  );
};

export default Navbar;
