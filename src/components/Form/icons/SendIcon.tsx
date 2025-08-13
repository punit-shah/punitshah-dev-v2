import { motion, type AnimationDefinition, type Variants } from 'motion/react';

const variants: Variants = {
  send: {
    scale: [1, 0.8, 1],
    x: [0, '-10%', '100%'],
    y: [0, '10%', '-100%'],
    transition: { ease: 'easeInOut', duration: 0.6, times: [0, 0.25, 0.6] },
  },
  hover: {
    rotate: [0, -5, 5, 0],
    transition: { ease: 'easeInOut', duration: 0.4 },
  },
};

type SendIconProps = {
  isSending?: boolean;
  isHovered?: boolean;
  onAnimationComplete?: (definition: AnimationDefinition) => void;
};
const SendIcon = ({
  isSending,
  isHovered,
  onAnimationComplete,
}: SendIconProps) => (
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
      variants={variants}
      initial={false}
      animate={isSending ? 'send' : isHovered ? 'hover' : undefined}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <motion.path d="m21.854 2.147-10.94 10.939" />
    </motion.g>
  </motion.svg>
);

export default SendIcon;
