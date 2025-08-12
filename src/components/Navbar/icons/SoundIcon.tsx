import { motion } from 'framer-motion';

type SoundIconProps = { isEnabled: boolean };

const waveVariants = {
  enabled: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.15, delay: 0.15 },
  },
  disabled: {
    opacity: 0,
    scale: 0,
    x: -1.5,
    transition: { duration: 0.15 },
  },
};

const crossVariants = {
  enabled: (i: number) => ({
    pathLength: 0,
    opacity: 0,
    transition: { duration: 0.15, delay: (1 - i) * 0.1 },
  }),
  disabled: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.15, delay: 0.15 + i * 0.1 },
  }),
};

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
    initial={isEnabled ? 'enabled' : 'disabled'}
    animate={isEnabled ? 'enabled' : 'disabled'}
  >
    <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />

    <motion.path
      d="M16 9a5 5 0 0 1 0 6"
      style={{ originX: 0, originY: 0.5 }}
      variants={waveVariants}
    />
    <motion.path
      d="M19.364 18.364a9 9 0 0 0 0-12.728"
      style={{ originX: 0, originY: 0.5 }}
      variants={waveVariants}
    />

    <motion.line
      x1="22"
      x2="16"
      y1="9"
      y2="15"
      variants={crossVariants}
      custom={0}
    />
    <motion.line
      x1="16"
      x2="22"
      y1="9"
      y2="15"
      variants={crossVariants}
      custom={1}
    />
  </motion.svg>
);

export default SoundIcon;
