import { useEffect, useRef, useState } from 'react';

const getPropertyValues = (element: HTMLElement, properties: string[]) =>
  properties.reduce<Record<string, string>>(
    (acc, property) => ({
      ...acc,
      [property]: element.style.getPropertyValue(property),
    }),
    {},
  );

const useStyleObserver = (element: HTMLElement, properties: string[]) => {
  const [propertyValues, setPropertyValues] = useState<Record<string, string>>(
    {},
  );

  // run once to initialize the state
  useEffect(() => {
    setPropertyValues(getPropertyValues(element, properties));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const observerRef = useRef<MutationObserver>(
    new MutationObserver(([mutation]) => {
      if (mutation.target instanceof HTMLElement) {
        setPropertyValues(getPropertyValues(mutation.target, properties));
      }
    }),
  );

  useEffect(() => {
    const observer = observerRef.current;

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return propertyValues;
};

export default useStyleObserver;
