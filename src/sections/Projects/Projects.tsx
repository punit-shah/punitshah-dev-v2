import Section, { type CustomSectionProps } from '../../components/Section';

const Projects = ({ ...props }: CustomSectionProps) => (
  <Section className="Projects" title="Projects" id="projects" {...props}>
    <p>
      Coming soon! This section will showcase my projects and contributions.
    </p>
  </Section>
);

export default Projects;
