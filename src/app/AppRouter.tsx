import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout';
import PageSkeleton from '../components/common/PageSkeleton';

// ── Public pages — lazy loaded (separate JS chunks per page) ─
const Home        = lazy(() => import('../pages/home/'));
const Research    = lazy(() => import('../pages/research/'));
const Innovation  = lazy(() => import('../pages/innovation/'));
const News        = lazy(() => import('../pages/news/'));
const Startups    = lazy(() => import('../pages/startups/'));
const IPR         = lazy(() => import('../pages/ipr/'));
const Collab      = lazy(() => import('../pages/collaboration/'));
const Funding     = lazy(() => import('../pages/funding/'));
const Insights    = lazy(() => import('../pages/insights/'));

// ── Auth pages ───────────────────────────────────────────
const Login = lazy(() => import('../pages/login/'));

// ── Admin — completely separate chunk, never sent to public users ─
const AdminDashboard = lazy(() => import('../pages/admin/'));

const AppRouter = () => (
  <Suspense fallback={<PageSkeleton />}>
    <Routes>
      {/* All public pages share PublicLayout (Navbar + Footer) */}
      <Route element={<PublicLayout />}>
        <Route index              element={<Home />} />
        <Route path="research"        element={<Research />} />
        <Route path="innovation"      element={<Innovation />} />
        <Route path="news"            element={<News />} />
        <Route path="startups"        element={<Startups />} />
        <Route path="ipr"             element={<IPR />} />
        <Route path="collaboration"   element={<Collab />} />
        <Route path="funding"         element={<Funding />} />
        <Route path="insights"        element={<Insights />} />
      </Route>

      {/* Login — standalone, no layout */}
      <Route path="login"   element={<Login />} />

      {/* Admin — own layout, role-protected */}
      <Route path="admin/*" element={<AdminDashboard />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRouter;
