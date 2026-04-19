import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BagContext } from '../context/BagContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pull data from our global states
  const { user, logout } = useContext(AuthContext);
  const { bagItems } = useContext(BagContext);

  // Calculate total items in the bag
  const bagItemCount = bagItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-weavora-light/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-weavora-dark to-weavora-light tracking-widest drop-shadow-sm">
              WEAVORA
            </Link>
          </div>

          {/* Integrated Categories */}
          <div className="hidden md:flex space-x-6 items-center font-medium text-gray-600">
            {['Women', 'Men', 'Kids', 'GenZ', 'Custom'].map((cat) => (
              <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="hover:text-weavora-dark transition-all duration-300 hover:scale-110 relative group">
                {cat}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-weavora-dark transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Search, Wishlist, Bag, Auth */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <input type="text" className="w-48 pl-4 pr-10 py-1.5 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-weavora-light text-sm transition-all focus:w-64" placeholder="Search styles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <span className="absolute right-3 top-1.5 text-gray-400">🔍</span>
            </div>

            <Link to="/wishlist" className="text-2xl hover:scale-110 transition-transform">🤍</Link>
            
            {/* Bag Icon with dynamic counter */}
            <Link to="/bag" className="relative text-2xl hover:scale-110 transition-transform">
              🛍️
              {bagItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-weavora-dark text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {bagItemCount}
                </span>
              )}
            </Link>

            {/* Dynamic Auth Button */}
            {user ? (
              <Link to="/profile" className="w-10 h-10 rounded-full bg-weavora-light text-weavora-dark flex items-center justify-center font-extrabold text-lg shadow-md hover:scale-105 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link to="/auth" className="px-5 py-2 rounded-full text-sm font-bold bg-weavora-dark text-white hover:bg-weavora-light hover:text-weavora-dark transition-all shadow-md hover:shadow-lg">
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;