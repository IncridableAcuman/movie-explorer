import axios from 'axios';

// Agar TMDB ishlatilsa, VITE_API_URL va VITE_API_TOKEN .env faylda bo'ladi
const API_URL = import.meta.env.VITE_API_URL || 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
  withCredentials: true, // Backend kuki (session/refresh token) bilan ishlashi uchun
});

// So'rovlarni tutish (Interceptors) - xatoliklar bilan ishlash uchun
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || 'Xatolik yuz berdi';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);