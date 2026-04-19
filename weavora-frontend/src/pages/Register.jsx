import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  // Use a single object for all form fields as seen in your image
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullAddress: '',
    city: '',
    pincode: ''
  });

  const [error, setError] = useState('');
  const { register } = useContext(AuthContext); // [cite: 133, 142]
  const navigate = useNavigate();

  // Handle changes for all inputs dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic frontend validation for password matching
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    // Call register with the full object
    const res = await register(formData); // [cite: 137]
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message); // [cite: 139]
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-xl flex overflow-hidden border border-gray-100">
        
        {/* Left Side Banner */}
        <div className="hidden lg:flex lg:w-1/3 bg-weavora-dark relative items-center justify-center p-10">
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">Join Weavora.</h2>
            <p className="text-weavora-light">Create your account to start styling.</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-2/3 p-10 overflow-y-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Create Account</h2>
          
          {error && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* PERSONAL INFO SECTION */}
            <div>
              <h3 className="text-xs font-bold text-weavora-dark uppercase tracking-widest mb-4 border-b pb-1">Personal Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                <input type="date" name="dob" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
              </div>
            </div>

            {/* ACCOUNT DETAILS SECTION */}
            <div>
              <h3 className="text-xs font-bold text-weavora-dark uppercase tracking-widest mb-4 border-b pb-1">Account Details</h3>
              <div className="space-y-4">
                <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                </div>
              </div>
            </div>

            {/* DELIVERY ADDRESS SECTION */}
            <div>
              <h3 className="text-xs font-bold text-weavora-dark uppercase tracking-widest mb-4 border-b pb-1">Delivery Address</h3>
              <div className="space-y-4">
                <input type="text" name="fullAddress" placeholder="Full Address (House no, Street, Area)" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="city" placeholder="City" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                  <input type="text" name="pincode" placeholder="6-digit Pincode" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-weavora-light" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-weavora-dark text-white font-bold text-lg hover:bg-weavora-light hover:text-weavora-dark transition-all shadow-lg">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="text-weavora-dark font-bold hover:text-weavora-light">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;