import classNames from 'classnames';
import classes from './Pixels.module.css';

type PixelsProps = { config: string; pixelSize?: number };

const Pixels = ({ config, pixelSize = 4 }: PixelsProps) => (
  <div className={classNames(classes.container)} role="presentation">
    {config
      .trim()
      .split('\n')
      .map((row, index) => (
        <div
          key={index}
          className={classes.pixelRow}
          style={{ height: pixelSize }}
        >
          {row.split('').map((char, charIndex) => (
            <div
              key={charIndex}
              className={classNames([
                classes.pixel,
                { [classes.off]: char === '_' },
              ])}
              style={{ width: pixelSize, height: pixelSize }}
            />
          ))}
        </div>
      ))}
  </div>
);

export default Pixels;
