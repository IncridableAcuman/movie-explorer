import { api } from '../api/api';
import type { Movie, MovieDetails } from '../types';

export const MovieService = {
  // 1. Trending filmlarni olish
  getTrending: async (): Promise<Movie[]> => {
    const { data } = await api.get('/trending/movie/day');
    return data.results;
  },

  // 2. Kino qidirish
  searchMovies: async (query: string): Promise<Movie[]> => {
    const { data } = await api.get('/search/movie', {
      params: { query },
    });
    return data.results;
  },

  // 3. Film tafsilotlarini olish
  getDetails: async (id: string | number): Promise<MovieDetails> => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  },
};