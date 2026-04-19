import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { BagContext } from '../context/BagContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import API from '../services/api';

const ProductCard = ({ product }) => {
  const { addToBag } = useContext(BagContext);
  const { user } = useContext(AuthContext);
  const [isWishlisted, setIsWishlisted] = useState(user?.wishlist?.includes(product._id));

  const handleToggleWishlist = async () => {
    if (!user) return toast.error("Please login to use wishlist");
    
    try {
      await API.post('/users/wishlist', { productId: product._id });
      setIsWishlisted(!isWishlisted);
      toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist", {
        icon: isWishlisted ? '💔' : '❤️',
      });
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  const handleQuickAdd = () => {
    addToBag(product, 'M', 1);
    toast.success(`${product.name} added to bag!`, {
      style: { border: '1px solid #5b1e88', padding: '16px', color: '#5b1e88' },
      iconTheme: { primary: '#5b1e88', secondary: '#FFFAEE' },
    });
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
      <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Wishlist Button */}


        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleQuickAdd}
            className="w-full py-3 rounded-xl bg-weavora-dark text-white font-bold shadow-lg hover:bg-weavora-light hover:text-weavora-dark transition-colors"
          >
            + Quick Add
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-md font-semibold text-gray-900 truncate">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="text-weavora-dark font-bold text-lg mt-1">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;