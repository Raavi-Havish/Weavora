import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const wishlistItems = [
    { _id: '3', name: 'Custom Tailored Suit', price: 299, category: 'Custom', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=500&auto=format&fit=crop' },
    { _id: '4', name: 'Vintage Wash Denim', price: 89, category: 'Men', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex items-center space-x-3 mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Your Wishlist</h1>
        <span className="text-3xl animate-bounce">🤍</span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map(item => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">Your wishlist is looking a little empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;