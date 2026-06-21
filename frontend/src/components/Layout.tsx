import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Film, Heart, LogOut, User, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuth, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobil menyu holati

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      
      {/* Navbar Container */}
      <nav className="h-16 border-b border-gray-900 bg-surface/60 backdrop-blur-md sticky top-0 z-50 flex items-center px-4 md:px-12 justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-black tracking-wider text-primary flex items-center gap-2 z-50">
          <span className="bg-primary text-white p-1.5 rounded-lg text-xs font-bold tracking-tight">ME</span>
          MOVIE.EXPLORER
        </Link>
        
        {/* DESKTOP NAVIGATION (Katta ekranlar uchun) */}
        {isAuth && (
          <div className="hidden md:flex gap-6 text-sm font-medium items-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => `flex items-center gap-1.5 transition duration-200 ${isActive ? 'text-white font-bold' : 'text-muted hover:text-white'}`}
            >
              <Film size={16} />
              <span>Kino Qidirish</span>
            </NavLink>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => `flex items-center gap-1.5 transition duration-200 ${isActive ? 'text-white font-bold' : 'text-muted hover:text-white'}`}
            >
              <Heart size={16} />
              <span>Favoritlar</span>
            </NavLink>
            
            {/* Profil va Logout */}
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

        {/* BURGER BUTTON (Faqat mobil qurilmalar va faqat avtorizatsiyadan o'tganlar uchun) */}
        {isAuth && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted hover:text-white focus:outline-none z-50"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>

      {/* MOBILE NAVIGATION MENU (Framer Motion silliq animatsiyasi bilan) */}
      <AnimatePresence>
        {isOpen && isAuth && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-16 bg-surface/95 backdrop-blur-lg border-b border-gray-800 z-40 md:hidden flex flex-col p-6 space-y-5 shadow-2xl"
          >
            {/* Foydalanuvchi profili qismi */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-800/50">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <User size={18} />
              </div>
              <div>
                <p className="text-xs text-muted">Tizimga kirildi</p>
                <p className="text-sm font-bold text-white">{user?.username}</p>
              </div>
            </div>

            {/* Havolalar */}
            <NavLink 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 py-2 text-base font-medium rounded-xl transition ${isActive ? 'text-primary' : 'text-muted'}`}
            >
              <Film size={20} />
              <span>Kino Qidirish</span>
            </NavLink>

            <NavLink 
              to="/favorites" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 py-2 text-base font-medium rounded-xl transition ${isActive ? 'text-primary' : 'text-muted'}`}
            >
              <Heart size={20} />
              <span>Favoritlar</span>
            </NavLink>

            {/* Logout tugmasi */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 py-3 px-4 text-base font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition text-left w-full mt-2"
            >
              <LogOut size={20} />
              <span>Tizimdan chiqish</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asosiy Kontent */}
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