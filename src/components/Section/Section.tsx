import classNames from 'classnames';
import type { JSX, ReactNode } from 'react';
import classes from './Section.module.css';

type SectionProps = JSX.IntrinsicElements['section'] & {
  title?: string;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
};

export type CustomSectionProps = Omit<
  SectionProps,
  'title' | 'centered' | 'className' | 'children' | 'id'
>;

const Section = ({
  title,
  centered,
  className,
  children,
  ...rest
}: SectionProps) => (
  <section
    className={classNames(
      classes.section,
      { [classes.centered]: centered },
      className,
    )}
    {...rest}
  >
    {title && (
      <h2 className={classes.title}>
        {title}
        <div className={classes.titleUnderline} />
      </h2>
    )}
    {children}
  </section>
);

export default Section;
