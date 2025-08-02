import classNames from 'classnames';
import { AtSign, BookOpenText, FolderCode } from 'lucide-react';
import { createRef, useEffect, useState } from 'react';
import LogoSvg from '../Logo';
import Tooltip from '../Tooltip';
import classes from './Navbar.module.css';

const items = [
  { label: 'About', sectionId: 'about', icon: <BookOpenText size={32} /> },
  { label: 'Projects', sectionId: 'projects', icon: <FolderCode size={32} /> },
  { label: 'Contact', sectionId: 'contact', icon: <AtSign size={32} /> },
];

type NavbarProps = {
  activeSection: string | null;
};

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState(-1);

  const itemRefs = items.map(() => createRef<HTMLLIElement>());

  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeItemIndex = items.findIndex(
        (item) => item.sectionId === activeSection,
      );
      if (activeItemIndex < 0) {
        setIndicatorPosition(-1);
        return;
      }
      if (itemRefs[activeItemIndex].current) {
        const itemElement = itemRefs[activeItemIndex].current;
        setIndicatorPosition(itemElement.offsetTop);
      }
    };

    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    return () => {
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [activeSection, itemRefs]);

  const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    if (targetId) {
      const element = document.querySelector(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <LogoSvg isHovered={isLogoHovered} />
          </a>
        </li>
        {items.map((item, index) => (
          <li
            key={item.label}
            className={classNames([
              classes.item,
              { [classes.active]: activeSection === item.sectionId },
            ])}
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
      <div
        className={classNames(classes.indicator, {
          [classes.active]: indicatorPosition >= 0,
        })}
        style={{ top: indicatorPosition }}
      />
    </nav>
  );
};

export default Navbar;
