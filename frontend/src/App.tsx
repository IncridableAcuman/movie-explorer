import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/Favorites';
import { useAuthStore } from './store/useAuthStore';
import { useEffect, type JSX } from 'react';
import { Loader2 } from 'lucide-react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Himoyalangan yo'llar komponenti
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  return isAuth ? children : <Navigate to="/login" replace />;
};

function App() {
  const { checkAuthentication, isLoading, isAuth } = useAuthStore();

  useEffect(() => {
    checkAuthentication(); // Ilova yuklanishi bilan kuki orqali tekshirish
  }, [checkAuthentication]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-muted gap-2">
        <Loader2 className="animate-spin text-primary" size={40} />
        <span className="text-xs tracking-wider">Xavfsiz ulanish o'rnatilmoqda...</span>
      </div>
    );
  }

  return (
    <Router>
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { background: '#161822', color: '#fff', borderRadius: '14px', border: '1px solid #27272a' } 
        }} 
      />
      <Layout>
        <Routes>
          {/* Ochiq yo'llar (Faqat mehmonga yoki login qilmaganga) */}
          <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuth ? <Register /> : <Navigate to="/" />} />

          {/* Himoyalangan platforma yo'llari */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;