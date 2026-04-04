import { Box, Typography } from '@mui/material';

/**
 * Home — The Academic Pulse
 * Priority loading order:
 *   1. Pinned/Hero articles (immediate, localStorage cached)
 *   2. Featured articles by views (immediate, localStorage cached)
 *   3. Today's news grid (immediate)
 *   4. Trending section (deferred, enabled after featured loads)
 *   5. Most commented (on scroll, IntersectionObserver)
 *   6. Footer (on scroll, LazyFooter)
 */
const Home = () => (
  <Box>
    <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
      The Academic Pulse
    </Typography>
    <Typography color="text.secondary" mb={3}>
      Landing hub with latest educational news and featured content.
    </Typography>
    {/* TODO: HeroSection, FeaturedGrid, TodayNews, TrendingSection, MostCommented */}
  </Box>
);

export default Home;
