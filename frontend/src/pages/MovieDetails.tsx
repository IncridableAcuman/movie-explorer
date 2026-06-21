import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Calendar, ArrowLeft, X } from 'lucide-react';
import type { MovieDetails } from '../types';
import { MovieService } from '../services/movie.service';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false); // Modal oynasi holati

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // Film tafsilotlari va video kalitini parallel ravishda chaqiramiz
        const [detailsData, videoData] = await Promise.all([
          MovieService.getDetails(id),
          MovieService.getVideo(id)
        ]);
        
        setMovie(detailsData);
        setVideoKey(videoData?.youtubeKey || null);
      } catch (error) {
        console.error("Film ma'lumotlarini yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-lg">Film topilmadi.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-4">
      {/* Orqaga qaytish tugmasi */}
      <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-white mb-6 transition duration-200">
        <ArrowLeft size={18} />
        <span>Orqaga qaytish</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Poster qismi */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm mx-auto lg:mx-0 aspect-2/3 bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800/60"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Ma'lumotlar qismi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex flex-col justify-center"
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{movie.title}</h1>
          
          {/* Mini Ma'lumotlar paneli */}
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-300 mb-6 bg-surface/30 p-3 rounded-xl border border-gray-900 w-fit">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-accent fill-accent" />
              <span className="font-bold">{movie.voteAverage?.toFixed(1) || movie.vote_average?.toFixed(1)}</span>
            </div>
            <span className="text-gray-700">|</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-primary" />
              <span>{movie.releaseDate || movie.release_date}</span>
            </div>
          </div>

          <p className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-3xl">
            {movie.overview}
          </p>

          {/* Treyler ko'rish tugmasi */}
          {videoKey ? (
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/20 transition duration-300 w-full sm:w-fit active:scale-95"
            >
              <Play size={20} className="fill-white" />
              <span>Treylerni Ko'rish</span>
            </button>
          ) : (
            <div className="text-sm text-muted bg-gray-900/40 px-4 py-3 rounded-xl border border-gray-800/50 w-fit">
              Ushbu film uchun rasmiy video treyler topilmadi.
            </div>
          )}
        </motion.div>
      </div>

      {/* SILLIQ ANIMATSIYALI YOUTUBE PLETER MODAL OYNASI */}
      <AnimatePresence>
        {isVideoOpen && videoKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Modal yopilishini ta'minlovchi fon */}
            <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)} />

            {/* Modal Kontenti */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 z-10"
            >
              {/* Yopish tugmasi */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/60 backdrop-blur-md border border-gray-700/50 text-white hover:bg-primary transition duration-200 z-20"
              >
                <X size={20} />
              </button>

              {/* YouTube Iframe Player */}
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&modestbranding=1&rel=0`}
                title={`${movie.title} Official Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};