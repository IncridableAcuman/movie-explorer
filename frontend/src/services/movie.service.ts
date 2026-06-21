import axiosInstance from '../api/api';
import type { Movie, MovieDetails } from '../types';
import type { MovieVideo } from '../types/video';

export const MovieService = {
  // 1. Backenddan toifalar bo'yicha kinolarni olish (Masalan: popular, trending, top_rated)
  // Oldingi getTrending o'rniga backenddagi /categories endpointidan foydalanamiz
  getTrending: async (category: string = 'popular'): Promise<Movie[]> => {
    const { data } = await axiosInstance.get('/movies/categories', {
      params: { category }
    });
    // Backendingiz "movies" kaliti ichida ma'lumot qaytaradi
    return data.movies;
  },

  // 2. Backend orqali qidiruv tizimi
  searchMovies: async (query: string): Promise<Movie[]> => {
    const { data } = await axiosInstance.get('/movies/search', {
      params: { query },
    });
    return data.movies;
  },

  // 3. Film tafsilotlarini olish
  getDetails: async (id: string | number): Promise<MovieDetails> => {
    const { data } = await axiosInstance.get(`/movies/details/${id}`);
    return data.movies;
  },

  // 4. Filmning treyleri yoki videosini olish (Backendda borligi uchun qo'shib qo'ydik)
  getVideo: async (id: string | number): Promise<MovieVideo> => {
    const { data } = await axiosInstance.get(`/movies/video/${id}`);
    return data.movies;
  }
};