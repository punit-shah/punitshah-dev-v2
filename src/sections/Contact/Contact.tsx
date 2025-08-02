import Section, { type CustomSectionProps } from '../../components/Section';

const Contact = ({ ...props }: CustomSectionProps) => (
  <Section className="Contact" title="Contact" id="contact" {...props}>
    <p>
      Contact form coming soon! Until then, you can reach me at{' '}
      <a href="mailto:***REMOVED***">***REMOVED***</a>
    </p>
  </Section>
);

export default Contact;
