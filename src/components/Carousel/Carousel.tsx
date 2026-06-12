import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { TRANSITION_DURATION } from '../../constants';
import classes from './Carousel.module.css';

type CarouselProps = {
  items: ReactNode[];
  className?: string;
  labels?: {
    carousel?: string;
    dots?: string;
    activeDot?: string;
    inactiveDot?: string;
    liveMessage?: string;
    prevButton?: string;
    nextButton?: string;
  };
};

const defaultLabels: Required<CarouselProps['labels']> = {
  carousel: 'Carousel',
  dots: 'Select item',
  activeDot: 'Item {number}, current',
  inactiveDot: 'Go to item {number}',
  liveMessage: 'Item {index} of {total}',
  prevButton: 'Previous item',
  nextButton: 'Next item',
};

const Carousel = ({
  items,
  className,
  labels: providedLabels,
}: CarouselProps) => {
  const labels = { ...defaultLabels, ...providedLabels };

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

    setLiveMessage(
      labels.liveMessage
        .replace('{index}', String(activeItemIndex + 1))
        .replace('{total}', String(items.length)),
    );
  }, [activeItemIndex, items.length, labels.liveMessage]);

  const isCarousel = items.length > 1;

  return (
    <div
      className={classNames(classes.carousel, className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
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
            id={`item-${itemIndex + 1}`}
            className={classes.carouselItem}
          >
            {item}
          </li>
        ))}
      </ul>

      {isCarousel && (
        <button
          type="button"
          className={classNames(classes.navButton, classes.prevButton)}
          aria-label={labels.prevButton}
          disabled={activeItemIndex === 0}
          onClick={() => goToItem(activeItemIndex - 1)}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {isCarousel && (
        <button
          type="button"
          className={classNames(classes.navButton, classes.nextButton)}
          aria-label={labels.nextButton}
          disabled={activeItemIndex === items.length - 1}
          onClick={() => goToItem(activeItemIndex + 1)}
        >
          <ChevronRight size={16} />
        </button>
      )}

      {isCarousel && (
        <div className={classes.dots} role="group" aria-label={labels.dots}>
          {items.map((_, index) => {
            const isActive = index === activeItemIndex;
            const itemNumber = index + 1;

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
                    ? labels.activeDot.replace('{number}', String(itemNumber))
                    : labels.inactiveDot.replace('{number}', String(itemNumber))
                }
                aria-controls={`item-${itemNumber}`}
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

export default Carousel;
