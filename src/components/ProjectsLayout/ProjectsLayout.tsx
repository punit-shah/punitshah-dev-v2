import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { TRANSITION_DURATION } from '../../constants';
import { ActiveSectionContext } from '../../contexts/ActiveSection';
import useMediaQuery from '../../hooks/useMediaQuery';
import type { Project } from '../../sections/Projects';
import Carousel from '../Carousel';
import StepNav from '../StepNav';
import classes from './ProjectsLayout.module.css';

const LARGE_SCREEN_BREAKPOINT = 1456;

const ProjectsLayout = ({ projects }: { projects: Project[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentKey, setContentKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const { activeSection } = useContext(ActiveSectionContext);

  const isLargeScreen = useMediaQuery(
    `(min-width: ${LARGE_SCREEN_BREAKPOINT}px)`,
  );

  const total = projects.length;
  const proj = projects[activeIndex];

  const navigate = (newIndex: number) => {
    if (newIndex === activeIndex || newIndex < 0 || newIndex >= total) return;
    setIsVisible(false);
    setActiveIndex(newIndex);
    setContentKey((k) => k + 1);
    setTimeout(() => {
      setIsVisible(true);
    }, TRANSITION_DURATION);
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // handle keyboard navigation when nothing is focused and Projects section is in view
      if (event.target !== document.body || activeSection !== 'projects')
        return;
      if (event.key === 'ArrowLeft') navigate(activeIndex - 1);
      if (event.key === 'ArrowRight') navigate(activeIndex + 1);
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [activeIndex, total, activeSection]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.spotlight}>
      <div className={classes.wash} aria-hidden="true" />

      <div
        className={classNames(classes.visualPanel, {
          [classes.hidden]: !isVisible,
        })}
      >
        <Carousel
          className={classNames(classes.carousel, {
            [classes.hidden]: !isVisible,
          })}
          items={proj.visuals}
          labels={{
            carousel: 'Project visuals',
            dots: 'Select visual',
            activeDot: 'Visual {number}, current',
            inactiveDot: 'Go to visual {number}',
            liveMessage: 'Visual {index} of {total}',
            prevButton: 'Previous visual',
            nextButton: 'Next visual',
          }}
        />
      </div>

      <StepNav
        step={activeIndex + 1}
        total={total}
        onStepChange={(step) => navigate(step - 1)}
        className={classes.nav}
        variant={isLargeScreen ? 'full' : 'compact'}
        labels={{
          nav: 'Projects navigation',
          prevButton: 'Previous project',
          nextButton: 'Next project',
          stepButton: 'Go to project {number}',
        }}
      />

      <div className={classes.content}>
        <div
          key={contentKey}
          className={classNames(classes.main, classes.contentEnter, {
            [classes.hidden]: !isVisible,
          })}
        >
          <h3 className={classes.name}>{proj.name}</h3>
          <p className={classes.tagline}>{proj.tagline}</p>
          <p className={classes.description}>{proj.description}</p>

          <div className={classes.chips}>
            {proj.tech.map((t, i) => (
              <span
                key={t}
                className={classNames(classes.chip, classes.chipEnter)}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href="#"
            className={classes.viewLink}
            onClick={(e) => e.preventDefault()}
          >
            View project ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsLayout;
