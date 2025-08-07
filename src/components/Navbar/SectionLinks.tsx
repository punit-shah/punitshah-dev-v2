import { FolderCode, MessageCircle, UserRound } from 'lucide-react';
import { useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import Tooltip from '../Tooltip';
import classes from './Navbar.module.css';
import NavbarIndicator from './NavbarIndicator';

const items = [
  { label: 'About', sectionId: 'about', icon: <UserRound /> },
  { label: 'Projects', sectionId: 'projects', icon: <FolderCode /> },
  { label: 'Contact', sectionId: 'contact', icon: <MessageCircle /> },
];

const onLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href');
  if (targetId) {
    const element = document.querySelector(targetId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
};

type SectionLinkProps = {
  label: string;
  sectionId: string;
  icon: React.ReactNode;
};

const SectionLink = ({ label, sectionId, icon }: SectionLinkProps) => {
  const hasTooltip = useMediaQuery(
    '(min-width: 600px) and (min-height: 600px)',
  );

  const labelProp = hasTooltip
    ? { 'aria-labelledby': `tooltip-${label}` }
    : { 'aria-label': label };

  const link = (
    <a
      href={`#${sectionId}`}
      className={classes.link}
      onClick={onLinkClick}
      {...labelProp}
    >
      {icon}
    </a>
  );

  return hasTooltip ? (
    <Tooltip text={label} position="right" id={`tooltip-${label}`}>
      {link}
    </Tooltip>
  ) : (
    link
  );
};

type SectionsProps = {
  activeSection: string | null;
};

const SectionLinks = ({ activeSection }: SectionsProps) => {
  const itemsRef = useRef<Array<HTMLLIElement | null>>(items.map(() => null));

  return (
    <div>
      <ul className={classes.list}>
        {items.map(({ label, sectionId, icon }, index) => (
          <li
            key={label}
            data-section={sectionId}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
          >
            <SectionLink label={label} sectionId={sectionId} icon={icon} />
          </li>
        ))}
      </ul>
      <NavbarIndicator activeSection={activeSection} itemsRef={itemsRef} />
    </div>
  );
};

export default SectionLinks;
