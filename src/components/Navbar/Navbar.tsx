import { AtSign, BookOpenText, FolderCode } from 'lucide-react';
import Logo from '../Logo/Logo';
import Tooltip from '../Tooltip';
import classes from './Navbar.module.css';

const items = [
  { label: 'About', href: '#about', icon: <BookOpenText size={32} /> },
  { label: 'Projects', href: '#projects', icon: <FolderCode size={32} /> },
  { label: 'Contact', href: '#contact', icon: <AtSign size={32} /> },
];

const Navbar = () => {
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
          <Tooltip text="Top" position="right" id="tooltip-Top">
            <Logo
              href="#cover"
              onClick={onLinkClick}
              aria-labelledby="tooltip-Top"
            />
          </Tooltip>
        </li>
        {items.map((item) => (
          <li key={item.label} className={classes.item}>
            <Tooltip
              text={item.label}
              position="right"
              id={`tooltip-${item.label}`}
            >
              <a
                href={item.href}
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
    </nav>
  );
};

export default Navbar;
