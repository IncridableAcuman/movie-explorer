import { create } from 'zustand';
import type { Movie } from '../types';
import { toast } from 'react-hot-toast';

interface MovieState {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  // LocalStorage'dan boshlang'ich qiymatni o'qish
  favorites: JSON.parse(localStorage.getItem('movie_favorites') || '[]'),

  addToFavorites: (movie) => {
    const { favorites } = get();
    if (!favorites.some((m) => m.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem('movie_favorites', JSON.stringify(updatedFavorites));
      set({ favorites: updatedFavorites });
      toast.success(`"${movie.title}" sevimlilarga qo'shildi! 🌟`);
    }
  },

  removeFromFavorites: (movieId) => {
    const { favorites } = get();
    const updatedFavorites = favorites.filter((m) => m.id !== movieId);
    localStorage.setItem('movie_favorites', JSON.stringify(updatedFavorites));
    set({ favorites: updatedFavorites });
    toast.error("Sevimlilardan olib tashlandi.");
  },

  isFavorite: (movieId) => {
    return get().favorites.some((m) => m.id === movieId);
  },
}));