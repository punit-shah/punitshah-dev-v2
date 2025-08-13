import { useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Tooltip from '../../Tooltip';
import classes from '../Navbar.module.css';
import SectionLinkIndicator from '../SectionLinkIndicator';

const getClickHandler: (
  prefersReducedMotion: boolean | null,
) => React.MouseEventHandler<HTMLAnchorElement> =
  (prefersReducedMotion) => (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    if (targetId) {
      const element = document.querySelector(targetId);
      element?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

export type SectionLinkProps = {
  label: string;
  sectionId: string;
  icon: React.ReactNode;
};

const SectionLink = ({ label, sectionId, icon }: SectionLinkProps) => {
  const prefersReducedMotion = useReducedMotion();
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
      onClick={getClickHandler(prefersReducedMotion)}
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
  items?: SectionLinkProps[];
};

const SectionLinks = ({ activeSection, items = [] }: SectionsProps) => {
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
      <SectionLinkIndicator activeSection={activeSection} itemsRef={itemsRef} />
    </div>
  );
};

export default SectionLinks;
