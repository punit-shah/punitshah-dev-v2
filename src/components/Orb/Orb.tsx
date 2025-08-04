import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import styles from './Orb.module.css';
import Pixels from './Pixels';
import { happy, openMouth, smile } from './faces';

const Orb = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isHovered, setIsHovered] = useState(false);
  const [wasJustClicked, setWasJustClicked] = useState(false);
  const [face, setFace] = useState(smile);

  useEffect(() => {
    if (wasJustClicked) {
      setFace(happy);
      return;
    }

    if (isHovered) {
      setFace(openMouth);
      return;
    }

    setFace(smile);
  }, [isHovered, wasJustClicked]);

  return (
    <div
      className={classNames(styles.container, { [styles.dark]: isDarkMode })}
    >
      <button
        className={classNames(styles.orb)}
        type="button"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onClick={() => {
          setWasJustClicked(true);
          setTimeout(() => {
            setWasJustClicked(false);
          }, 1000);
        }}
      >
        <Pixels config={face} />
      </button>
    </div>
  );
};

export default Orb;
