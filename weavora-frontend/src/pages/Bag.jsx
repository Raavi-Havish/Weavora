import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BagContext } from '../context/BagContext';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Bag = () => {
  const { bagItems, updateQuantity, removeFromBag, clearBag } = useContext(BagContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [location, setLocation] = useState({ address: '', city: '', postalCode: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const total = bagItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth'); // Force login if trying to checkout while logged out
      return;
    }

    if (bagItems.length === 0) {
      setError('Your bag is empty.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Format the items to match our backend Order model
      const orderItems = bagItems.map(item => ({
        product: item._id,
        qty: item.qty,
        size: item.size
      }));

      // Post the order to the backend API we built earlier
      await API.post('/orders', {
        orderItems,
        deliveryLocation: location,
        totalPrice: total
      });

      clearBag(); // Empty the cart after successful order
      alert('Order placed successfully!');
      navigate('/profile'); // Send them to see their new order
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (bagItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <span className="text-6xl mb-6">🛍️</span>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your bag is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="px-8 py-3 bg-weavora-dark text-white rounded-full font-bold hover:bg-weavora-light transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Your Bag 🛍️</h1>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Dynamic Bag Items */}
        <div className="w-full lg:w-3/5 space-y-6">
          {bagItems.map((item) => (
            <div key={`${item._id}-${item.size}`} className="flex bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center relative">
              <img src={item.imageUrl || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop"} alt={item.name} className="w-24 h-32 object-cover rounded-xl" />
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-weavora-dark font-bold text-lg">${item.price}</p>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item._id, item.size, item.qty - 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-weavora-light transition-colors">-</button>
                    <span className="font-medium">{item.qty}</span>
                    <button onClick={() => updateQuantity(item._id, item.size, item.qty + 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-weavora-light transition-colors">+</button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeFromBag(item._id, item.size)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Right Side: Delivery Location & Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
            
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Direct Address</label>
                <input type="text" required value={location.address} onChange={(e) => setLocation({...location, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="123 Fashion Street" />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" required value={location.city} onChange={(e) => setLocation({...location, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="New York" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input type="text" required value={location.postalCode} onChange={(e) => setLocation({...location, postalCode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="10001" />
                </div>
              </div>

              <div className="border-t border-gray-200 mt-8 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-extrabold text-gray-900 pt-4">
                  <span>Total</span>
                  <span className="text-weavora-dark">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full mt-6 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all ${
                  isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-weavora-dark hover:bg-weavora-light hover:text-weavora-dark hover:shadow-xl'
                }`}
              >
                {isProcessing ? 'Processing...' : user ? 'Complete Checkout' : 'Login to Checkout'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;