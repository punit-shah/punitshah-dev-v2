import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import classes from './SectionLinkIndicator.module.css';

type SectionLinkIndicatorProps = {
  activeSection: string | null;
  itemsRef: React.RefObject<(HTMLLIElement | null)[]>;
};

const SectionLinkIndicator = ({
  activeSection,
  itemsRef,
}: SectionLinkIndicatorProps) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [size, setSize] = useState(0);
  const isVertical = useMediaQuery('(min-width: 600px)');

  const inactivePosition = isVertical ? { x: -5 } : { y: 5 };
  const inactive = { opacity: 0, scale: 0.8, ...inactivePosition };
  const active = { opacity: 1, scale: 1, x: 0, y: 0 };

  useEffect(() => {
    const update = () => {
      const activeItemIndex = itemsRef.current.findIndex(
        (ref) => ref?.getAttribute('data-section') === activeSection,
      );

      const activeItem = itemsRef.current[activeItemIndex];
      if (!activeItem) {
        setIsActive(false);
        return;
      }

      setIsActive(true);
      if (isVertical) {
        setPosition(activeItem.offsetTop);
        setSize(activeItem.offsetHeight);
      } else {
        setPosition(activeItem.offsetLeft);
        setSize(activeItem.offsetWidth);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, [activeSection, isVertical, itemsRef]);

  const dynamicStyles = isVertical
    ? { y: position, width: 5, height: size }
    : { x: position, width: size, height: 5 };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={classNames(classes.indicator)}
          initial={{ ...inactive, ...dynamicStyles }}
          animate={{ ...active, ...dynamicStyles }}
          exit={inactive}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 0.3,
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default SectionLinkIndicator;
