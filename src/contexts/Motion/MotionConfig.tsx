import {
  MotionConfig as MotionReactConfig,
  useReducedMotion,
} from 'motion/react';
import { useEffect } from 'react';

type MotionConfigProps = { children: React.ReactNode };
const MotionConfig = ({ children }: MotionConfigProps) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.dataset.reducedMotion = '';
    } else {
      delete document.documentElement.dataset.reducedMotion;
    }
  }, [prefersReducedMotion]);

  return <MotionReactConfig reducedMotion="user">{children}</MotionReactConfig>;
};

export default MotionConfig;
