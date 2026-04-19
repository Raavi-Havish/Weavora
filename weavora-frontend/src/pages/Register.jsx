import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  
  const { register, verifyOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (showOtp) {
      const res = await verifyOtp(email, otp);
      if (res.success) navigate('/');
      else setError(res.message);
    } else {
      const res = await register(name, email, password);
      if (res.success) setShowOtp(true);
      else setError(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-weavora-dark relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-weavora-dark to-[#3b115e] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop')] mix-blend-overlay opacity-20 object-cover w-full h-full"></div>
        <div className="relative z-10 text-center px-12">
          <h2 className="text-5xl font-extrabold text-white mb-6">Join Weavora.</h2>
          <p className="text-weavora-light text-xl">Create your account to start styling.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{showOtp ? 'Verify OTP' : 'Create Account'}</h2>
          <p className="text-gray-500 mb-6">{showOtp ? 'We sent a 6-digit code to your email.' : 'Please enter your details to register.'}</p>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!showOtp ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="••••••••" />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit OTP</label>
                <input type="text" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none text-center text-2xl tracking-[1em]" placeholder="000000" />
              </div>
            )}

            <button type="submit" className="w-full py-3 rounded-xl bg-weavora-dark text-white font-bold text-lg hover:bg-weavora-light hover:text-weavora-dark transition-all shadow-md">
              {showOtp ? 'Verify & Login' : 'Sign Up'}
            </button>
          </form>

          {!showOtp && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account? <Link to="/login" className="text-weavora-dark font-bold hover:text-weavora-light transition-colors">Log In</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;