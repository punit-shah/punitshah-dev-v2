import classNames from 'classnames';
import { useEffect, useState } from 'react';
import classes from './NavbarIndicator.module.css';

type NavbarIndicatorProps = {
  activeSection: string | null;
  itemRefs: React.RefObject<HTMLLIElement | null>[];
};

const NavbarIndicator = ({ activeSection, itemRefs }: NavbarIndicatorProps) => {
  const [indicatorPosition, setIndicatorPosition] = useState(-1);

  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeItemIndex = itemRefs.findIndex(
        (ref) => ref.current?.getAttribute('data-section') === activeSection,
      );
      if (activeItemIndex < 0) {
        setIndicatorPosition(-1);
        return;
      }

      setIndicatorPosition(itemRefs[activeItemIndex].current?.offsetTop ?? -1);
    };

    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);
    return () => {
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [activeSection, itemRefs]);

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
