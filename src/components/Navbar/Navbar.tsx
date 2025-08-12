import classNames from 'classnames';
import { FolderCode, MessageCircle, UserRound } from 'lucide-react';
import LogoItem from './LogoItem';
import classes from './Navbar.module.css';
import SectionLinks, { type SectionLinkItem } from './SectionLinks';
import Settings from './Settings';

const sectionLinks: SectionLinkItem[] = [
  { label: 'About', sectionId: 'about', icon: <UserRound /> },
  { label: 'Projects', sectionId: 'projects', icon: <FolderCode /> },
  { label: 'Contact', sectionId: 'contact', icon: <MessageCircle /> },
];

type NavbarProps = {
  activeSection: string | null;
};

const Navbar = ({ activeSection }: NavbarProps) => (
  <nav className={classNames(classes.nav)}>
    <LogoItem />
    <SectionLinks activeSection={activeSection} items={sectionLinks} />
    <Settings />
  </nav>
);

export default Navbar;
