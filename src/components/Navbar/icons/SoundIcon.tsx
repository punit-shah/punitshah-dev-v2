import { motion, type Variants } from 'framer-motion';

const duration = 0.15;
const delay = 0.15;
const waveVariants: Variants = {
  enabled: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration, delay: delay + i * 0.1 },
  }),
  disabled: (i: number) => ({
    opacity: 0,
    scale: 0,
    x: -5,
    transition: { duration, delay: (1 - i) * 0.1 },
  }),
};
const xVariants: Variants = {
  enabled: (i: number) => ({
    pathLength: 0,
    opacity: 0,
    transition: { duration, delay: (1 - i) * 0.1 },
  }),
  disabled: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration, delay: delay + i * 0.1 },
  }),
};

type SoundIconProps = { isEnabled: boolean };
const SoundIcon = ({ isEnabled }: SoundIconProps) => (
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
    animate={isEnabled ? 'enabled' : 'disabled'}
  >
    {/* speaker */}
    <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />

    {/* sound waves */}
    <motion.path
      d="M16 9a5 5 0 0 1 0 6"
      style={{ originX: 0, originY: 0.5 }}
      variants={waveVariants}
      custom={0}
    />
    <motion.path
      d="M19.364 18.364a9 9 0 0 0 0-12.728"
      style={{ originX: 0, originY: 0.5 }}
      variants={waveVariants}
      custom={1}
    />

    {/* x */}
    <motion.line
      x1="22"
      x2="16"
      y1="9"
      y2="15"
      variants={xVariants}
      custom={0}
    />
    <motion.line
      x1="16"
      x2="22"
      y1="9"
      y2="15"
      variants={xVariants}
      custom={1}
    />
  </motion.svg>
);

export default SoundIcon;
