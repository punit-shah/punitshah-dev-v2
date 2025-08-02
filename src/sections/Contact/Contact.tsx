import Section, { type CustomSectionProps } from '../../components/Section';

const Contact = ({ ...props }: CustomSectionProps) => (
  <Section className="Contact" title="Contact" id="contact" {...props}>
    <p>
      Contact form coming soon! Until then, you can reach me at{' '}
      <a href="mailto:punit@punitshah.dev">punit@punitshah.dev</a>
    </p>
  </Section>
);

export default Contact;
