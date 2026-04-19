import { useContext, useState, useEffect } from 'react'; 
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Profile = () => {
  const { user, logout } = useContext(AuthContext); 
  const [orders, setOrders] = useState([]); 
  const [profileData, setProfileData] = useState(null); // Added state for full profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch both the full user profile AND their orders at the same time
        const [profileRes, ordersRes] = await Promise.all([
          API.get('/users/profile'),
          API.get('/orders/myorders')
        ]);
        
        setProfileData(profileRes.data);
        setOrders(ordersRes.data); 
      } catch (error) {
        console.error("Error fetching profile data:", error); 
      } finally {
        setLoading(false); 
      }
    };

    if (user) {
      fetchProfileData(); 
    }
  }, [user]); 

  // Wait for loading to finish before trying to render data
  if (!user) return null;
  if (loading) return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-weavora-dark"></div>
    </div>
  );

  // Safely determine what to display (prevents .charAt crashes)
  const displayChar = profileData?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U';
  const displayName = profileData?.firstName 
    ? `${profileData.firstName} ${profileData.lastName}` 
    : (user?.name || 'Weavora User');
  const displayEmail = profileData?.email || user?.email;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Sidebar Info */}
        <div className="w-full md:w-1/3">
          <div className="bg-weavora-dark rounded-3xl p-8 text-white shadow-xl">
            <div className="w-24 h-24 bg-weavora-light text-weavora-dark rounded-full flex items-center justify-center text-3xl font-extrabold mx-auto mb-6 uppercase">
              {displayChar}
            </div>
            <h2 className="text-2xl font-bold text-center mb-1 capitalize">
              {displayName}
            </h2>
            <p className="text-center text-weavora-light mb-8">{displayEmail}</p>
            
            <div className="border-t border-white/20 pt-6 space-y-4">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Account Settings</button> 
              <button className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Payment Methods</button> 
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded-lg text-red-300 hover:bg-white/10 transition-colors mt-4"
              >
                Log Out
              </button> 
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Order History</h2> 
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="flex justify-between items-center p-6 border border-gray-100 rounded-2xl hover:border-weavora-light transition-colors">
                    <div>
                      <p className="font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p> 
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} 
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-weavora-dark">${order.totalPrice.toFixed(2)}</p> 
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.isDelivered ? 'Delivered' : 'Processing'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">You haven't placed any orders yet.</p> 
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;