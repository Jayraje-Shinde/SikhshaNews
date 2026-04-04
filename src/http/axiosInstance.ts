import axios from 'axios';

/**
 * Public API instance — reader site only.
 *
 * This is a plain getter — no JWT, no localStorage, no cookies.
 * The reader site is fully public. No authentication needed.
 *
 * For the admin panel (admin.yourdomain.com), a separate axios
 * instance will be built with httpOnly cookie support:
 *   withCredentials: true  →  sends cookies automatically
 *   No tokens in localStorage — more secure for admin operations
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// No request interceptor needed — all public endpoints, no token
// No 401 redirect needed — readers don't log in

// Light error logging only
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default api;