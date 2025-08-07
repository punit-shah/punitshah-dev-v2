import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import classes from './SectionLinkIndicator.module.css';

const verticalBaseStyles: TargetAndTransition = {
  top: 0,
  bottom: 'auto',
  left: 0,
  right: 'auto',
  width: 5,
  height: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 4,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 4,
};
const horizontalBaseStyles: TargetAndTransition = {
  top: 'auto',
  bottom: 0,
  left: 0,
  right: 'auto',
  width: 0,
  height: 5,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
};

type SectionLinkIndicatorProps = {
  activeSection: string | null;
  itemsRef: React.RefObject<(HTMLLIElement | null)[]>;
};

const SectionLinkIndicator = ({
  activeSection,
  itemsRef,
}: SectionLinkIndicatorProps) => {
  const [isActive, setIsActive] = useState(false);
  const [style, setStyle] = useState<TargetAndTransition>({});
  const isVertical = useMediaQuery('(min-width: 600px)');

  const inactivePosition = isVertical ? { x: -5 } : { y: 5 };
  const inactive = { opacity: 0, scale: 0.8, ...inactivePosition };
  const active = { opacity: 1, scale: 1, x: 0, y: 0 };

  useEffect(() => {
    const updateStyle = () => {
      const activeItemIndex = itemsRef.current.findIndex(
        (ref) => ref?.getAttribute('data-section') === activeSection,
      );

      const activeItem = itemsRef.current[activeItemIndex];
      if (!activeItem) {
        setIsActive(false);
        setStyle({});
        return;
      }

      setIsActive(true);
      if (isVertical) {
        setStyle({
          ...verticalBaseStyles,
          top: activeItem.offsetTop,
          height: activeItem.offsetHeight,
        });
      } else {
        setStyle({
          ...horizontalBaseStyles,
          left: activeItem.offsetLeft,
          width: activeItem.offsetWidth,
        });
      }
    };

    updateStyle();
    window.addEventListener('resize', updateStyle);
    return () => {
      window.removeEventListener('resize', updateStyle);
    };
  }, [activeSection, isVertical, itemsRef]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={classes.indicator}
          initial={{ ...inactive, ...style }}
          animate={{ ...active, ...style }}
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
