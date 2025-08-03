import classNames from 'classnames';
import { AtSign, BookOpenText, FolderCode } from 'lucide-react';
import { createRef, useState } from 'react';
import DarkMode from '../DarkMode';
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

  const itemRefs = items.map(() => createRef<HTMLLIElement>());

  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <li className={classes.item}>
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
        </li>
        {items.map((item, index) => (
          <li
            key={item.label}
            className={classNames([
              classes.item,
              { [classes.active]: activeSection === item.sectionId },
            ])}
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
        <li className={classes.item}>
          <DarkMode />
        </li>
      </ul>
      <NavbarIndicator activeSection={activeSection} itemRefs={itemRefs} />
    </nav>
  );
};

export default Navbar;
