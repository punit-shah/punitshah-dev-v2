import { motion } from 'framer-motion';

export const CheckIcon = () => (
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

type SendIconProps = {
  isSending?: boolean;
  onAnimationComplete?: () => void;
};
export const SendIcon = ({ isSending, onAnimationComplete }: SendIconProps) => (
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
    <motion.g
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={
        isSending
          ? {
              scale: [1, 0.8, 1],
              x: [0, '-10%', '100%'],
              y: [0, '10%', '-100%'],
              transition: {
                ease: 'easeInOut',
                duration: 0.6,
                times: [0, 0.25, 0.6],
              },
            }
          : {}
      }
      onAnimationComplete={onAnimationComplete}
    >
      <motion.path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <motion.path d="m21.854 2.147-10.94 10.939" />
    </motion.g>
  </motion.svg>
);
