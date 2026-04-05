import {
  Drawer, Box, Typography, IconButton, Chip,
  List, ListItem, ListItemButton, ListItemText,
   Divider, useMediaQuery, useTheme,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

/**
 * FilterDrawer — collapsible right-side panel for categories & filters.
 * Hidden by default on all screen sizes.
 * Opened by the TuneOutlined button in the Navbar (onFilterToggle prop).
 *
 * On mobile   → full-screen overlay drawer from the right
 * On desktop  → 280px side panel overlapping content, closes on backdrop click
 *
 * Future AdSense placement: add an AdSlot component inside this drawer
 * between the categories and quick links sections.
 */

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Currently selected category — passed from page-level state */
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const QUICK_LINKS = [
  { label: 'Funding Opportunities', path: '/funding' },
  { label: 'Collaboration Hub',     path: '/collaboration' },
  { label: 'IPR Vault',             path: '/ipr' },
  { label: 'Innovation News',       path: '/innovation' },
  { label: 'Startup Stories',       path: '/startups' },
];

const FilterDrawer = ({ open, onClose, selectedCategory, onCategorySelect }: FilterDrawerProps) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100vw' : 300,
          maxWidth: '100vw',
          pt: { xs: 0, sm: '64px' }, // offset below sticky navbar on desktop
        },
      }}
      // On desktop — clicking backdrop closes drawer
      ModalProps={{ keepMounted: false }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.75,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color="primary.main">
          Filters & Categories
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="Close filters">
          <CloseOutlined fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ overflowY: 'auto', flex: 1, pb: 3 }}>

        {/* ── Categories ── */}
        <Box sx={{ px: 2.5, pt: 2.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              fontWeight: 600,
              display: 'block',
              mb: 1.5,
            }}
          >
            Browse by Category
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {/* All categories chip */}
            <Chip
              label="All"
              size="small"
              onClick={() => onCategorySelect?.('')}
              sx={{
                fontSize: '0.75rem',
                bgcolor: !selectedCategory ? 'secondary.main' : 'background.default',
                color: !selectedCategory ? '#fff' : 'text.secondary',
                border: '1px solid',
                borderColor: !selectedCategory ? 'secondary.main' : 'divider',
                fontWeight: !selectedCategory ? 600 : 400,
                '&:hover': { bgcolor: 'secondary.main', color: '#fff', borderColor: 'secondary.main' },
              }}
            />

       
          </Box>
        </Box>

        <Divider sx={{ mx: 2.5, my: 2.5 }} />

        {/* ── Quick links ── */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              fontWeight: 600,
              display: 'block',
              px: 2.5,
              mb: 0.5,
            }}
          >
            Quick Links
          </Typography>
          <List dense disablePadding>
            {QUICK_LINKS.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={onClose}
                  sx={{
                    px: 2.5,
                    py: 0.875,
                    '&:hover': { bgcolor: 'background.default', color: 'secondary.main' },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ fontSize: '0.875rem', color: 'text.secondary' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/*
         * ── AD SLOT ──────────────────────────────────────────
         * Replace this placeholder Box with your AdSense unit after approval.
         *
         * Recommended size for this sidebar placement: 300×250 (Medium Rectangle)
         * This is the highest CTR ad format on content-first sites.
         *
         * <ins
         *   className="adsbygoogle"
         *   style={{ display: 'block', width: 300, height: 250 }}
         *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         *   data-ad-slot="XXXXXXXXXX"
         * />
         */}
        <Box sx={{ px: 2.5, mt: 2.5 }}>
          <Box
            sx={{
              width: '100%',
              height: 250,
              bgcolor: 'background.default',
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" color="text.disabled" sx={{ letterSpacing: 1, fontSize: '0.7rem' }}>
              AD SLOT · 300×250
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
