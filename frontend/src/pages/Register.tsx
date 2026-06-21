import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);

  const registerUser = useAuthStore((state) => state.registerUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      await registerUser(username, email, password);
      navigate('/');
    } catch(err) {
        console.log(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface/60 border border-gray-800 backdrop-blur-md p-8 rounded-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-wide">Ro'yxatdan o'tish</h2>
          <p className="text-sm text-muted">Yangi hisob yarating va platformadan to'liq foydalaning.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Foydalanuvchi nomi (Username)"
              className="w-full bg-background/50 border border-gray-800 focus:border-primary pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email manzilingiz"
              className="w-full bg-background/50 border border-gray-800 focus:border-primary pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Xavfsiz parol"
              className="w-full bg-background/50 border border-gray-800 focus:border-primary pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition duration-300 flex items-center justify-center gap-2"
          >
            {pending ? <Loader2 className="animate-spin" size={18} /> : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <p className="text-xs text-center text-muted">
          Akkauntingiz bormi?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Tizimga kirish
          </Link>
        </p>
      </motion.div>
    </div>
  );
};