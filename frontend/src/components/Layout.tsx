import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Film, Heart, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore'; // AuthStore qo'shildi

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuth, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      <nav className="h-16 border-b border-gray-900 bg-surface/60 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 md:px-12 justify-between">
        <Link to="/" className="text-xl font-black tracking-wider text-primary flex items-center gap-2">
          <span className="bg-primary text-white p-1.5 rounded-lg text-xs font-bold tracking-tight">ME</span>
          MOVIE.EXPLORER
        </Link>
        
        {isAuth && (
          <div className="flex gap-6 text-sm font-medium items-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => `flex items-center gap-1.5 transition duration-200 ${isActive ? 'text-white font-bold' : 'text-muted hover:text-white'}`}
            >
              <Film size={16} />
              <span className="hidden sm:inline">Kino Qidirish</span>
            </NavLink>

            <NavLink 
              to="/favorites" 
              className={({ isActive }) => `flex items-center gap-1.5 transition duration-200 ${isActive ? 'text-white font-bold' : 'text-muted hover:text-white'}`}
            >
              <Heart size={16} />
              <span className="hidden sm:inline">Favoritlar</span>
            </NavLink>

            {/* Profil va Logout bo'limi */}
            <div className="flex items-center gap-4 border-l border-gray-800 pl-4 ml-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-300 bg-gray-800/40 px-2.5 py-1 rounded-lg">
                <User size={14} className="text-primary" />
                <span className="font-semibold max-w-20 truncate">{user?.username}</span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="text-muted hover:text-primary transition duration-200"
                title="Tizimdan chiqish"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}
      </nav>

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-8"
      >
        {children}
      </motion.main>
    </div>
  );
};