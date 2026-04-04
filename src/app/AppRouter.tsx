import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout';
import PageSkeleton from '../components/common/PageSkeleton';

/**
 * Reader site routes — fully public, no auth.
 *
 * Admin panel lives at admin.yourdomain.com (separate project).
 * All pages here are lazy loaded — Vite splits them into separate
 * JS chunks so readers never download code they don't visit.
 */

const Home        = lazy(() => import('../pages/home/'));
const Research    = lazy(() => import('../pages/research/'));
const Innovation  = lazy(() => import('../pages/innovation/'));
const News        = lazy(() => import('../pages/news/'));
const Startups    = lazy(() => import('../pages/startups/'));
const IPR         = lazy(() => import('../pages/ipr/'));
const Collab      = lazy(() => import('../pages/collaboration/'));
const Funding     = lazy(() => import('../pages/funding/'));
const Insights    = lazy(() => import('../pages/insights/'));

const AppRouter = () => (
  <Suspense fallback={<PageSkeleton />}>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index                element={<Home />} />
        <Route path="research"      element={<Research />} />
        <Route path="innovation"    element={<Innovation />} />
        <Route path="news"          element={<News />} />
        <Route path="startups"      element={<Startups />} />
        <Route path="ipr"           element={<IPR />} />
        <Route path="collaboration" element={<Collab />} />
        <Route path="funding"       element={<Funding />} />
        <Route path="insights"      element={<Insights />} />
      </Route>

      {/* Catch-all → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRouter;