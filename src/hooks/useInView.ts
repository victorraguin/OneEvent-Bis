import { useState, useEffect, RefObject } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInView = (
  ref: RefObject<Element>,
  options: IntersectionOptions = { threshold: 0.1 }
): boolean => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options.threshold, options.rootMargin]);

  return isInView;
};