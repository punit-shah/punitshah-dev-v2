import classNames from 'classnames';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { TRANSITION_DURATION } from '../../constants';
import classes from './ProjectVisuals.module.css';

type ProjectVisualsProps = { items: ReactNode[]; className?: string };

const ProjectVisuals = ({ items, className }: ProjectVisualsProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [liveMessage, setLiveMessage] = useState('');
  const trackRef = useRef<HTMLUListElement>(null);
  const hasMountedRef = useRef(false);

  const prefersReducedMotion = useReducedMotion();

  const goToItem = (
    itemIndex: number,
    scrollBehavior: ScrollBehavior = 'smooth',
  ) => {
    setActiveItemIndex(itemIndex);
    trackRef.current?.scrollTo({
      left: itemIndex * trackRef.current.offsetWidth,
      behavior: prefersReducedMotion ? 'auto' : scrollBehavior,
    });
  };

  useEffect(() => {
    // when items change (meaning the project has changed),
    // reset to first item
    if (prefersReducedMotion) {
      goToItem(0);
    } else {
      // when reduced motion is not preferred, wait for fade transition before resetting
      const timeoutId = setTimeout(() => {
        goToItem(0, 'instant');
      }, TRANSITION_DURATION);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps
  // only run this effect when items change - other dependencies not needed

  useEffect(() => {
    if (items.length <= 1) return;

    // prevents announcing live message on initial render
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setLiveMessage(`Visual ${activeItemIndex + 1} of ${items.length}`);
  }, [activeItemIndex, items.length]);

  const isCarousel = items.length > 1;

  return (
    <div
      className={classNames(classes.projectVisuals, className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project visuals"
    >
      <ul
        ref={trackRef}
        className={classes.carouselTrack}
        tabIndex={0}
        onScroll={(event) => {
          const { scrollLeft, offsetWidth } = event.currentTarget;
          const itemIndex = Math.round(scrollLeft / offsetWidth);
          if (itemIndex !== activeItemIndex) setActiveItemIndex(itemIndex);
        }}
        onKeyDown={(event) => {
          const min = 0;
          const max = items.length - 1;
          if (event.key === 'ArrowLeft' && activeItemIndex > min) {
            event.preventDefault();
            goToItem(activeItemIndex - 1);
          }
          if (event.key === 'ArrowRight' && activeItemIndex < max) {
            event.preventDefault();
            goToItem(activeItemIndex + 1);
          }
        }}
      >
        {items.map((item, itemIndex) => (
          <li
            key={itemIndex}
            id={`visual-${itemIndex + 1}`}
            className={classes.carouselItem}
          >
            {item}
          </li>
        ))}
      </ul>

      {isCarousel && (
        <div
          className={classes.dots}
          role="group"
          aria-label="Select project visual"
        >
          {items.map((_, index) => {
            const isActive = index === activeItemIndex;
            const visualNumber = index + 1;

            return (
              <button
                key={index}
                type="button"
                className={classNames(classes.dotButton, {
                  [classes.active]: isActive,
                })}
                aria-current={isActive ? true : undefined}
                aria-label={
                  isActive
                    ? `Visual ${visualNumber}, current`
                    : `Go to visual ${visualNumber}`
                }
                aria-controls={`visual-${visualNumber}`}
                onClick={() => goToItem(index)}
              >
                <div className={classes.dotInner} />
              </button>
            );
          })}
        </div>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>
    </div>
  );
};

export default ProjectVisuals;
