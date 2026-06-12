import { useRef } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Providers from './contexts/Providers';
import About from './sections/About';
import Contact from './sections/Contact';
import Cover from './sections/Cover';
import Projects from './sections/Projects';

const App = () => {
  const aboutSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  return (
    <Providers
      sections={[aboutSectionRef, projectsSectionRef, contactSectionRef]}
    >
      <Navbar />
      <Cover />
      <About ref={aboutSectionRef} />
      <Projects ref={projectsSectionRef} />
      <Contact ref={contactSectionRef} />
      <Footer />
    </Providers>
  );
};

export default App;
