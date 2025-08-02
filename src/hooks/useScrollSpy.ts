import { useEffect, useRef, useState } from 'react';

const useScrollSpy = (sectionRefs: React.RefObject<HTMLElement | null>[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver>(
    new IntersectionObserver(
      (entries) => {
        const firstVisibleSection = entries.find(
          (entry) => entry.isIntersecting,
        );

        setActiveSection(firstVisibleSection?.target.id ?? null);
      },
      { rootMargin: '-40% 0% -60% 0%' },
    ),
  );

  useEffect(() => {
    const observer = observerRef.current;

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  return activeSection;
};

export default useScrollSpy;
