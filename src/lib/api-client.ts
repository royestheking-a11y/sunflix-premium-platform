// MongoDB Client Utility - Browser/Frontend Client
// Makes API calls to backend instead of direct DB access

import axios from 'axios';

// In production (Vercel), use relative URLs. In development, use explicit URL.
const API_URL = import.meta.env.PROD 
  ? '' // Use relative URLs in production (same domain)
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001');

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('sunflix-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  // Return the full axios response so callers can access response.data
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to login if we're on a protected route
      // Public routes (homepage, explore, video player) should not redirect
      const currentPath = window.location.pathname;
      const protectedRoutes = ['/admin', '/profile'];
      const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));
      
      // Clear auth data
      localStorage.removeItem('sunflix-token');
      localStorage.removeItem('sunflix-user');
      
      // Only redirect if on protected route
      if (isProtectedRoute) {
        window.location.href = '/login';
      }
      // For public routes, just reject the error without redirecting
    }
    return Promise.reject(error);
  }
);

export default apiClient;
