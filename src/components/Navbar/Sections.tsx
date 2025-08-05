import { FolderCode, MessageCircle, UserRound } from 'lucide-react';
import { useRef } from 'react';
import Tooltip from '../Tooltip';
import classes from './Navbar.module.css';
import NavbarIndicator from './NavbarIndicator';

const items = [
  { label: 'About', sectionId: 'about', icon: <UserRound size={32} /> },
  { label: 'Projects', sectionId: 'projects', icon: <FolderCode size={32} /> },
  { label: 'Contact', sectionId: 'contact', icon: <MessageCircle size={32} /> },
];

const onLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href');
  if (targetId) {
    const element = document.querySelector(targetId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
};

type SectionsProps = {
  activeSection: string | null;
};

const Sections = ({ activeSection }: SectionsProps) => {
  const itemsRef = useRef<Array<HTMLLIElement | null>>(items.map(() => null));

  return (
    <div>
      <ul className={classes.list}>
        {items.map((item, index) => (
          <li
            key={item.label}
            data-section={item.sectionId}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
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
      <NavbarIndicator activeSection={activeSection} itemsRef={itemsRef} />
    </div>
  );
};

export default Sections;
