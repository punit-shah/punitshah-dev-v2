import classNames from 'classnames';
import classes from './Logo.module.css';

type LogoProps = {
  size?: number;
  isHovered?: boolean;
};

const Logo = ({ size = 40, isHovered }: LogoProps) => {
  // todo: detect changes in css variables when switching color theme
  const computedStyle = getComputedStyle(document.body);
  const fromColor = computedStyle.getPropertyValue('--accent-gradient-from');
  const toColor = computedStyle.getPropertyValue('--accent-gradient-to');

  return (
    <svg
      className={classNames(classes.logo, { [classes.hover]: isHovered })}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Home"
    >
      <defs>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
      </defs>

      <circle
        className={classes.outer}
        cx="50"
        cy="50"
        r="48"
        fill="url(#accentGradient)"
      />

      <circle className={classes.inner} cx="50" cy="50" r="40" fill="white" />

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight={800}
        fontSize="48"
        className={classes.text}
        dx="-2"
        dy="4"
      >
        :P
      </text>
    </svg>
  );
};

export default Logo;
