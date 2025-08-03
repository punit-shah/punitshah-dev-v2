import classNames from 'classnames';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import styles from './Orb.module.css';

const Pixels = ({ config }: { config: string }) => (
  <div className={styles.face}>
    {config
      .trim()
      .split('\n')
      .map((row, index) => (
        <div key={index} className={styles.pixelRow}>
          {row.split('').map((char, charIndex) => (
            <div
              key={charIndex}
              className={`${styles.pixel} ${char === '_' ? styles.off : ''}`}
            />
          ))}
        </div>
      ))}
  </div>
);

const smile = `
_x__x_
_x__x_


x___x
_xxx_
`;

const happy = `
_x____x_
x_x__x_x


xxxxx
_xxx_
`;

const u_u = `
x_x__x_x
_x____x_


x__x
_xx_
`;

const faces = [smile, happy, u_u];

const Orb = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [faceIndex, setFaceIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.orb, { [styles.dark]: isDarkMode })}
        onClick={() => {
          setFaceIndex((prevIndex) => (prevIndex + 1) % faces.length);
        }}
      >
        <Pixels config={faces[faceIndex]} />
      </div>
    </div>
  );
};

export default Orb;
