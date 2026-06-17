import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Film, Loader2 } from 'lucide-react';
import { MovieService } from '../services/movie.service';
import { MovieCard } from '../components/MovieCard';
import { useDebounce } from '../hooks/useDebounce';
import type { Movie } from '../types';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 600);



  useEffect(() => {
      // Kinolarni yuklash funksiyasi
  const fetchMovies = async () => {
    setLoading(true);
    try {
      if (debouncedSearch.trim()) {
        setIsSearching(true);
        const results = await MovieService.searchMovies(debouncedSearch);
        setMovies(results || []);
      } else {
        setIsSearching(false);
        const trending = await MovieService.getTrending();
        setMovies(trending || []);
      }
    } catch (error) {
      console.error("Kinolarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
    fetchMovies();
  }, [debouncedSearch]);

  return (
    <div className="space-y-10">
      {/* Hero & Qidiruv bo'limi */}
      <div className="text-center max-w-2xl mx-auto space-y-6 pt-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-white via-gray-300 to-muted bg-clip-text text-transparent"
        >
          Cheksiz Kinolar Dunyosiga Sho'ng'ing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm md:text-base"
        >
          Millionlab filmlar, sarguzashtlar va tahlillar. O'z sevimli filmingizni hoziroq toping.
        </motion.p>

        {/* Qidiruv Inputi */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-xl mx-auto group"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kino nomini yozing..."
            className="w-full bg-surface/80 border border-gray-800 focus:border-primary rounded-full pl-12 pr-6 py-3.5 text-sm text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm transition-all"
          />
        </motion.div>
      </div>

      {/* Sarlavha qismi (Trending yoki Qidiruv Natijalari) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-800/60 pb-3">
          <Film size={20} className="text-primary" />
          <h2 className="text-xl font-bold tracking-wide">
            {isSearching ? `"${searchQuery}" bo'yicha natijalar` : 'Bugungi Trending Filmlar'}
          </h2>
        </div>

        {/* Loading va Grid qismi */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted">
            <Loader2 className="animate-spin text-primary" size={36} />
            <span className="text-sm">Filmlar yuklanmoqda...</span>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, transform: 'scale(0.9)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  exit={{ opacity: 0, transform: 'scale(0.9)' }}
                  transition={{ duration: 0.2 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Hech narsa topilmaganda */}
        {!loading && movies.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p className="text-lg font-medium">Afsuski, hech qanday film topilmadi 🎬</p>
            <p className="text-sm mt-1">Boshqa kalit so'zlardan foydalanib ko'ring.</p>
          </div>
        )}
      </div>
    </div>
  );
};