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
  const [style, setStyle] = useState<React.CSSProperties>({});
  const isVertical = useMediaQuery('(min-width: 600px)');

  const inactivePosition = isVertical ? { x: -5 } : { y: 5 };
  const inactive = { opacity: 0, scale: 0.8, ...inactivePosition };

  const activePosition = isVertical ? { x: 0 } : { y: 0 };
  const active = { opacity: 1, scale: 1, ...activePosition };

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
          top: activeItem.offsetTop,
          left: 0,
          height: activeItem.offsetHeight,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        });
      } else {
        setStyle({
          left: activeItem.offsetLeft,
          bottom: 0,
          width: activeItem.offsetWidth,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
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
          initial={inactive}
          animate={active}
          exit={inactive}
          transition={{ duration: 0.2 }}
          style={style}
        />
      )}
    </AnimatePresence>
  );
};

export default SectionLinkIndicator;
