import classNames from 'classnames';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkMode';
import classes from './Pixels.module.css';

const Pixels = ({ config }: { config: string }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={classNames(classes.container, { [classes.dark]: isDarkMode })}
      role="presentation"
    >
      {config
        .trim()
        .split('\n')
        .map((row, index) => (
          <div key={index} className={classes.pixelRow}>
            {row.split('').map((char, charIndex) => (
              <div
                key={charIndex}
                className={classNames([
                  classes.pixel,
                  { [classes.off]: char === '_' },
                ])}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Pixels;
