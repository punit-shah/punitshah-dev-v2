import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import useSound from '../../hooks/useSound';
import classes from './Orb.module.css';
import Pixels from './Pixels';
import { happy, openMouth, smile } from './faces';
import { getRandomMessage } from './messages';
import orbChirp from './orb-chirp.mp3';

const Orb = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [face, setFace] = useState(smile);
  const [message, setMessage] = useState('');
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const happyFaceTimeout = useRef<number>(null);
  const bubbleTimeout = useRef<number>(null);

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
    if (face !== happy) {
      setFace(isHovering ? openMouth : smile);
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

    setFace(happy);
    happyFaceTimeout.current = setTimeout(() => {
      setFace(smile);
    }, 800);

    setMessage(getRandomMessage());
    setIsBubbleVisible(true);
    bubbleTimeout.current = setTimeout(() => {
      setIsBubbleVisible(false);
    }, 2500);

    playOrbChirp();
  };

  return (
    <div
      className={classNames(classes.container, { [classes.dark]: isDarkMode })}
    >
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
    </div>
  );
};

export default Orb;
