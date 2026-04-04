import {
  Box, Container, Typography, TextField, Button,
  Link as MuiLink, Divider, Alert, CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { subscribersApi } from '../../http/services';
import {
  ON_DARK_PRIMARY,
  ON_DARK_SECONDARY,
  ON_DARK_MUTED,
  ON_DARK_SUBTLE,
} from '../../theme/';

const FOOTER_LINKS = {
  Explore: [
    { label: 'Research Nexus',   path: '/research' },
    { label: 'Innovation Forge', path: '/innovation' },
    { label: 'EduSignal',        path: '/news' },
    { label: 'EduStart Stories', path: '/startups' },
  ],
  Resources: [
    { label: 'IPR Vault',          path: '/ipr' },
    { label: 'CollabSphere',       path: '/collaboration' },
    { label: 'GrantSphere',        path: '/funding' },
    { label: 'Voices of Academia', path: '/insights' },
  ],
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function Footer() {
  const [email, setEmail]           = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: () => subscribersApi.subscribe(email),
    onSuccess: () => { setSubscribed(true); setEmail(''); setEmailError(''); },
    onError:   () => { setEmailError('Something went wrong. Please try again.'); },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');
    if (!email.trim())               { setEmailError('Please enter your email address.'); return; }
    if (!isValidEmail(email.trim())) { setEmailError('Please enter a valid email address.'); return; }
    subscribe();
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>

        {/*
         * Layout: flex row on desktop, column on mobile.
         * No MUI Grid used — avoids v7 breaking change entirely.
         */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 3 },
          }}
        >
          {/* ── Brand + Newsletter ── */}
          <Box sx={{ flex: { md: '0 0 320px' }, maxWidth: { md: 320 } }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                color: ON_DARK_PRIMARY,
                fontSize: '1.1rem',
                mb: 1.25,
              }}
            >
              SikshaNews
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: ON_DARK_SECONDARY, lineHeight: 1.8, maxWidth: 280, mb: 2.5 }}
            >
              The academic pulse of India — connecting researchers, institutions,
              and innovators through knowledge.
            </Typography>

            {subscribed ? (
              <Alert
                severity="success"
                sx={{
                  bgcolor: 'rgba(22,163,74,0.15)',
                  color: '#86efac',
                  border: '1px solid rgba(22,163,74,0.3)',
                  borderRadius: 2,
                  '& .MuiAlert-icon': { color: '#86efac' },
                  fontSize: '0.8rem',
                }}
              >
                You're subscribed! We'll notify you of new articles.
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Typography
                  variant="caption"
                  sx={{ color: ON_DARK_MUTED, display: 'block', mb: 1, letterSpacing: 0.5 }}
                >
                  Get notified of new articles
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TextField
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="your@email.com"
                    size="small"
                    error={!!emailError}
                    helperText={emailError}
                    disabled={isPending}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: ON_DARK_PRIMARY,
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
                        '&:hover fieldset': { borderColor: ON_DARK_MUTED },
                        '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
                        '&.Mui-error fieldset': { borderColor: 'error.main' },
                      },
                      '& input::placeholder': { color: ON_DARK_MUTED, opacity: 1 },
                      '& .MuiFormHelperText-root': { color: '#fca5a5', ml: 0 },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    sx={{
                      bgcolor: 'secondary.main',
                      color: '#ffffff',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      py: 0.875,
                      '&:hover': { bgcolor: 'secondary.dark' },
                      '&.Mui-disabled': { bgcolor: 'rgba(60,110,113,0.4)', color: ON_DARK_MUTED },
                    }}
                  >
                    {isPending ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={14} sx={{ color: 'inherit' }} />
                        Subscribing…
                      </Box>
                    ) : 'Subscribe'}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          {/* ── Nav link columns ── */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 3, md: 4 },
            }}
          >
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <Box
                key={section}
                sx={{
                  flex: { xs: '0 0 calc(50% - 12px)', md: 1 },
                  minWidth: 120,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: ON_DARK_SUBTLE,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    fontWeight: 700,
                    display: 'block',
                    mb: 1.5,
                  }}
                >
                  {section}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.875 }}>
                  {links.map((link) => (
                    <MuiLink
                      key={link.path}
                      component={Link}
                      to={link.path}
                      underline="none"
                      sx={{
                        color: ON_DARK_SECONDARY,
                        fontSize: '0.875rem',
                        transition: 'color 0.15s',
                        '&:hover': { color: ON_DARK_PRIMARY },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" sx={{ color: ON_DARK_SUBTLE }}>
            © {new Date().getFullYear()} SikshaNews. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            {['Privacy Policy', 'Terms of Use'].map((label) => (
              <MuiLink
                key={label}
                href="#"
                underline="hover"
                sx={{ color: ON_DARK_SUBTLE, fontSize: '0.75rem', '&:hover': { color: ON_DARK_SECONDARY } }}
              >
                {label}
              </MuiLink>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;