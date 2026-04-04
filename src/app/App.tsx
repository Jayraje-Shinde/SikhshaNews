import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '../theme/';
import { AuthProvider } from './AuthContext';
import AppRouter from './AppRouter';

/**
 * QueryClient global config.
 * staleTime: 2 min default — override per-query where needed.
 * retry: 1 — only retry failed requests once, not 3 times.
 * refetchOnWindowFocus: false — don't refetch on tab switch (news doesn't change that fast).
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
