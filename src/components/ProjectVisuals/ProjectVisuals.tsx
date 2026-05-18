import classNames from 'classnames';
import { useEffect, useState, type ReactNode } from 'react';
import classes from './ProjectVisuals.module.css';

type ProjectVisualsProps = { items: ReactNode[]; className?: string };

const ProjectVisuals = ({ items, className }: ProjectVisualsProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    setActiveItemIndex(0);
  }, [items]);

  const isCarousel = items.length > 1;

  return (
    <div className={classNames(classes.projectVisuals, className)}>
      {items[activeItemIndex]}

      {isCarousel && (
        <div className={classes.carouselTrack}>
          {items.map((_, index) => {
            const isActive = index === activeItemIndex;
            return (
              <button
                key={index}
                onClick={() => setActiveItemIndex(index)}
                aria-pressed={isActive}
                aria-label={`View project visual ${index + 1}`}
                className={classNames(classes.carouselButton, {
                  [classes.active]: isActive,
                })}
              >
                <div className={classes.carouselIndicator} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectVisuals;
