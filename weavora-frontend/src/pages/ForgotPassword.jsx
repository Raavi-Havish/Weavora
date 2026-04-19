import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { requestPasswordReset, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    const res = await requestPasswordReset(email);
    if (res.success) {
      setStep(2);
      setSuccessMsg('OTP sent to your email.');
    } else {
      setError(res.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    const res = await resetPassword(email, otp, newPassword);
    if (res.success) {
      alert('Password changed successfully! Please login.');
      navigate('/login');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-500 mb-6">
          {step === 1 ? "Enter your email to receive a reset code." : "Enter the OTP and your new password."}
        </p>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
        {successMsg && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{successMsg}</div>}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="you@example.com" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-weavora-dark text-white font-bold text-lg hover:bg-weavora-light hover:text-weavora-dark transition-all shadow-md">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit OTP</label>
              <input type="text" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none text-center text-2xl tracking-[1em]" placeholder="000000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-weavora-light outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-weavora-dark text-white font-bold text-lg hover:bg-weavora-light hover:text-weavora-dark transition-all shadow-md">
              Update Password
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="text-gray-600 hover:text-weavora-dark font-medium transition-colors">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;