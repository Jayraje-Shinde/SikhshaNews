import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  InputBase, Menu, MenuItem, useMediaQuery, useTheme,
  Typography, Tooltip, ListItemIcon,
} from '@mui/material';

import {TranslateButton} from './GoogleTranslateButton'
import {
  MenuOutlined, SearchOutlined, CloseOutlined,
  HomeOutlined, ScienceOutlined, LightbulbOutlined, ArticleOutlined,
  RocketLaunchOutlined, GavelOutlined, HandshakeOutlined,
  AccountBalanceOutlined, RecordVoiceOverOutlined,
  KeyboardArrowDownOutlined, TuneOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { NavItem } from '../../utils/types';
import { ON_DARK_PRIMARY, ON_DARK_SECONDARY } from '../../theme/';

const PRIMARY_NAV: NavItem[] = [
  { label: 'Home',       path: '/',           icon: <HomeOutlined fontSize="small" /> },
  { label: 'Research',   path: '/research',   icon: <ScienceOutlined fontSize="small" /> },
  { label: 'Innovation', path: '/innovation', icon: <LightbulbOutlined fontSize="small" /> },
  { label: 'News',       path: '/news',       icon: <ArticleOutlined fontSize="small" /> },
];

const MORE_NAV: NavItem[] = [
  { label: 'Startups',      path: '/startups',      icon: <RocketLaunchOutlined fontSize="small" /> },
  { label: 'IPR Vault',     path: '/ipr',           icon: <GavelOutlined fontSize="small" /> },
  { label: 'Collaboration', path: '/collaboration', icon: <HandshakeOutlined fontSize="small" /> },
  { label: 'Funding',       path: '/funding',       icon: <AccountBalanceOutlined fontSize="small" /> },
  { label: 'Insights',      path: '/insights',      icon: <RecordVoiceOverOutlined fontSize="small" /> },
];

const ALL_NAV = [...PRIMARY_NAV, ...MORE_NAV];

interface NavbarProps {
  onFilterToggle?: () => void;
  filterOpen?: boolean;
}

const Navbar = ({ onFilterToggle, filterOpen = false }: NavbarProps) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [moreAnchor, setMoreAnchor]     = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchValue, setSearchValue]   = useState('');

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/news?search=${encodeURIComponent(searchValue.trim())}`);
    setSearchValue('');
    setSearchOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'primary.main',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1.5, md: 3 }, gap: 0.5 }}>

          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setMobileDrawer(true)}
              aria-label="Open navigation menu"
              sx={{ color: ON_DARK_PRIMARY }}    // #ffffff — explicit, not opacity
            >
              <MenuOutlined />
            </IconButton>
          )}

          {/* ── LOGO ─────────────────────────────────────────────────────
           * Replace the placeholder Box with your actual logo:
           *   <img src="/logo.svg" alt="SikshaNews" width={36} height={36} />
           *
           * File location: /public/logo.svg
           * Sizes needed:
           *   36×36px  → navbar icon
           *   32×32px  → mobile drawer
           *   180×180px → apple-touch-icon (separate file)
           * ─────────────────────────────────────────────────────────── */}
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', flexShrink: 0, mr: { md: 2 } }}
          >
            {/* LOGO PLACEHOLDER — swap with <img src="/logo.svg" width={36} height={36} alt="SikshaNews" /> */}
            <Box
              sx={{
                width: 36, height: 36, borderRadius: '8px',
                background: 'linear-gradient(135deg, #3c6e71 0%, #5a9295 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, color: '#fff',
                letterSpacing: '-0.5px', flexShrink: 0, userSelect: 'none',
              }}
            >
              SN
            </Box>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: { sm: '1.05rem', md: '1.1rem' },
                color: ON_DARK_PRIMARY,          // #ffffff — 10.5:1 ✅
                letterSpacing: '-0.2px',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              SikshaNews
            </Typography>
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, flex: 1 }}>
              {PRIMARY_NAV.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  size="small"
                  sx={{
                    // Active: white on navy+highlight = 10.5:1 ✅
                    // Inactive: ON_DARK_SECONDARY (#c8dde8) on navy = 6.1:1 ✅
                    color: isActive(item.path) ? ON_DARK_PRIMARY : ON_DARK_SECONDARY,
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: '0.875rem',
                    px: 1.5, py: 0.75, borderRadius: '7px',
                    backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.13)' : 'transparent',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.09)', color: ON_DARK_PRIMARY },
                    transition: 'all 0.15s',
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Button
                size="small"
                endIcon={
                  <KeyboardArrowDownOutlined
                    sx={{ fontSize: '16px !important', transition: 'transform 0.2s', transform: Boolean(moreAnchor) ? 'rotate(180deg)' : 'none' }}
                  />
                }
                onClick={(e) => setMoreAnchor(e.currentTarget)}
                sx={{
                  color: MORE_NAV.some((i) => isActive(i.path)) ? ON_DARK_PRIMARY : ON_DARK_SECONDARY,
                  fontWeight: MORE_NAV.some((i) => isActive(i.path)) ? 600 : 400,
                  fontSize: '0.875rem',
                  px: 1.5, py: 0.75, borderRadius: '7px',
                  backgroundColor: MORE_NAV.some((i) => isActive(i.path)) ? 'rgba(255,255,255,0.13)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.09)', color: ON_DARK_PRIMARY },
                  transition: 'all 0.15s',
                }}
              >
                More
              </Button>

              <Menu
                anchorEl={moreAnchor}
                open={Boolean(moreAnchor)}
                onClose={() => setMoreAnchor(null)}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 0.5, minWidth: 210, borderRadius: '10px',
                    border: '1px solid', borderColor: 'divider', overflow: 'hidden',
                    '& .MuiMenuItem-root': { py: 1, px: 2, gap: 1.5, fontSize: '0.875rem' },
                  },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                {MORE_NAV.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={Link}
                    to={item.path}
                    selected={isActive(item.path)}
                    onClick={() => setMoreAnchor(null)}
                    sx={{
                      // Dropdown is on white background — text.primary = #0f172a = 16.5:1 ✅
                      color: 'text.primary',
                      '&.Mui-selected': { color: 'secondary.main', fontWeight: 600, bgcolor: 'background.default' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit', opacity: 0.7 }}>
                      {item.icon}
                    </ListItemIcon>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <Box sx={{ flex: 1, display: { md: 'none' } }} />
			<TranslateButton/>
          {onFilterToggle && (
            <Tooltip title={filterOpen ? 'Close filters' : 'Filters & categories'}>
              <IconButton
                onClick={onFilterToggle}
                aria-label="Toggle filters"
                sx={{
                  color: filterOpen ? '#7dd3d6' : ON_DARK_SECONDARY,
                  backgroundColor: filterOpen ? 'rgba(60,110,113,0.25)' : 'transparent',
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.09)', color: ON_DARK_PRIMARY },
                }}
              >
                <TuneOutlined />
              </IconButton>
            </Tooltip>
          )}

          {searchOpen ? (
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: 'flex', alignItems: 'center',
                bgcolor: 'rgba(255,255,255,0.13)',
                borderRadius: '8px', border: '1px solid rgba(255,255,255,0.18)',
                px: 1.5, py: 0.25, minWidth: { xs: 160, sm: 240 },
              }}
            >
              <SearchOutlined sx={{ color: ON_DARK_SECONDARY, fontSize: 18, mr: 1 }} />
              <InputBase
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles…"
                // aria-label required for screen readers on unlabelled inputs
                inputProps={{ 'aria-label': 'Search articles' }}
                sx={{
                  flex: 1, color: ON_DARK_PRIMARY, fontSize: '0.875rem',
                  // Placeholder: ON_DARK_MUTED is 4.6:1 on navy ✅
                  '& input::placeholder': { color: '#9bbdd0', opacity: 1 },
                }}
              />
              <IconButton
                size="small"
                onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                aria-label="Close search"
                sx={{ color: ON_DARK_SECONDARY, p: 0.25 }}
              >
                <CloseOutlined fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Tooltip title="Search">
              <IconButton
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                sx={{ color: ON_DARK_SECONDARY, '&:hover': { color: ON_DARK_PRIMARY, backgroundColor: 'rgba(255,255,255,0.09)' } }}
              >
                <SearchOutlined />
              </IconButton>
            </Tooltip>
          )}

        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawer}
        onClose={() => setMobileDrawer(false)}
        PaperProps={{
          sx: { width: 272, backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column' },
        }}
      >
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* DRAWER LOGO PLACEHOLDER — swap with <img src="/logo.svg" width={32} height={32} alt="SikshaNews" /> */}
            <Box
              sx={{
                width: 32, height: 32, borderRadius: '6px',
                background: 'linear-gradient(135deg, #3c6e71 0%, #5a9295 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
              }}
            >
              SN
            </Box>
            <Typography sx={{ fontWeight: 700, color: ON_DARK_PRIMARY, fontSize: '1rem' }}>
              SikshaNews
            </Typography>
          </Box>
          <IconButton
            onClick={() => setMobileDrawer(false)}
            aria-label="Close menu"
            sx={{ color: ON_DARK_SECONDARY }}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>

        <List sx={{ px: 1, py: 1.5, flex: 1, overflowY: 'auto' }}>
          {ALL_NAV.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive(item.path)}
                onClick={() => setMobileDrawer(false)}
                sx={{
                  borderRadius: '8px', gap: 1.5, py: 0.875,
                  borderLeft: '3px solid',
                  borderLeftColor: isActive(item.path) ? 'secondary.main' : 'transparent',
                  '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.1)' },
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                {/* Icon: active = #7dd3d6 (teal light), inactive = ON_DARK_SECONDARY */}
                <Box sx={{ color: isActive(item.path) ? '#7dd3d6' : ON_DARK_SECONDARY }}>
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    // Active: white 10.5:1 ✅  Inactive: #c8dde8 6.1:1 ✅
                    color: isActive(item.path) ? ON_DARK_PRIMARY : ON_DARK_SECONDARY,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;