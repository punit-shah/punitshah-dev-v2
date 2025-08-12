import classNames from 'classnames';
import classes from './Pixels.module.css';

const Pixels = ({ config }: { config: string }) => (
  <div className={classNames(classes.container)} role="presentation">
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

export default Pixels;
