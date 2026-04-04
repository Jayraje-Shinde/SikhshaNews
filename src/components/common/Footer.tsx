import {
  Box, Container, Typography, TextField, Button,
  Grid, Link as MuiLink, Divider, Alert, CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { subscribersApi } from '../../http/services';

// Import contrast-safe colors from theme
// These are verified to pass 4.5:1 on the navy #1e3a5f background
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
  const [email, setEmail]         = useState('');
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
    if (!email.trim())             { setEmailError('Please enter your email address.'); return; }
    if (!isValidEmail(email.trim())) { setEmailError('Please enter a valid email address.'); return; }
	 console.log(email)
    subscribe();
  };

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'primary.main', mt: 'auto' }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={4}>

          {/* ── Brand + Newsletter ── */}
          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                color: ON_DARK_PRIMARY,        // #ffffff — 10.5:1 ✅
                fontSize: '1.1rem',
                mb: 1.25,
              }}
            >
              SikshaNews
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: ON_DARK_SECONDARY,      // #c8dde8 — 6.1:1 ✅ (was 0.5 opacity = failing)
                lineHeight: 1.8,
                maxWidth: 260,
                mb: 2.5,
              }}
            >
              The academic pulse of India — connecting researchers, institutions, and innovators through knowledge.
            </Typography>

            {/* Newsletter form */}
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
                  sx={{
                    color: ON_DARK_MUTED,      // #9bbdd0 — 4.6:1 ✅ (was 0.45 opacity = borderline)
                    display: 'block',
                    mb: 1,
                    letterSpacing: 0.5,
                  }}
                >
                  Get notified of new articles
                </Typography>

               
              </Box>
            )}
          </Grid>

          {/* ── Nav link columns ── */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <Grid item xs={6} md={2} key={section}>
              <Typography
                variant="caption"
                sx={{
                  color: ON_DARK_SUBTLE,         // #7fa8c4 — 4.6:1 ✅ (was 0.35 opacity = 3.7:1 FAIL)
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  fontWeight: 700,               // bold helps at this small size
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
                      color: ON_DARK_SECONDARY,  // #c8dde8 — 6.1:1 ✅ (was 0.6 opacity = 4.1:1 FAIL)
                      fontSize: '0.875rem',
                      transition: 'color 0.15s',
                      '&:hover': { color: ON_DARK_PRIMARY },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Box>
            </Grid>
          ))}


			  <form onSubmit={handleSubmit}>
			  <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
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
                      // Placeholder contrast: #9bbdd0 on rgba(255,255,255,0.08)+navy ≈ 4.5:1 ✅
                      '& input::placeholder': { color: ON_DARK_MUTED, opacity: 1 },
                      '& .MuiFormHelperText-root': { color: '#fca5a5', ml: 0 },
                    }}
                  />

                  <Button
						
                    type="submit"
                    variant="contained"
                    disabled={isPending}
                    sx={{
                      bgcolor: 'secondary.main',   // #3c6e71
                      color: '#ffffff',             // 5.1:1 on teal ✅
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,              // bold helps contrast ratio at borderline sizes
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
                      </Box><form action="">
                    ) : 'Subscribe'}
                  </Button>
                </Box>
				</form>
        </Grid>

		  

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          {/* Copyright — was 0.3 opacity = 3.2:1 FAIL */}
          <Typography
            variant="caption"
            sx={{ color: ON_DARK_SUBTLE }}       // #7fa8c4 — 4.6:1 ✅
          >
            © {new Date().getFullYear()} SikshaNews. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2.5 }}>
            {['Privacy Policy', 'Terms of Use'].map((label) => (
              <MuiLink
                key={label}
                href="#"
                underline="hover"
                sx={{
                  color: ON_DARK_SUBTLE,         // #7fa8c4 — 4.6:1 ✅ (was 0.3 opacity = FAIL)
                  fontSize: '0.75rem',
                  '&:hover': { color: ON_DARK_SECONDARY },
                }}
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