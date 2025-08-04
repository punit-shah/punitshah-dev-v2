import classNames from 'classnames';
import {
  FolderCode,
  MessageCircle,
  Moon,
  Sun,
  UserRound,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { createRef, useContext, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import { SoundContext } from '../../contexts/Sound';
import Logo from '../Logo';
import Tooltip from '../Tooltip';
import classes from './Navbar.module.css';
import NavbarIndicator from './NavbarIndicator';

const sectionNavItems = [
  { label: 'About', sectionId: 'about', icon: <UserRound size={32} /> },
  { label: 'Projects', sectionId: 'projects', icon: <FolderCode size={32} /> },
  { label: 'Contact', sectionId: 'contact', icon: <MessageCircle size={32} /> },
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
  const [isLogoFocusVisible, setIsLogoFocusVisible] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isSoundEnabled, toggleSound } = useContext(SoundContext);

  const sectionNavRefs = sectionNavItems.map(() => createRef<HTMLLIElement>());

  const settings = [
    {
      key: 'darkModeToggle',
      label: isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
      icon: isDarkMode ? <Moon size={32} /> : <Sun size={32} />,
      onClick: toggleDarkMode,
    },
    {
      key: 'soundToggle',
      label: isSoundEnabled ? 'Disable sounds' : 'Enable sounds',
      icon: isSoundEnabled ? <Volume2 size={32} /> : <VolumeX size={32} />,
      onClick: toggleSound,
    },
  ];

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
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) {
            setIsLogoFocusVisible(true);
          }
        }}
        onBlur={() => {
          setIsLogoFocusVisible(false);
        }}
        aria-label="Scroll to top"
      >
        <Logo isHovered={isLogoHovered || isLogoFocusVisible} />
      </a>

      <div>
        <ul className={classes.list}>
          {sectionNavItems.map((item, index) => (
            <li
              key={item.label}
              data-section={item.sectionId}
              ref={sectionNavRefs[index]}
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
        <NavbarIndicator
          activeSection={activeSection}
          itemRefs={sectionNavRefs}
        />
      </div>

      <ul className={classes.list}>
        {settings.map((item) => (
          <li key={item.key}>
            <button
              className={classes.button}
              type="button"
              aria-label={item.label}
              onClick={item.onClick}
            >
              {item.icon}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
