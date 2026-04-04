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

  incrementView: (postId: string) =>
    api.patch(`/posts/${postId}/view`),
};

// ── Comments ──────────────────────────────────────────────
export const commentsApi = {
  getByPost: (postId: string) =>
    api.get<Comment[]>(`/posts/${postId}/comments`).then((r) => r.data),

  create: (postId: string, body: string) =>
    api.post<{ guestName: string; message: string }>(
      `/posts/${postId}/comments`,
      { body }
    ).then((r) => r.data),
};

// ── Auth ──────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: { id: string; email: string; role: string } }>(
      '/auth/login',
      { email, password }
    ).then((r) => r.data),
};

// ── Categories ────────────────────────────────────────────
export const categoriesApi = {
  getAll: () =>
    api.get<Category[]>('/categories').then((r) => r.data),
};

// ── Newsletter ────────────────────────────────────────────
export const subscribersApi = {
  subscribe: (email: string) =>
    api.post<{ message: string }>('/subscribe', { email }).then((r) => r.data),
};

// ── Image upload (via Spring Boot → Cloudinary) ───────────
export const uploadApi = {
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post<{ url: string }>('/admin/upload-image', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },
};
