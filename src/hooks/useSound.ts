import { useContext } from 'react';
import { default as useSoundHook } from 'use-sound';
import { SoundContext } from '../contexts/Sound';

const useSound: typeof useSoundHook = (src, options) => {
  const { isSoundEnabled } = useContext(SoundContext);

  return useSoundHook(src, { soundEnabled: isSoundEnabled, ...options });
};

export default useSound;
