import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Fragment } from 'react';
import IconButton from '../IconButton';
import classes from './StepNav.module.css';

type StepNavProps = {
  step: number;
  total: number;
  onStepChange: (newStep: number) => void;
  labels?: {
    nav?: string;
    prevButton?: string;
    nextButton?: string;
    stepButton?: string;
  };
  variant?: 'full' | 'compact';
} & React.HTMLAttributes<HTMLElement>;

const padded = (num: number) => String(num).padStart(2, '0');

const CompactSteps = ({
  step,
  total,
}: Pick<StepNavProps, 'step' | 'total'>) => (
  <span className={classes.compactSteps}>
    <span className={classes.compactCurrent}>{padded(step)}</span>
    <span className={classes.separator}>/</span>
    <span className={classes.compactTotal}>{padded(total)}</span>
  </span>
);

const FullSteps = ({
  step: currentStep,
  total,
  onStepChange,
  stepButtonLabel,
}: Pick<StepNavProps, 'step' | 'total' | 'onStepChange'> & {
  stepButtonLabel: string;
}) => (
  <span className={classes.fullSteps}>
    {Array.from({ length: total }).map((_, index) => {
      const step = index + 1;
      const isCurrentStep = currentStep === step;
      const isLastStep = step === total;

      return (
        <Fragment key={step}>
          <button
            type="button"
            onClick={() => onStepChange(step)}
            aria-current={isCurrentStep ? 'step' : undefined}
            aria-label={stepButtonLabel.replace('{number}', String(step))}
            className={classNames(classes.stepButton, {
              [classes.active]: isCurrentStep,
            })}
          >
            {padded(step)}
          </button>
          {!isLastStep && <span className={classes.separator}>/</span>}
        </Fragment>
      );
    })}
  </span>
);

const defaultLabels: NonNullable<Required<StepNavProps['labels']>> = {
  nav: 'Step navigation',
  prevButton: 'Previous step',
  nextButton: 'Next step',
  stepButton: 'Go to step {number}',
};

const StepNav = ({
  step,
  total,
  onStepChange,
  className,
  labels: providedLabels,
  variant = 'compact',
}: StepNavProps) => {
  const labels = { ...defaultLabels, ...providedLabels };

  const isFirstStep = step === 1;
  const isLastStep = step === total;

  return (
    <nav
      className={classNames(classes.stepNav, className)}
      aria-label={labels.nav}
    >
      <IconButton
        onClick={() => onStepChange(step - 1)}
        disabled={isFirstStep}
        aria-label={labels.prevButton}
      >
        <ChevronLeft size={16} />
      </IconButton>
      {variant === 'compact' && <CompactSteps step={step} total={total} />}
      {variant === 'full' && (
        <FullSteps
          step={step}
          total={total}
          onStepChange={onStepChange}
          stepButtonLabel={labels.stepButton}
        />
      )}
      <IconButton
        onClick={() => onStepChange(step + 1)}
        disabled={isLastStep}
        aria-label={labels.nextButton}
      >
        <ChevronRight size={16} />
      </IconButton>
    </nav>
  );
};

export default StepNav;
