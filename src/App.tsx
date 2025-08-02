import { useRef } from 'react';
import Navbar from './components/Navbar';
import useScrollSpy from './hooks/useScrollSpy';
import About from './sections/About';
import Contact from './sections/Contact';
import Cover from './sections/Cover';
import Projects from './sections/Projects';

const App = () => {
  const aboutSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  const activeSection = useScrollSpy([
    aboutSectionRef,
    projectsSectionRef,
    contactSectionRef,
  ]);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <Cover />
      <About ref={aboutSectionRef} />
      <Projects ref={projectsSectionRef} />
      <Contact ref={contactSectionRef} />
    </>
  );
};

export default App;
