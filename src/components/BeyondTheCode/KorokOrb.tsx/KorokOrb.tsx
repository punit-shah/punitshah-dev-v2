import classNames from 'classnames';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { faces } from '../../../contexts/Orb';
import useSound from '../../../hooks/useSound';
import orbChirp from '../../Orb/orb-chirp.mp3';
import orbClasses from '../../Orb/Orb.module.css';
import Pixels from '../../Orb/Pixels';
import classes from './KorokOrb.module.css';

const korokOrbVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const leafVariants: Variants = {
  initial: { opacity: 0, x: 0, y: 0 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    x: [0, (i - 1) * 40],
    y: [30, 25, 40],
  }),
};

const bubbleVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, x: 10 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0 },
};

type KorokOrbProps = { onComplete?: () => void };

const KorokOrb = ({ onComplete }: KorokOrbProps) => {
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [face, setFace] = useState(faces.smile);
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [playOrbChirp] = useSound(orbChirp);
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const happyFaceTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // after 0.6s
    const bubbleEnterTimeout = setTimeout(() => {
      // show bubble with "Yahaha" message, then hide bubble after 2.5s
      setBubbleMessage('Yahaha! You found me!');
      setIsBubbleVisible(true);
      bubbleTimeout.current = setTimeout(() => {
        setIsBubbleVisible(false);
      }, 2500);

      // set face to happy, then reset after 0.8s
      setFace(faces.happy);
      happyFaceTimeout.current = setTimeout(() => {
        setFace(faces.smile);
      }, 800);

      playOrbChirp();
    }, 600);

    return () => {
      // clean up timeouts
      clearTimeout(bubbleEnterTimeout);

      if (bubbleTimeout.current) {
        clearTimeout(bubbleTimeout.current);
        bubbleTimeout.current = null;
      }

      if (happyFaceTimeout.current) {
        clearTimeout(happyFaceTimeout.current);
        happyFaceTimeout.current = null;
      }
    };
  }, [playOrbChirp]);

  const onClick = () => {
    // clear timeouts
    if (bubbleTimeout.current) {
      clearTimeout(bubbleTimeout.current);
      bubbleTimeout.current = null;
    }
    if (happyFaceTimeout.current) {
      clearTimeout(happyFaceTimeout.current);
      happyFaceTimeout.current = null;
    }

    // show bubble with "Buh-bye!" message,
    // then hide bubble and call onComplete after 1s
    setBubbleMessage('Buh-bye!');
    setIsBubbleVisible(true);
    bubbleTimeout.current = setTimeout(() => {
      setIsBubbleVisible(false);
      onComplete?.();
    }, 1000);

    // set face to happy, then reset after 0.8s
    setFace(faces.happy);
    happyFaceTimeout.current = setTimeout(() => {
      setFace(faces.smile);
    }, 800);

    playOrbChirp();
  };

  return (
    <motion.div
      className={classNames(orbClasses.container, classes.container)}
      variants={korokOrbVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
    >
      <button
        className={classNames(orbClasses.orb, classes.orb)}
        type="button"
        onClick={onClick}
      >
        <Pixels config={face} pixelSize={2} />
      </button>

      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className={classes.leaf}
          variants={leafVariants}
          custom={index}
          initial="initial"
          animate="animate"
          transition={{ duration: 2, delay: index * 0.1, ease: 'easeOut' }}
        >
          🍃
        </motion.div>
      ))}

      <AnimatePresence>
        {isBubbleVisible && (
          <motion.div
            className={classNames(orbClasses.bubble, classes.bubble)}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            {bubbleMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default KorokOrb;
