import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import FilterDrawer from '../components/common/FilterDrawer';
import LazyFooter from '../components/common/LazyFooter';

/**
 * PublicLayout — wraps all public-facing pages.
 *
 * Structure:
 * ┌────────────────────────────────────────────────┐
 * │  STICKY NAVBAR (with filter toggle button)     │
 * ├────────────────────────────────────────────────┤
 * │                                                │
 * │   FULL WIDTH MAIN CONTENT                      │
 * │   <Outlet /> renders the active page here      │
 * │                                                │
 * ├────────────────────────────────────────────────┤
 * │  LAZY FOOTER                                   │
 * └────────────────────────────────────────────────┘
 *
 *   → FilterDrawer overlays from the right on demand
 *
 * The collapsible FilterDrawer is controlled here and
 * passed down to Navbar via onFilterToggle prop.
 * Individual pages can further control category selection
 * via URL search params.
 */
const PublicLayout = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Navbar — not lazy, loads first */}
      <Navbar
        onFilterToggle={() => setFilterOpen((prev) => !prev)}
        filterOpen={filterOpen}
      />

      {/* Collapsible filter/category drawer */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      />

      {/* Main page content — full width */}
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          flex: 1,
          py: { xs: 2.5, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Outlet />
      </Container>

      {/* Footer — lazy loaded on scroll */}
      <LazyFooter />
    </Box>
  );
};

export default PublicLayout;
