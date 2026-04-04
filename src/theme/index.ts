import { createTheme } from '@mui/material/styles';

/**
 * SikshaNews — MUI Theme
 * Primary  : Deep Navy   #1e3a5f
 * Secondary: Scholar Teal #3c6e71
 * Audience : Students & Researchers — clean, readable, content-first
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f',
      dark: '#284b63',
      light: '#2d5a8e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3c6e71',
      dark: '#2d5457',
      light: '#5a9295',
      contrastText: '#ffffff',
    },
    success: {
      main: '#16a34a',
      light: '#d1fae5',
      contrastText: '#065f46',
    },
    warning: {
      main: '#d97706',
      light: '#fef3c7',
      contrastText: '#92400e',
    },
    error: {
      main: '#dc2626',
      light: '#fee2e2',
      contrastText: '#991b1b',
    },
    info: {
      main: '#0284c7',
      light: '#e0f2fe',
      contrastText: '#0c4a6e',
    },
    background: {
      default: '#f0f6f7',
      paper: '#ffffff',
    },
    divider: '#d9d9d9',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
  },
  typography: {
    // DM Sans — clean, readable, academic feel
    fontFamily: '"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: '#1e3a5f', fontWeight: 700, lineHeight: 1.2 },
    h2: { color: '#1e3a5f', fontWeight: 600, lineHeight: 1.25 },
    h3: { color: '#1e3a5f', fontWeight: 600, lineHeight: 1.3 },
    h4: { color: '#284b63', fontWeight: 600, lineHeight: 1.35 },
    h5: { color: '#284b63', fontWeight: 500, lineHeight: 1.4 },
    h6: { color: '#284b63', fontWeight: 500, lineHeight: 1.5 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.65 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500, borderRadius: 8 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0 1px 0 rgba(0,0,0,0.08)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, fontSize: '0.75rem' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #e8ecef',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRadius: 0 },
      },
    },
  },
});

export default theme;
