import {
	Box, Container, Typography, TextField, Button, Grid, Link as MuiLink, Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react'

const FOOTER_LINKS = {
	Explore: [
		{ label: 'Research Nexus', path: '/research' },
		{ label: 'Innovation Forge', path: '/innovation' },
		{ label: 'EduSignal', path: '/news' },
		{ label: 'EduStart Stories', path: '/startups' },
	],
	Resources: [
		{ label: 'IPR Vault', path: '/ipr' },
		{ label: 'CollabSphere', path: '/collaboration' },
		{ label: 'GrantSphere', path: '/funding' },
		{ label: 'Voices of Academia', path: '/insights' },
	],
};

function Footer() {
	const [email, setEmail] = useState<string>("");
	const handleSubmit = (e : any) => {
		e.preventDefault();
		if (!email.includes("@")) {
			alert("Enter a valid Email address");
			return;
		}
		//api call here top insert the mail
		console.log(email);
	}


	return (
		<Box
			component="footer"
			sx={{ bgcolor: 'primary.main', color: 'rgba(255,255,255,0.65)', mt: 'auto' }}
		>
			<Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
				<Grid container spacing={4}>

					{/* Brand */}
					<Grid item xs={12} md={4}>
						<Typography
							sx={{
								fontFamily: '"DM Sans", sans-serif',
								fontWeight: 700,
								color: '#fff',
								fontSize: '1.1rem',
								mb: 1.25,
							}}
						>
							SikshaNews
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 260 }}
						>
							The academic pulse of India — connecting researchers, institutions, and innovators through knowledge.
						</Typography>
					</Grid>

					{/* Link columns */}
					{Object.entries(FOOTER_LINKS).map(([section, links]) => (
						<Grid item xs={6} md={2} key={section}>
							<Typography
								variant="caption"
								sx={{
									color: 'rgba(255,255,255,0.35)',
									textTransform: 'uppercase',
									letterSpacing: 1.5,
									fontWeight: 600,
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
											color: 'rgba(255,255,255,0.6)',
											fontSize: '0.875rem',
											transition: 'color 0.15s',
											'&:hover': { color: '#fff' },
										}}
									>
										{link.label}
									</MuiLink>
								))}
							</Box>
						</Grid>
					))}

					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							width: 300,
						}}
					>
						<TextField
							label="Email"
							variant="filled"
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							sx={{
								backgroundColor: "#fff",
								borderRadius: "12px",
								"& .MuiFilledInput-root": {
									borderRadius: "20px",
									backgroundColor: "#fff",
								},
							}}
						/>

						<Button
							type="submit"
							variant="contained"
							sx={{
								bgcolor: "#B6B6B6",
								borderRadius: "12px",
								textTransform: "none",
								"&:hover": {
									bgcolor: "#f5f5f5",
									color: "#000"
								}
							}}
						>
							Subscribe
						</Button>
					</Box>
				</Grid>

				<Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
					<Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
						© {new Date().getFullYear()} SikshaNews. All rights reserved.
					</Typography>
					<Box sx={{ display: 'flex', gap: 2.5 }}>
						{['Privacy Policy', 'Terms of Use'].map((label) => (
							<MuiLink
								key={label}
								href="#"
								underline="hover"
								sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', '&:hover': { color: 'rgba(255,255,255,0.6)' } }}
							>
								{label}
							</MuiLink>
						))}
					</Box>
				</Box>
			</Container>
		</Box>
	)
};

export default Footer;
