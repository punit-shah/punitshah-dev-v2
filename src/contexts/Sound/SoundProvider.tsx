import { useEffect, useState } from 'react';
import { SoundContext } from './SoundContext';

type SoundProviderProps = { children: React.ReactNode };

const localStorageKey = 'isSoundEnabled';

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const savedSoundPreference = localStorage.getItem(localStorageKey);
    return savedSoundPreference !== null
      ? (JSON.parse(savedSoundPreference) as boolean)
      : true;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  return (
    <SoundContext
      value={{
        isSoundEnabled,
        toggleSound: () => {
          setIsSoundEnabled((prev) => !prev);
        },
      }}
    >
      {children}
    </SoundContext>
  );
};
