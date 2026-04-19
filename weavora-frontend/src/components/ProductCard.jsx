import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BagContext } from '../context/BagContext';

const ProductCard = ({ product }) => {
  const { addToBag } = useContext(BagContext);

  const handleQuickAdd = () => {
    // Defaulting to size 'M' for Quick Add
    addToBag(product, 'M', 1);
    alert(`${product.name} added to your bag!`);
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
        <img 
          src={product.imageUrl || "https://images.unsplash.com/photo-1434389678232-04ce6ca8bc14?q=80&w=500&auto=format&fit=crop"} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleQuickAdd}
            className="w-full py-3 rounded-xl bg-white/90 backdrop-blur-sm text-weavora-dark font-bold shadow-lg hover:bg-weavora-dark hover:text-white transition-colors"
          >
            + Quick Add
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs font-bold text-weavora-light uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          <Link to={`/product/${product._id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-weavora-dark font-bold text-xl mt-2">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;