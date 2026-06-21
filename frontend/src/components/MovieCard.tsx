import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import type { Movie } from '../types';
import { useMovieStore } from '../store/useMovieStore';
import { Link } from 'react-router-dom'; // 1. Link import qilindi

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // 2. Muhim: Kartochka (Link) bosilib, details sahifasiga o'tib ketmasligi uchun!
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    // 3. Butun kartochka Link bilan o'raldi va dinamik id berildi
    <Link to={`/movie/${movie.id}`} className="block">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-surface rounded-2xl overflow-hidden shadow-lg border border-gray-800/50 group relative cursor-pointer"
      >
        {/* Rasm qismi */}
        <div className="relative aspect-2/3 overflow-hidden bg-gray-950">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80" />

          {/* Sevimlilar Tugmasi */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-background/60 backdrop-blur-md border border-gray-700/50 text-white hover:bg-primary transition duration-300 z-10"
          >
            <Heart size={18} className={favorite ? 'fill-primary text-primary' : 'text-white'} />
          </button>

          {/* Reyting */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gray-750">
            <Star size={14} className="text-accent fill-accent" />
            <span className="text-xs font-bold text-white">{movie.voteAverage}</span>
          </div>
        </div>

        {/* Matn qismi */}
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition duration-350">
            {movie.title}
          </h3>
          <p className="text-xs text-muted mt-1">{movie.releaseDate ? movie.releaseDate.split('-')[0] : 'Nomalum'}</p>
        </div>
      </motion.div>
    </Link>
  );
};