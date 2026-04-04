import { Box, Skeleton, Container } from '@mui/material';

/**
 * Full-page loading skeleton shown by React Suspense
 * while lazy page chunks download.
 * Matches PublicLayout structure to prevent jarring layout shift.
 */
const PageSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    {/* Hero skeleton */}
    <Skeleton variant="rounded" height={280} sx={{ mb: 4, borderRadius: 2 }} />

    {/* Article grid skeleton */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 3,
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i}>
          <Skeleton variant="rounded" height={160} sx={{ mb: 1.5, borderRadius: 2 }} />
          <Skeleton width="85%" height={20} sx={{ mb: 0.75 }} />
          <Skeleton width="60%" height={16} sx={{ mb: 0.5 }} />
          <Skeleton width="40%" height={14} />
        </Box>
      ))}
    </Box>
  </Container>
);

export default PageSkeleton;
