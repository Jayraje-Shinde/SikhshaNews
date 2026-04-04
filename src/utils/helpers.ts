import DOMPurify from 'dompurify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// ── Slug ──────────────────────────────────────────────────
export const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

// ── HTML Sanitization ─────────────────────────────────────
/**
 * Sanitizes Jodit-generated HTML before rendering.
 * Allows YouTube & Vimeo iframes — strips everything dangerous.
 * Always use this before dangerouslySetInnerHTML.
 */
export const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading'],
    ALLOWED_URI_REGEXP:
      /^(https?:\/\/(www\.(youtube|vimeo)\.com|player\.vimeo\.com|res\.cloudinary\.com))/,
  });

// ── Date Helpers ──────────────────────────────────────────
/** "2 hours ago" */
export const timeAgo = (date: string | Date): string => dayjs(date).fromNow();

/** "26 Mar 2026" */
export const formatDate = (date: string | Date): string =>
  dayjs(date).format('DD MMM YYYY');

/** "26 Mar 2026, 14:30" */
export const formatDateTime = (date: string | Date): string =>
  dayjs(date).format('DD MMM YYYY, HH:mm');

// ── Text ──────────────────────────────────────────────────
export const truncate = (text: string, max: number): string =>
  text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;

// ── Cloudinary ────────────────────────────────────────────
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD as string;

/**
 * Returns a Cloudinary URL with auto format + quality compression.
 * f_auto → serves WebP/AVIF to supporting browsers automatically.
 * q_auto → Cloudinary picks the best quality/size tradeoff.
 */
export const cloudinaryUrl = (publicId: string, width: number, height?: number): string => {
  const transforms = ['f_auto', 'q_auto', `w_${width}`, height ? `h_${height}` : null, 'c_fill']
    .filter(Boolean)
    .join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
};

/**
 * Tiny 20px blurred placeholder — ~200 bytes.
 * Show this while the full image loads for a smooth blur-to-sharp transition.
 */
export const cloudinaryBlur = (publicId: string): string =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_20,e_blur:1000,q_1/${publicId}`;

// ── Local Storage Cache ───────────────────────────────────
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // milliseconds
}

export const localCache = {
  set<T>(key: string, data: T, ttlMinutes = 10): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttlMinutes * 60_000,
      };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch {
      // localStorage full — fail silently, TanStack will still work
    }
  },

  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const entry: CacheEntry<T> = JSON.parse(raw);
      const expired = Date.now() - entry.timestamp > entry.ttl;
      if (expired) { localStorage.removeItem(key); return null; }
      return entry.data;
    } catch {
      return null;
    }
  },

  remove: (key: string) => localStorage.removeItem(key),
};

export const CACHE_KEYS = {
  FEATURED:   'sn:featured',
  TRENDING:   'sn:trending',
  CATEGORIES: 'sn:categories',
  PINNED:     'sn:pinned',
} as const;
