import classNames from 'classnames';
import { motion, type MotionProps } from 'motion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import { faces, OrbContext } from '../../contexts/Orb';
import useSound from '../../hooks/useSound';
import classes from './Orb.module.css';
import Pixels from './Pixels';
import { getRandomMessage } from './messages';
import orbChirp from './orb-chirp.mp3';

const Orb = (props: MotionProps) => {
  const { face, setFace } = useContext(OrbContext);
  const { isDarkMode } = useContext(DarkModeContext);

  const [message, setMessage] = useState('');
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  const happyFaceTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const [playOrbChirp] = useSound(orbChirp);

  // clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (happyFaceTimeout.current) {
        clearTimeout(happyFaceTimeout.current);
        happyFaceTimeout.current = null;
      }
      if (bubbleTimeout.current) {
        clearTimeout(bubbleTimeout.current);
        bubbleTimeout.current = null;
      }
    };
  }, []);

  const onHover = (isHovering: boolean) => {
    if (face !== faces.happy) {
      setFace(isHovering ? faces.openMouth : faces.smile);
    }
  };

  const onClick = () => {
    if (happyFaceTimeout.current) {
      clearTimeout(happyFaceTimeout.current);
      happyFaceTimeout.current = null;
    }
    if (bubbleTimeout.current) {
      clearTimeout(bubbleTimeout.current);
      bubbleTimeout.current = null;
    }

    // set face to happy, then reset after 0.8s
    setFace(faces.happy);
    happyFaceTimeout.current = setTimeout(() => {
      setFace(faces.smile);
    }, 800);

    // show bubble with random message, then hide bubble after 2.5s
    setMessage(getRandomMessage({ isDarkMode }));
    setIsBubbleVisible(true);
    bubbleTimeout.current = setTimeout(() => {
      setIsBubbleVisible(false);
    }, 2500);

    playOrbChirp();
  };

  return (
    <motion.div className={classNames(classes.container)} {...props}>
      <div className={classes.inner}>
        <button
          className={classNames(classes.orb)}
          type="button"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          onFocus={(event) => {
            if (event.currentTarget.matches(':focus-visible')) {
              onHover(true);
            }
          }}
          onBlur={() => onHover(false)}
          onClick={onClick}
          aria-label="Interact with Orb"
        >
          <Pixels config={face} />
        </button>
        <div
          className={classNames([
            classes.bubble,
            { [classes.visible]: isBubbleVisible },
          ])}
        >
          {message}
        </div>
      </div>
    </motion.div>
  );
};

export default Orb;
