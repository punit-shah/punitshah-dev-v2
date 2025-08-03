import Section, { type CustomSectionProps } from '../../components/Section';

const About = ({ ...props }: CustomSectionProps) => (
  <Section className="About" title="About" id="about" {...props}>
    <p>
      This section will tell you a bit about me and what I like to do. I haven't
      yet gotten around to writing it - but I will soon!
    </p>
  </Section>
);

export default About;
