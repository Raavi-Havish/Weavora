import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Dummy data for visual presentation
  const featuredProducts = [
    { _id: '1', name: 'Oversized GenZ Hoodie', price: 45, category: 'GenZ' },
    { _id: '2', name: 'Classic Denim Jacket', price: 89, category: 'Men' },
    { _id: '3', name: 'Floral Summer Dress', price: 55, category: 'Women' },
    { _id: '4', name: 'Custom Tailored Suit', price: 299, category: 'Custom' },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative bg-weavora-dark h-[80vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-weavora-dark to-[#8b3fd6] opacity-90 z-0"></div>
        {/* Decorative background shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-weavora-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Wear Your <br/>
              <span className="text-weavora-light">Vibe.</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-lg">
              Discover curated styles for Women, Men, Kids, and GenZ. Or craft your own with Weavora Custom.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/category/women" className="px-8 py-4 bg-weavora-light text-weavora-dark font-bold rounded-full hover:bg-white transition-colors shadow-xl text-center">
                Shop Women
              </Link>
              <Link to="/category/men" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-weavora-dark transition-colors text-center">
                Shop Men
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">Trending Now</h2>
            <div className="h-1 w-24 bg-weavora-light mt-3 rounded-full"></div>
          </div>
          <Link to="/category/genz" className="text-weavora-dark font-semibold hover:text-weavora-light transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;