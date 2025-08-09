import classNames from 'classnames';
import Container from '../Container';
import classes from './Section.module.css';

type SectionProps = React.JSX.IntrinsicElements['section'] & {
  title?: string;
  centered?: boolean;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
};

export type CustomSectionProps = Omit<
  SectionProps,
  'title' | 'centered' | 'className' | 'children' | 'id'
>;

const Section = ({
  title,
  centered,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) => (
  <section className={classNames(classes.section, className)} {...rest}>
    <Container centered={centered} className={containerClassName}>
      {title && (
        <h2 className={classes.title}>
          {title}
          <div className={classes.titleUnderline} />
        </h2>
      )}
      {children}
    </Container>
  </section>
);

export default Section;
