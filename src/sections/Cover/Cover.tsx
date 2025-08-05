import { useContext } from 'react';
import ColorSwitcher from '../../components/ColorSwitcher';
import Orb from '../../components/Orb';
import Section, { type CustomSectionProps } from '../../components/Section';
import StretchyText from '../../components/StretchyText';
import { faces, OrbContext } from '../../contexts/Orb';
import classes from './Cover.module.css';

const Cover = ({ ...props }: CustomSectionProps) => {
  const { face, setFace } = useContext(OrbContext);

  const onHoverName = (isHovering: boolean) => {
    if (face !== faces.happy) {
      setFace(isHovering ? faces.tongueOut : faces.smile);
    }
  };

  const name = (
    <span
      className={classes.name}
      onMouseEnter={() => onHoverName(true)}
      onMouseLeave={() => onHoverName(false)}
    >
      Punit
    </span>
  );

  return (
    <Section
      className={classes.section}
      containerClassName={classes.container}
      id="cover"
      {...props}
    >
      <div className={classes.intro}>
        <h1 className={classes.hey}>Hey, I'm {name}</h1>
        <p className={classes.description}>
          Frontend engineer focused on
          <br />
          <ColorSwitcher>function</ColorSwitcher> and{' '}
          <StretchyText>feel</StretchyText>.
        </p>
      </div>
      <Orb />
    </Section>
  );
};

export default Cover;
