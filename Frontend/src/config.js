// Centralized API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://booknest-backend-zeve.onrender.com';

export const getImageUrl = (pathOrUrl) => {
  if (typeof pathOrUrl !== 'string' || pathOrUrl.trim() === '') return null;
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  if (pathOrUrl.startsWith('/uploads')) return `${API_URL}${pathOrUrl}`;
  return `${API_URL}/${pathOrUrl.replace(/^\//, '')}`;
};