import { motion, type Variants } from 'framer-motion';

const duration = 0.15;
const delay = 0.15;
const sunRayVariants: Variants = {
  dark: { scale: 0, transition: { duration } },
  light: { scale: 1, transition: { duration, delay: delay * 1.5 } },
};
const sunCoreVariants: Variants = {
  dark: { opacity: 0, scale: 1.25, transition: { duration } },
  light: { opacity: 1, scale: 1, transition: { duration, delay } },
};
const moonVariants: Variants = {
  dark: { opacity: 1, scale: 1, transition: { duration, delay } },
  light: { opacity: 0, scale: 0.75, transition: { duration } },
};

type SunMoonIconProps = { isDark?: boolean };
const SunMoonIcon = ({ isDark }: SunMoonIconProps) => {
  const sunRays = [
    'M12 2v2',
    'M12 20v2',
    'm4.93 4.93 1.41 1.41',
    'm17.66 17.66 1.41 1.41',
    'M2 12h2',
    'M20 12h2',
    'm6.34 17.66-1.41 1.41',
    'm19.07 4.93-1.41 1.41',
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      initial={false}
      animate={isDark ? 'dark' : 'light'}
    >
      {sunRays.map((d, i) => (
        <motion.path key={i} d={d} variants={sunRayVariants} />
      ))}
      <motion.circle cx="12" cy="12" r="4" variants={sunCoreVariants} />
      <motion.path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        variants={moonVariants}
      />
    </motion.svg>
  );
};

export default SunMoonIcon;
