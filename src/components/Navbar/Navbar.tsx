import classNames from 'classnames';
import { AtSign, BookOpenText, FolderCode, Moon, Sun } from 'lucide-react';
import { createRef, useContext, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import Logo from '../Logo';
import Tooltip from '../Tooltip';
import classes from './Navbar.module.css';
import NavbarIndicator from './NavbarIndicator';

const items = [
  { label: 'About', sectionId: 'about', icon: <BookOpenText size={32} /> },
  { label: 'Projects', sectionId: 'projects', icon: <FolderCode size={32} /> },
  { label: 'Contact', sectionId: 'contact', icon: <AtSign size={32} /> },
];

type NavbarProps = {
  activeSection: string | null;
};

const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href');
  if (targetId) {
    const element = document.querySelector(targetId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const itemRefs = items.map(() => createRef<HTMLLIElement>());

  return (
    <nav className={classNames(classes.nav, { [classes.dark]: isDarkMode })}>
      <a
        href="#cover"
        className={classNames(classes.link, classes.logo)}
        onClick={onLinkClick}
        onMouseEnter={() => {
          setIsLogoHovered(true);
        }}
        onMouseLeave={() => {
          setIsLogoHovered(false);
        }}
        aria-label="Scroll to top"
      >
        <Logo isHovered={isLogoHovered} />
      </a>

      <div>
        <ul className={classes.list}>
          {items.map((item, index) => (
            <li
              key={item.label}
              data-section={item.sectionId}
              ref={itemRefs[index]}
            >
              <Tooltip
                text={item.label}
                position="right"
                id={`tooltip-${item.label}`}
              >
                <a
                  href={`#${item.sectionId}`}
                  className={classes.link}
                  onClick={onLinkClick}
                  aria-labelledby={`tooltip-${item.label}`}
                >
                  {item.icon}
                </a>
              </Tooltip>
            </li>
          ))}
        </ul>
        <NavbarIndicator activeSection={activeSection} itemRefs={itemRefs} />
      </div>

      <button
        className={classes.button}
        type="button"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Moon size={32} /> : <Sun size={32} />}
      </button>
    </nav>
  );
};

export default Navbar;
