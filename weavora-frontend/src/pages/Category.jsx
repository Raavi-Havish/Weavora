import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Category = () => {
  const { name } = useParams(); // Gets 'women', 'men', 'genz', etc. from the URL
  
  // Dummy data to visualize the grid
  const categoryProducts = [
    { _id: '1', name: `Premium ${name} Jacket`, price: 120, category: name, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop' },
    { _id: '2', name: `Essential ${name} Tee`, price: 35, category: name, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop' },
    { _id: '3', name: `Signature ${name} Denim`, price: 89, category: name, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop' },
    { _id: '4', name: `Classic ${name} Sneakers`, price: 150, category: name, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Category Header */}
      <div className="bg-weavora-dark text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-extrabold capitalize tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-weavora-light">
          {name} Collection
        </h1>
        <p className="mt-4 text-weavora-light text-lg">
          Curated styles specifically for {name}. Find your fit.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500 font-medium">{categoryProducts.length} Products Found</p>
          <select className="border border-gray-200 rounded-lg px-4 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-weavora-light">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;