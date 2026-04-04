import api from './axiosInstance';
import type { PaginatedResponse, Post, Comment, Category } from '../utils/types';

// ── Posts ─────────────────────────────────────────────────
export const postsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get<PaginatedResponse<Post>>('/posts', { params }).then((r) => r.data),

  getBySlug: (slug: string) =>
    api.get<Post>(`/posts/${slug}`).then((r) => r.data),

  getFeatured: () =>
    api.get<Post[]>('/posts/featured').then((r) => r.data),

  getTrending: () =>
    api.get<Post[]>('/posts/trending').then((r) => r.data),

  getPinned: () =>
    api.get<Post[]>('/posts/pinned').then((r) => r.data),

  getToday: () =>
    api.get<Post[]>('/posts/today').then((r) => r.data),

  getMostCommented: () =>
    api.get<Post[]>('/posts/most-commented').then((r) => r.data),

  // Fires silently on article open — no await needed in component
  incrementView: (postId: string) =>
    api.patch(`/posts/${postId}/view`).catch(() => { /* fail silently */ }),
};

// ── Comments — public read + anonymous post ───────────────
export const commentsApi = {
  getByPost: (postId: string) =>
    api.get<Comment[]>(`/posts/${postId}/comments`).then((r) => r.data),

  // Anonymous comment — backend assigns guest name from IP
  create: (postId: string, body: string) =>
    api
      .post<{ guestName: string; message: string }>(`/posts/${postId}/comments`, { body })
      .then((r) => r.data),
};

// ── Categories ────────────────────────────────────────────
export const categoriesApi = {
  getAll: () => api.get<Category[]>('/categories').then((r) => r.data),
};

// ── Newsletter subscription ───────────────────────────────
export const subscribersApi = {
  subscribe: (email: string) =>
    api.post<{ message: string }>('/subscribe', { email }).then((r) => r.data),
};