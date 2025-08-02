import ColorSwitcher from '../../components/ColorSwitcher';
import Section, { type CustomSectionProps } from '../../components/Section';
import StretchyText from '../../components/StretchyText';
import classes from './Cover.module.css';

const Cover = ({ ...props }: CustomSectionProps) => (
  <Section className={classes.section} id="cover" {...props}>
    <div className={classes.intro}>
      <h1 className={classes.hey}>
        Hey, I'm <span className={classes.name}>Punit</span>
      </h1>
      <p className={classes.description}>
        Frontend engineer focused on
        <br />
        <ColorSwitcher>function</ColorSwitcher> and{' '}
        <StretchyText>feel</StretchyText>.
      </p>
    </div>
  </Section>
);

export default Cover;
