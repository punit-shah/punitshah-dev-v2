import classNames from 'classnames';
import { useEffect, useState } from 'react';
import classes from './NavbarIndicator.module.css';

type NavbarIndicatorProps = {
  activeSection: string | null;
  itemsRef: React.RefObject<(HTMLLIElement | null)[]>;
};

const NavbarIndicator = ({ activeSection, itemsRef }: NavbarIndicatorProps) => {
  const [indicatorPosition, setIndicatorPosition] = useState(-1);

  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeItemIndex = itemsRef.current.findIndex(
        (ref) => ref?.getAttribute('data-section') === activeSection,
      );
      if (activeItemIndex < 0) {
        setIndicatorPosition(-1);
        return;
      }

      setIndicatorPosition(itemsRef.current[activeItemIndex]?.offsetTop ?? -1);
    };

    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    return () => {
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [activeSection, itemsRef]);

  return (
    <div
      className={classNames([
        classes.indicator,
        { [classes.active]: indicatorPosition >= 0 },
      ])}
      style={{ top: indicatorPosition }}
    />
  );
};

export default NavbarIndicator;
