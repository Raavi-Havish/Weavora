import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BagContext } from '../context/BagContext';
import { 
  ShoppingBag, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { user, logout } = useContext(AuthContext);
  const { bagItems } = useContext(BagContext);
  const navigate = useNavigate();
  const location = useLocation();

  const bagItemCount = bagItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => setIsMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="relative w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
          </button>

          {/* Styled Stylish Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group flex items-center">
              <span className="text-3xl font-serif italic font-bold tracking-tighter text-weavora-dark group-hover:text-weavora-light transition-colors duration-300">
                Weavora
              </span>
              <span className="text-weavora-light text-4xl leading-none ml-0.5 font-bold">.</span>
            </Link>
          </div>

          {/* Desktop Categories - Bolded */}
          <div className="hidden md:flex space-x-10 items-center font-black text-[13px] uppercase tracking-[0.15em] text-gray-900">
            {['Women', 'Men', 'Kids', 'GenZ'].map((cat) => (
              <Link 
                key={cat} 
                to={`/category/${cat.toLowerCase()}`} 
                className={`hover:text-weavora-light transition-colors relative group ${
                  location.pathname.includes(cat.toLowerCase()) ? 'text-weavora-dark underline underline-offset-8 decoration-2' : ''
                }`}
              >
                {cat}
                {!location.pathname.includes(cat.toLowerCase()) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-weavora-dark w-0 group-hover:w-full transition-all duration-300"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Actions - Bolded Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/bag" className="relative text-gray-900 hover:text-weavora-light transition-transform">
              <ShoppingBag size={24} strokeWidth={2.5} />
              {bagItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-weavora-dark text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                  {bagItemCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center space-x-5 border-l-2 pl-6 border-gray-100">
                  <Link to="/profile" className="flex items-center group">
                    <div className="w-9 h-9 rounded-full border-2 border-weavora-dark bg-white text-weavora-dark flex items-center justify-center font-black text-sm group-hover:bg-weavora-dark group-hover:text-white transition-all duration-300">
                      {user.firstName ? user.firstName.charAt(0) : user.name?.charAt(0)}
                    </div>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-900 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={22} strokeWidth={2.5} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-weavora-dark text-white hover:bg-weavora-light transition-all shadow-md">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white z-50 border-b border-gray-100 shadow-xl">
          <div className="px-8 py-10 space-y-8">
            {['Women', 'Men', 'Kids', 'GenZ'].map((cat) => (
              <Link 
                key={cat} 
                to={`/category/${cat.toLowerCase()}`} 
                className="block text-2xl font-black tracking-tighter text-gray-900"
              >
                {cat.toUpperCase()}
              </Link>
            ))}
            <div className="pt-8 border-t-2 border-gray-50">
              {!user ? (
                <Link to="/login" className="block text-center py-5 bg-weavora-dark text-white rounded-full text-xs font-black tracking-[0.2em]">
                  SIGN IN
                </Link>
              ) : (
                <div className="space-y-6">
                  <Link to="/profile" className="block text-gray-900 font-black text-lg">MY PROFILE</Link>
                  <button onClick={handleLogout} className="text-red-600 font-black text-lg">LOGOUT</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;