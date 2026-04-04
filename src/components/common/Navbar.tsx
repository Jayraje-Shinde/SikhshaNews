import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  InputBase, Menu, MenuItem, useMediaQuery, useTheme,
  Typography, Tooltip, Avatar, Divider, ListItemIcon,
} from '@mui/material';
import {
  MenuOutlined,
  SearchOutlined,
  CloseOutlined,
  HomeOutlined,
  ScienceOutlined,
  LightbulbOutlined,
  ArticleOutlined,
  RocketLaunchOutlined,
  GavelOutlined,
  HandshakeOutlined,
  AccountBalanceOutlined,
  RecordVoiceOverOutlined,
  KeyboardArrowDownOutlined,
  AccountCircleOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TuneOutlined,
} from '@mui/icons-material';
import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import type { NavItem } from '../../utils/types';

// ── Nav config ─────────────────────────────────────────────────────────────
// Primary = always visible in desktop bar
const PRIMARY_NAV: NavItem[] = [
  { label: 'Home',       path: '/',           icon: <HomeOutlined fontSize="small" /> },
  { label: 'Research',   path: '/research',   icon: <ScienceOutlined fontSize="small" /> },
  { label: 'Innovation', path: '/innovation', icon: <LightbulbOutlined fontSize="small" /> },
  { label: 'News',       path: '/news',       icon: <ArticleOutlined fontSize="small" /> },
];

// More = in desktop dropdown, all in mobile drawer
const MORE_NAV: NavItem[] = [
  { label: 'Startups',      path: '/startups',      icon: <RocketLaunchOutlined fontSize="small" /> },
  { label: 'IPR Vault',     path: '/ipr',           icon: <GavelOutlined fontSize="small" /> },
  { label: 'Collaboration', path: '/collaboration', icon: <HandshakeOutlined fontSize="small" /> },
  { label: 'Funding',       path: '/funding',       icon: <AccountBalanceOutlined fontSize="small" /> },
  { label: 'Insights',      path: '/insights',      icon: <RecordVoiceOverOutlined fontSize="small" /> },
];

const ALL_NAV = [...PRIMARY_NAV, ...MORE_NAV];

// ── Props ──────────────────────────────────────────────────────────────────
interface NavbarProps {
  /** Called when the filter/sidebar toggle button is clicked */
  onFilterToggle?: () => void;
  /** Whether the filter drawer is currently open — for icon highlight */
  filterOpen?: boolean;
}

const Navbar = ({ onFilterToggle, filterOpen = false }: NavbarProps) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Mobile nav drawer
  const [mobileDrawer, setMobileDrawer] = useState(false);

  // "More" dropdown
  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null);

  // Search bar
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // User menu
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

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

          {/* ── Mobile hamburger ── */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setMobileDrawer(true)}
              aria-label="Open menu"
              sx={{ color: 'rgba(255,255,255,0.85)' }}
            >
              <MenuOutlined />
            </IconButton>
          )}

          {/* ─────────────────────────────────────────────────────────────────
           * LOGO
           * Replace the inner <Box> with your actual logo image:
           *
           *   <img
           *     src="/logo.svg"
           *     alt="SikshaNews"
           *     width={36}      ← icon size
           *     height={36}
           *   />
           *
           * Recommended logo formats:
           *   - Icon only    : 36×36px SVG
           *   - Full lockup  : 140×36px SVG (icon + wordmark)
           *   - PNG fallback : provide @2x (280×72px) for retina screens
           *
           * Placement: left edge of navbar, always visible.
           * ──────────────────────────────────────────────────────────────── */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              flexShrink: 0,
              mr: { md: 2 },
            }}
          >
            {/*
             * LOGO PLACEHOLDER — 36×36px
             * Background: teal gradient matching the brand palette.
             * Replace this entire <Box> with <img src="/logo.svg" ... />
             */}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3c6e71 0%, #5a9295 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                color: '#fff',
                letterSpacing: '-0.5px',
                flexShrink: 0,
                userSelect: 'none',
              }}
            >
              SN
            </Box>

            {/* Wordmark — hidden on xs, shown sm+ */}
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: { sm: '1.05rem', md: '1.1rem' },
                color: '#ffffff',
                letterSpacing: '-0.2px',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              SikshaNews
            </Typography>
          </Box>

          {/* ── Desktop primary nav ── */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, flex: 1 }}>
              {PRIMARY_NAV.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  size="small"
                  sx={{
                    color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.72)',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: '0.875rem',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: '7px',
                    backgroundColor: isActive(item.path)
                      ? 'rgba(255,255,255,0.13)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.09)',
                      color: '#fff',
                    },
                    transition: 'all 0.15s',
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* More dropdown trigger */}
              <Button
                size="small"
                endIcon={
                  <KeyboardArrowDownOutlined
                    sx={{
                      fontSize: '16px !important',
                      transition: 'transform 0.2s',
                      transform: Boolean(moreAnchor) ? 'rotate(180deg)' : 'none',
                    }}
                  />
                }
                onClick={(e) => setMoreAnchor(e.currentTarget)}
                sx={{
                  color: MORE_NAV.some((i) => isActive(i.path)) ? '#fff' : 'rgba(255,255,255,0.72)',
                  fontWeight: MORE_NAV.some((i) => isActive(i.path)) ? 600 : 400,
                  fontSize: '0.875rem',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '7px',
                  backgroundColor: MORE_NAV.some((i) => isActive(i.path))
                    ? 'rgba(255,255,255,0.13)'
                    : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.09)', color: '#fff' },
                  transition: 'all 0.15s',
                }}
              >
                More
              </Button>

              {/* More menu */}
              <Menu
                anchorEl={moreAnchor}
                open={Boolean(moreAnchor)}
                onClose={() => setMoreAnchor(null)}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 0.5,
                    minWidth: 210,
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
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
                      color: 'text.primary',
                      '&.Mui-selected': {
                        color: 'secondary.main',
                        fontWeight: 600,
                        bgcolor: 'background.default',
                      },
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

          {/* Spacer on mobile */}
          <Box sx={{ flex: 1, display: { md: 'none' } }} />

          {/* ── Filter / Sidebar toggle ──
           * This button opens the collapsible filter/categories drawer.
           * Only shown when onFilterToggle is provided (i.e. on pages with filterable content).
           */}
          {onFilterToggle && (
            <Tooltip title={filterOpen ? 'Close filters' : 'Filters & categories'}>
              <IconButton
                onClick={onFilterToggle}
                aria-label="Toggle filters"
                sx={{
                  color: filterOpen ? 'secondary.light' : 'rgba(255,255,255,0.75)',
                  backgroundColor: filterOpen ? 'rgba(60,110,113,0.25)' : 'transparent',
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.09)', color: '#fff' },
                }}
              >
                <TuneOutlined />
              </IconButton>
            </Tooltip>
          )}

          {/* ── Search ── */}
          {searchOpen ? (
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(255,255,255,0.13)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.18)',
                px: 1.5,
                py: 0.25,
                minWidth: { xs: 160, sm: 240 },
              }}
            >
              <SearchOutlined sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, mr: 1 }} />
              <InputBase
                inputRef={searchRef}
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles…"
                sx={{
                  flex: 1,
                  color: '#fff',
                  fontSize: '0.875rem',
                  '& input::placeholder': { color: 'rgba(255,255,255,0.45)' },
                }}
              />
              <IconButton
                size="small"
                onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                sx={{ color: 'rgba(255,255,255,0.6)', p: 0.25 }}
              >
                <CloseOutlined fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Tooltip title="Search">
              <IconButton
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.09)' },
                }}
              >
                <SearchOutlined />
              </IconButton>
            </Tooltip>
          )}

          {/* ── Auth ── */}
          {isAuthenticated ? (
            <>
              <Tooltip title={user?.email ?? 'Account'}>
                <IconButton onClick={(e) => setUserAnchor(e.currentTarget)} sx={{ p: 0.5 }}>
                  <Avatar
                    sx={{
                      width: 32, height: 32,
                      bgcolor: 'secondary.main',
                      fontSize: '0.8rem', fontWeight: 700,
                    }}
                  >
                    {user?.email?.[0]?.toUpperCase() ?? 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={userAnchor}
                open={Boolean(userAnchor)}
                onClose={() => setUserAnchor(null)}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 0.5, minWidth: 190,
                    borderRadius: '10px',
                    border: '1px solid', borderColor: 'divider',
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="body2" fontWeight={600} color="text.primary" noWrap>
                    {user?.email}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.role?.replace('_', ' ')}
                  </Typography>
                </Box>
                <Divider />
                {isAdmin && (
                  <MenuItem
                    component={Link}
                    to="/admin"
                    onClick={() => setUserAnchor(null)}
                    sx={{ gap: 1.5, fontSize: '0.875rem', py: 1 }}
                  >
                    <DashboardOutlined fontSize="small" />
                    Admin Dashboard
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => { setUserAnchor(null); logout(); }}
                  sx={{ gap: 1.5, fontSize: '0.875rem', color: 'error.main', py: 1 }}
                >
                  <LogoutOutlined fontSize="small" />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="small"
              sx={{
                ml: 0.5,
                bgcolor: 'secondary.main',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.8125rem',
                px: 2,
                py: 0.625,
                borderRadius: '7px',
                flexShrink: 0,
                '&:hover': { bgcolor: 'secondary.dark' },
              }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* ════════════════════════════════════════════════════
       * MOBILE NAV DRAWER
       * Full nav for screens < md (960px)
       * ════════════════════════════════════════════════════ */}
      <Drawer
        anchor="left"
        open={mobileDrawer}
        onClose={() => setMobileDrawer(false)}
        PaperProps={{
          sx: {
            width: 272,
            backgroundColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/*
             * MOBILE DRAWER LOGO — 32×32px
             * Replace with: <img src="/logo.svg" alt="SikshaNews" width={32} height={32} />
             */}
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
            <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
              SikshaNews
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileDrawer(false)} sx={{ color: 'rgba(255,255,255,0.6)' }}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>

        {/* Nav links */}
        <List sx={{ px: 1, py: 1.5, flex: 1, overflowY: 'auto' }}>
          {ALL_NAV.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive(item.path)}
                onClick={() => setMobileDrawer(false)}
                sx={{
                  borderRadius: '8px',
                  gap: 1.5,
                  py: 0.875,
                  borderLeft: '3px solid',
                  borderLeftColor: isActive(item.path) ? 'secondary.main' : 'transparent',
                  '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.1)' },
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                <Box sx={{ color: isActive(item.path) ? 'secondary.light' : 'rgba(255,255,255,0.55)' }}>
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.72)',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2 }} />

        {/* Mobile auth section */}
        <Box sx={{ px: 2, py: 2, flexShrink: 0 }}>
          {isAuthenticated ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main', fontSize: '0.85rem', fontWeight: 700 }}>
                  {user?.email?.[0]?.toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} color="#fff" noWrap>
                    {user?.email}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    {user?.role?.replace('_', ' ')}
                  </Typography>
                </Box>
              </Box>
              {isAdmin && (
                <Button
                  fullWidth component={Link} to="/admin"
                  startIcon={<DashboardOutlined />}
                  onClick={() => setMobileDrawer(false)}
                  sx={{ mb: 0.75, justifyContent: 'flex-start', color: 'rgba(255,255,255,0.8)', textTransform: 'none', fontSize: '0.875rem' }}
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                fullWidth startIcon={<LogoutOutlined />}
                onClick={() => { setMobileDrawer(false); logout(); }}
                sx={{ justifyContent: 'flex-start', color: 'rgba(255,120,120,0.9)', textTransform: 'none', fontSize: '0.875rem' }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              fullWidth component={Link} to="/login" variant="contained"
              onClick={() => setMobileDrawer(false)}
              sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' }, textTransform: 'none', fontWeight: 600 }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
