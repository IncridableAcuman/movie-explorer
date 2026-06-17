import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home'; // Bosh sahifani import qildik
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/Favorites';

function App() {
  return (
    <Router>
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { background: '#161822', color: '#fff', borderRadius: '12px', border: '1px solid #27272a' } 
        }} 
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Bosh sahifa yo'li */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;