import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { SettingsIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import classes from './SettingsMenu.module.css';

type SettingsMenuProps = {
  items: {
    key: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
};

const SettingsMenu = ({ items }: SettingsMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHorizontal = useMediaQuery('(min-width: 600px)');
  const containerRef = useRef<HTMLDivElement>(null);

  // close the menu when clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closedPosition = isHorizontal ? { x: -10 } : { y: 10 };
  const openPosition = isHorizontal ? { x: 0 } : { y: 0 };

  return (
    <div className={classNames(classes.container)} ref={containerRef}>
      <button
        className={classes.button}
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle settings"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-controls={'settings-menu'}
      >
        <SettingsIcon />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            id="settings-menu"
            role="menu"
            className={classes.menu}
            initial={{ opacity: 0, scale: 0.95, ...closedPosition }}
            animate={{ opacity: 1, scale: 1, ...openPosition }}
            exit={{ opacity: 0, scale: 0.95, ...closedPosition }}
            transition={{ duration: 0.2 }}
          >
            {items.map(({ key, label, icon, onClick }) => (
              <li key={key} role="menuitem" className={classes.item}>
                <button
                  className={classes.button}
                  type="button"
                  aria-label={label}
                  onClick={onClick}
                >
                  {icon}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsMenu;
