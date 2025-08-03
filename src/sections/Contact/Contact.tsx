import Section, { type CustomSectionProps } from '../../components/Section';

const Contact = ({ ...props }: CustomSectionProps) => (
  <Section className="Contact" title="Contact" id="contact" {...props}>
    <p>
      Contact form coming soon! Until then, you can connect with me on{' '}
      <a
        href="https://www.linkedin.com/in/punit-shah/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </p>
  </Section>
);

export default Contact;
