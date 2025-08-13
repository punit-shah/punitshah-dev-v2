import { motion } from 'motion/react';
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
        <motion.h1
          className={classes.hey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hey, I'm&nbsp;{name}
        </motion.h1>
        <motion.p
          className={classes.description}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Frontend engineer focused on <ColorSwitcher>function</ColorSwitcher>{' '}
          and <StretchyText>feel</StretchyText>.
        </motion.p>
      </div>
      <Orb
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </Section>
  );
};

export default Cover;
