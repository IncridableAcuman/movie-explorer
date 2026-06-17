import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      {/* Navbar bu yerga keladi */}
      <nav className="h-16 border-b border-gray-800 bg-surface/50 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 justify-between">
        <span className="text-xl font-bold tracking-wider text-primary">MOVIE.EXPLORER</span>
        <div className="flex gap-6 text-sm text-muted">
          <span className="cursor-pointer hover:text-white transition">Kino Qidirish</span>
          <span className="cursor-pointer hover:text-white transition">Favoritlar</span>
        </div>
      </nav>

      {/* Silliq animatsiyali kontent qismi */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-6"
      >
        {children}
      </motion.main>
    </div>
  );
};