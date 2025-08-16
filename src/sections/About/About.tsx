import classNames from 'classnames';
import { PaletteIcon, PersonStandingIcon, Wrench, ZapIcon } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import Section, { type CustomSectionProps } from '../../components/Section';
import classes from './About.module.css';
import { NextJsLogo, ReactLogo, StencilLogo, TypeScriptLogo } from './icons';

const skills = [
  { label: 'TypeScript', icon: <TypeScriptLogo /> },
  { label: 'React', icon: <ReactLogo /> },
  { label: 'Next.js', icon: <NextJsLogo /> },
  { label: 'Stencil', icon: <StencilLogo /> },
  { label: 'Accessibility', icon: <PersonStandingIcon /> },
  { label: 'Performance', icon: <ZapIcon /> },
  { label: 'UX Design', icon: <PaletteIcon /> },
  { label: 'DevEx', icon: <Wrench /> },
];

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const rightColumnVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const About = ({ ...props }: CustomSectionProps) => {
  return (
    <Section className={classes.section} title="About" id="about" {...props}>
      <div className={classes.container}>
        <motion.div
          className={classNames(classes.column, classes.columnLeft)}
          variants={leftColumnVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={classes.bio}>
            <p>
              I'm a Senior Software Engineer at <strong>Turnitin</strong>, where
              I build tools that help educators and students work smarter.
              Before that, I worked at <strong>BBC</strong> and{' '}
              <strong>Checkout.com</strong>, shipping projects that reached
              millions of people.
            </p>
            <p>
              I write a lot of <strong>TypeScript</strong>, and I'm happiest
              working with <strong>React</strong>, though I've used plenty of
              other UI frameworks and tech stacks. I care about accessibility,
              performance, and I always make sure the things I build feel good
              to use.
            </p>
            <p>
              I also care about the <strong>developer experience</strong> behind
              the scenes. This means the right tools and processes, easy
              integrations, and clear documentation - making life easier for
              everyone on the project.
            </p>
          </div>

          <div className={classes.skills}>
            <h4>Skills at a glance</h4>
            <ul className={classes.skillsList}>
              {skills.map((item) => (
                <li key={item.label} className={classes.skill}>
                  {item.icon} <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className={classNames(classes.column, classes.columnRight)}
          variants={rightColumnVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={classes.funFacts}>
            <h3 className={classes.title}>Beyond the code</h3>
            <ul className={classes.funFactsList}>
              <li>
                🧗‍♂️ Either climbing walls or dramatically falling off them (proof
                lives{' '}
                <a
                  href="https://www.instagram.com/punclimbs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                ).
              </li>
              <li>
                🤘 If there's a heavy gig in London, you'll probably find me in
                the mosh pit making questionable life choices.
              </li>
              <li>
                ☕️ Coffee snobbery is my love language - a carefully brewed V60
                at home, or a flat white in the wild.
              </li>
              <li>
                🎮 I unwind by wandering around Hyrule and{' '}
                <button
                  type="button"
                  className={classes.korokButton}
                  onClick={() => {
                    // todo: "Ya-ha-ha!"
                  }}
                >
                  collecting Korok seeds
                </button>
                .
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
