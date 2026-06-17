import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Calendar, ArrowLeft, Heart, Loader2 } from 'lucide-react';
import { MovieService } from '../services/movie.service';
import { useMovieStore } from '../store/useMovieStore';
import type { MovieDetails as MovieDetailsType } from '../types';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore();
  const favorite = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await MovieService.getDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Kino tafsilotlarini yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return;
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3 text-muted">
        <Loader2 className="animate-spin text-primary" size={40} />
        <span className="text-sm">Film tafsilotlari yuklanmoqda...</span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-20 text-muted">
        <p className="text-lg font-medium">Film ma'lumotlari topilmadi 🎬</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary hover:underline flex items-center gap-2 mx-auto">
          <ArrowLeft size={16} /> Orqaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="relative -mt-6 min-h-screen pb-12 overflow-hidden">
      {/* Katta Orqa Fon Banneri (Backdrop) */}
      <div className="absolute inset-0 h-137.5 w-full z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-25 blur-xs"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Kontent qismi */}
      <div className="relative z-10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Chap tomon: Poster Rasm */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="aspect-2/3 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-950 max-w-sm mx-auto md:mx-0 w-full"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* O'ng tomon: Ma'lumotlar matni */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="md:col-span-2 space-y-6"
        >
          {/* Orqaga qaytish tugmasi */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted hover:text-white transition duration-200 bg-surface/40 backdrop-blur-md px-4 py-2 rounded-full border border-gray-800/80 w-fit"
          >
            <ArrowLeft size={16} /> Orqaga
          </button>

          {/* Sarlavha va Tagline */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">{movie.title}</h1>
            {movie.tagline && <p className="text-primary italic text-sm md:text-base font-medium">"{movie.tagline}"</p>}
          </div>

          {/* Mini Metadatolar (Yil, Davomiyligi, Reyting) */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1.5 bg-surface/80 px-3 py-1.5 rounded-xl border border-gray-800">
              <Calendar size={16} className="text-muted" />
              <span>{movie.releaseDate ? movie.releaseDate.split('-')[0] : 'Nomalum'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface/80 px-3 py-1.5 rounded-xl border border-gray-800">
              <Clock size={16} className="text-muted" />
              <span>{movie.runtime} daqiqa</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface/80 px-3 py-1.5 rounded-xl border border-gray-800">
              <Star size={16} className="text-accent fill-accent" />
              <span className="font-bold">{movie.voteAverage.toFixed(1)} / 10</span>
            </div>
          </div>

          {/* Janrlar */}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full tracking-wide"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Film qisqacha mazmuni */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-wide">Film Haqida</h3>
            <p className="text-muted text-sm md:text-base leading-relaxed max-w-3xl">
              {movie.overview || "Ushbu film uchun tavsif mavjud emas."}
            </p>
          </div>

          {/* Sevimlilarga qo'shish / O'chirish premium tugmasi */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleFavorite}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-bold shadow-lg border transition duration-300 ${
              favorite
                ? 'bg-transparent border-gray-700 text-white hover:bg-red-500/10 hover:border-red-500/40'
                : 'bg-primary border-primary text-white hover:bg-red-700'
            }`}
          >
            <Heart size={18} className={favorite ? 'fill-primary text-primary' : 'text-white'} />
            {favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          </motion.button>

        </motion.div>
      </div>
    </div>
  );
};