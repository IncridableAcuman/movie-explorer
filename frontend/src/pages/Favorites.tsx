import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { useMovieStore } from '../store/useMovieStore';
import { MovieCard } from '../components/MovieCard';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const { favorites, removeFromFavorites } = useMovieStore();

  return (
    <div className="space-y-8">
      {/* Sahifa Sarlavhasi */}
      <div className="flex items-center gap-2 border-b border-gray-800/60 pb-3">
        <Heart size={22} className="text-primary fill-primary" />
        <h2 className="text-xl font-bold tracking-wide">Sizning Favoritlaringiz</h2>
        <span className="text-xs bg-gray-800 text-gray-400 px-2.5 py-0.5 rounded-full font-semibold">
          {favorites.length} ta film
        </span>
      </div>

      {/* Agar Hech qanday kino yo'q bo'lsa */}
      {favorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 text-muted space-y-4"
        >
          <p className="text-lg font-medium">Siz hali hech qanday film qo'shmadingiz 🍿</p>
          <p className="text-sm max-w-sm mx-auto">
            Bosh sahifaga o'tib, o'zingizga yoqqan kinolarni yurakcha tugmasini bosish orqali shu yerda saqlashingiz mumkin.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-primary border border-primary hover:bg-red-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition duration-300 shadow-md"
          >
            Kinolar qidirish
          </Link>
        </motion.div>
      ) : (
        /* Agar kinolar mavjud bo'lsa - Silliq Grid */
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {favorites.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 15 }}
                transition={{ duration: 0.25 }}
                className="relative group"
              >
                {/* Tayyor Kino kartochkamiz */}
                <MovieCard movie={movie} />

                {/* Tezkor o'chirish tugmasi (Kartochka ustida qo'shimcha element) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromFavorites(movie.id);
                  }}
                  className="absolute bottom-16 right-3 p-2 rounded-xl bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 shadow-lg border border-red-500/30 z-10"
                  title="Sevimlilardan o'chirish"
                >
                  <Trash2 size={15} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};