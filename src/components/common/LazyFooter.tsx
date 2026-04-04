import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';

const Footer = lazy(() => import('./Footer'));

/**
 * LazyFooter — loads the Footer component only when the user
 * scrolls within 300px of the bottom of the page.
 *
 * Why: Footer is the last thing a reader sees. Loading it eagerly
 * wastes bandwidth on users who never scroll that far.
 *
 * rootMargin '300px' — starts loading 300px before the placeholder
 * enters view so there is zero visible delay for the user.
 */
const LazyFooter = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect(); // Only need to trigger once
        }
      },
      { rootMargin: '300px' }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {shouldLoad ? (
        <Suspense
          fallback={
            // Same height as Footer to prevent layout jump during load
            <Box sx={{ height: 300, bgcolor: 'primary.main' }} />
          }
        >
          <Footer />
        </Suspense>
      ) : (
        // Placeholder — keeps page height stable before footer loads
        <Box sx={{ height: 300 }} />
      )}
    </div>
  );
};

export default LazyFooter;
