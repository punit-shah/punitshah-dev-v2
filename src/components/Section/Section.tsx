import classNames from 'classnames';
import Container from '../Container';
import './Section.css';

type SectionProps = React.JSX.IntrinsicElements['section'] & {
  title?: string;
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Section = ({
  title,
  centered,
  className,
  children,
  ...rest
}: SectionProps) => (
  <section className={classNames('Section', className)} {...rest}>
    <Container centered={centered}>
      {title && <h2 className="Section-title">{title}</h2>}
      {children}
    </Container>
  </section>
);

export default Section;
