import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Category from './pages/Category';
import Bag from './pages/Bag';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'; // Import this!

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/bag" element={<Bag />} />
            
            {/* Protect the profile route */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;