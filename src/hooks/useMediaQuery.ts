import { useEffect, useState } from 'react';

const useMediaQuery = (
  mediaQuery: string,
  onChange?: (matches: boolean) => void,
) => {
  const mediaQueryList = matchMedia(mediaQuery);

  const [mediaQueryValue, setMediaQueryValue] = useState(
    mediaQueryList.matches,
  );

  // run onChange on first render
  useEffect(() => {
    onChange?.(mediaQueryList.matches);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  mediaQueryList.addEventListener('change', (event) => {
    setMediaQueryValue(event.matches);
    onChange?.(event.matches);
  });

  return mediaQueryValue;
};

export default useMediaQuery;
