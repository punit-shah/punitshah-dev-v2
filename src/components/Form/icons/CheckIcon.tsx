import { motion } from 'motion/react';

const CheckIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
  >
    <motion.path
      d="M4 12l5 5L20 6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    />
  </motion.svg>
);

export default CheckIcon;
