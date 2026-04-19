const Profile = () => {
  // Dummy user data
  const user = {
    name: "Alex Fashionista",
    email: "alex@weavora.com",
    joined: "April 2026"
  };

  const orderHistory = [
    { _id: 'ORD-1092', date: '2026-04-10', total: 134.00, status: 'Delivered' },
    { _id: 'ORD-1045', date: '2026-03-22', total: 89.00, status: 'Processing' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Sidebar Info */}
        <div className="w-full md:w-1/3">
          <div className="bg-weavora-dark rounded-3xl p-8 text-white shadow-xl">
            <div className="w-24 h-24 bg-weavora-light text-weavora-dark rounded-full flex items-center justify-center text-3xl font-extrabold mx-auto mb-6">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-center mb-1">{user.name}</h2>
            <p className="text-center text-weavora-light mb-8">{user.email}</p>
            
            <div className="border-t border-white/20 pt-6 space-y-4">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Account Settings</button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Payment Methods</button>
              <button className="w-full text-left px-4 py-2 rounded-lg text-red-300 hover:bg-white/10 transition-colors mt-4">Log Out</button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Order History</h2>
            
            <div className="space-y-4">
              {orderHistory.map(order => (
                <div key={order._id} className="flex justify-between items-center p-6 border border-gray-100 rounded-2xl hover:border-weavora-light transition-colors">
                  <div>
                    <p className="font-bold text-gray-900">{order._id}</p>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-weavora-dark">${order.total.toFixed(2)}</p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;