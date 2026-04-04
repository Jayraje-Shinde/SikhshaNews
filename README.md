# ScholarHub — Color Palette & MUI Usage Guide

> Recommended palette for an educational platform covering articles, research papers, collaborative opportunities, and funding.

---

## 1. Core Brand Colors

| Token Name | Hex | Description |
|---|---|---|
| `primary.main` | `#1e3a5f` | Deep Navy — primary brand color |
| `primary.dark` | `#284b63` | Dark Slate — hover / depth states |
| `primary.light` | `#2d5a8e` | Lighter navy — focus rings, highlights |
| `primary.contrastText` | `#ffffff` | White text on primary backgrounds |
| `secondary.main` | `#3c6e71` | Scholar Teal — accent, CTAs, links |
| `secondary.dark` | `#2d5457` | Darker teal — teal hover states |
| `secondary.light` | `#5a9295` | Lighter teal — teal chips, tags |
| `secondary.contrastText` | `#ffffff` | White text on teal backgrounds |

---

## 2. Semantic / Status Colors

| Token Name | Hex | Purpose |
|---|---|---|
| `success.main` | `#16a34a` | Funding open, published, verified |
| `success.light` | `#d1fae5` | Success badge backgrounds |
| `success.contrastText` | `#065f46` | Text on success light backgrounds |
| `warning.main` | `#d97706` | Deadlines, review pending, expiring soon |
| `warning.light` | `#fef3c7` | Warning badge backgrounds |
| `warning.contrastText` | `#92400e` | Text on warning light backgrounds |
| `error.main` | `#dc2626` | Errors, rejected submissions, urgent |
| `error.light` | `#fee2e2` | Error badge backgrounds |
| `error.contrastText` | `#991b1b` | Text on error light backgrounds |
| `info.main` | `#0284c7` | Collaboration, informational notices |
| `info.light` | `#e0f2fe` | Info badge backgrounds |
| `info.contrastText` | `#0c4a6e` | Text on info light backgrounds |

---

## 3. Neutral / Surface Colors

| Token Name | Hex | Description |
|---|---|---|
| `background.default` | `#f0f6f7` | Page background (teal-tinted, not generic grey) |
| `background.paper` | `#ffffff` | Cards, panels, modals, drawers |
| `background.subtle` | `#f1f5f9` | Zebra rows, secondary panels |
| `divider` | `#d9d9d9` | Dividers, borders, table rules |

---

## 4. Typography Colors

| Token Name | Hex | Usage |
|---|---|---|
| `text.primary` | `#0f172a` | Body text, headings |
| `text.secondary` | `#475569` | Subheadings, metadata, captions |
| `text.disabled` | `#94a3b8` | Placeholder text, muted labels |

---

## 5. MUI Theme Configuration

Paste this into your `theme.ts` / `theme.js` file:

```ts
import { createTheme } from '@mui/material/styles';

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
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: '#1e3a5f', fontWeight: 700 },
    h2: { color: '#1e3a5f', fontWeight: 600 },
    h3: { color: '#1e3a5f', fontWeight: 600 },
    h4: { color: '#284b63', fontWeight: 600 },
    h5: { color: '#284b63', fontWeight: 500 },
    h6: { color: '#284b63', fontWeight: 500 },
  },
});

export default theme;
```

---

## 6. Component-by-Component Usage Guide

---

### AppBar / Navbar

```tsx
<AppBar sx={{ backgroundColor: 'primary.main' }}>
```

- **Background:** `primary.main` (`#1e3a5f`) — deep navy anchors the platform visually
- **Logo & nav links:** `primary.contrastText` (`#ffffff`)
- **Active nav link underline or indicator:** `secondary.main` (`#3c6e71`) teal
- **"Post Paper" / primary CTA button in nav:** `secondary.main` with white text

> Why: The dark navy navbar signals authority and trust — essential for a research platform. The teal CTA pops against navy without being jarring.

---

### Hero / Banner Section

```tsx
<Box sx={{ backgroundColor: 'background.default' }}>
```

- **Section background:** `background.default` (`#f0f6f7`) — teal-tinted, feels intentional
- **Page title (H1):** `primary.main` (`#1e3a5f`)
- **Subtitle / tagline:** `text.secondary` (`#475569`)
- **Primary CTA button:** `variant="contained" color="primary"` → navy fill
- **Secondary CTA button:** `variant="outlined" color="primary"` → navy outline

---

### Cards (Articles, Papers, Funding, Collaboration)

```tsx
<Card sx={{ backgroundColor: 'background.paper', border: '0.5px solid', borderColor: 'divider' }}>
```

- **Card background:** `background.paper` (`#ffffff`)
- **Card border:** `divider` (`#d9d9d9`)
- **Card title:** `text.primary` (`#0f172a`)
- **Author / date / metadata line:** `text.secondary` (`#475569`)
- **"Read more" / action link:** `secondary.main` (`#3c6e71`) teal
- **Hover state:** subtle `box-shadow`, border shifts to `primary.light`

---

### Chips & Badges (Content Type Labels)

Use MUI `<Chip>` with custom `sx` based on content type:

| Content Type | Background | Text Color | MUI Color Prop |
|---|---|---|---|
| Funding Open | `success.light` `#d1fae5` | `success.contrastText` `#065f46` | `color="success"` |
| Deadline Soon | `warning.light` `#fef3c7` | `warning.contrastText` `#92400e` | `color="warning"` |
| Collaboration | `info.light` `#e0f2fe` | `info.contrastText` `#0c4a6e` | `color="info"` |
| Article | `#e8f0fe` (custom) | `#1e3a5f` | custom `sx` |
| Peer Review | `#f0f6f7` (custom) | `#284b63` | custom `sx` |
| Published | `success.light` | `success.contrastText` | `color="success"` |
| Urgent / Closed | `error.light` | `error.contrastText` | `color="error"` |

```tsx
// Example
<Chip label="Funding Open" color="success" size="small" variant="filled" />
<Chip label="Deadline Soon" color="warning" size="small" variant="filled" />
```

---

### Buttons

| Use Case | Variant | Color | Notes |
|---|---|---|---|
| Primary action (Submit paper, Apply) | `contained` | `primary` | Navy fill |
| Secondary action (Browse, Explore) | `outlined` | `primary` | Navy outline |
| Accent CTA (Post Paper, Connect) | `contained` | `secondary` | Teal fill |
| Destructive (Delete, Withdraw) | `contained` | `error` | Red fill |
| Subtle / ghost (Cancel, Skip) | `text` | `primary` | No border |

---

### Sidebar / Drawer Navigation

```tsx
<Drawer sx={{ '& .MuiDrawer-paper': { backgroundColor: 'primary.main' } }}>
```

- **Background:** `primary.main` (`#1e3a5f`) — matches the navbar for visual continuity
- **Nav item text:** `rgba(255,255,255,0.75)`
- **Active nav item background:** `primary.dark` (`#284b63`)
- **Active nav item left border accent:** `secondary.main` (`#3c6e71`) teal, 3px
- **Section headings in sidebar:** `rgba(255,255,255,0.45)`, uppercase, 11px

---

### Data Tables (Papers, Funding Lists)

```tsx
<TableContainer sx={{ backgroundColor: 'background.paper' }}>
<TableHead sx={{ backgroundColor: 'background.default' }}>
```

- **Table background:** `background.paper` (`#ffffff`)
- **Header row background:** `background.default` (`#f0f6f7`)
- **Header text:** `text.primary` weight 600
- **Row dividers:** `divider` (`#d9d9d9`)
- **Zebra even rows:** `background.subtle` (`#f1f5f9`)
- **Hover row:** `rgba(30, 58, 95, 0.04)` — very faint navy tint
- **Sorted column header:** `secondary.main` teal underline

---

### Search Bar & Filters

```tsx
<TextField sx={{
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': { borderColor: 'secondary.main' },
    '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
  }
}} />
```

- **Default border:** `divider` (`#d9d9d9`)
- **Hover / focus border:** `secondary.main` (`#3c6e71`) teal
- **Search icon:** `text.secondary`
- **Filter chip (active):** `secondary.main` fill, white text
- **Filter chip (inactive):** `background.default` fill, `text.secondary` text

---

### Alerts & Notifications

```tsx
<Alert severity="success">Funding application submitted successfully.</Alert>
<Alert severity="warning">Submission deadline in 3 days.</Alert>
<Alert severity="error">Your paper was not accepted for this cycle.</Alert>
<Alert severity="info">2 researchers want to collaborate on your paper.</Alert>
```

MUI's `severity` prop maps automatically to your palette:

| Severity | Background | Icon & Text |
|---|---|---|
| `success` | `success.light` | `success.main` |
| `warning` | `warning.light` | `warning.main` |
| `error` | `error.light` | `error.main` |
| `info` | `info.light` | `info.main` |

---

### Avatar / User Profile

- **Default avatar background:** `primary.light` (`#2d5a8e`)
- **Initials text:** `#ffffff`
- **Online indicator dot:** `success.main` (`#16a34a`)
- **Verified researcher badge:** `secondary.main` teal icon

---

### Tabs (Article categories, Paper sections)

```tsx
<Tabs
  sx={{
    '& .MuiTab-root': { color: 'text.secondary' },
    '& .Mui-selected': { color: 'secondary.main' },
    '& .MuiTabs-indicator': { backgroundColor: 'secondary.main' },
  }}
>
```

- **Inactive tab label:** `text.secondary` (`#475569`)
- **Active tab label:** `secondary.main` (`#3c6e71`)
- **Active tab underline indicator:** `secondary.main`

---

### Links (Inline, Article Body)

```tsx
<Link sx={{ color: 'secondary.main', '&:hover': { color: 'secondary.dark' } }}>
```

- **Default:** `secondary.main` (`#3c6e71`) teal
- **Hover:** `secondary.dark` (`#2d5457`)
- **Visited:** `primary.dark` (`#284b63`)

> Teal links are more distinctive and readable than standard blue on a background that already uses navy headings.

---

### Progress / Loading States

- **Linear / Circular progress:** `secondary.main` (`#3c6e71`)
- **Skeleton loading blocks:** `background.subtle` → shimmer toward `background.default`

---

### Footer

- **Background:** `primary.main` (`#1e3a5f`) — matches navbar for bookend symmetry
- **Link text:** `rgba(255,255,255,0.65)`
- **Link hover:** `#ffffff`
- **Divider line in footer:** `rgba(255,255,255,0.15)`
- **Copyright / legal text:** `rgba(255,255,255,0.4)`

---

## 7. Colors to Avoid

| Color | Reason |
|---|---|
| `#000000` pure black | Too harsh; kills the open, academic warmth |
| `#353535` near-black | Competes with navy; creates two fighting darks |
| `#0ea5e9` sky blue | Clashes with scholar teal; no role in this palette |
| `#1d4ed8` bright blue | Too generic / looks like a default MUI theme |
| Any neon or saturated accent | Undermines the credibility a research platform needs |

---

## 8. Quick Reference Card

```
Navigation & structure  →  primary.main   #1e3a5f  (navy)
Accent & CTAs           →  secondary.main #3c6e71  (teal)
Page background         →  #f0f6f7        (teal-tinted off-white)
Cards & surfaces        →  #ffffff        (white)
Body text               →  #0f172a        (near-black)
Metadata / captions     →  #475569        (slate)
Funding / success       →  #16a34a        (green)
Deadlines / warnings    →  #d97706        (amber)
Errors / urgent         →  #dc2626        (red)
Collaboration / info    →  #0284c7        (sky blue)
Borders & dividers      →  #d9d9d9        (light grey)
```

---

*Generated for ScholarHub — Educational Research Platform*)
```
