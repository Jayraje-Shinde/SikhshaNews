import api from './axiosInstance';

// ── Newsletter subscription ───────────────────────────────
export const subscribersApi = {
  subscribe: (email: string) =>
    api.post<{ message: string }>('/public/subscriber', { email,"ipAddress": "192.168.1.1"}).then((r) => r.data),
};