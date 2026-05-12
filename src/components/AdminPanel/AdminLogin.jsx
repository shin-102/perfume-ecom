import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, AlertCircle, ChevronRight } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    try {
      // Simulation of the fetch logic
      const response = await fetch(
        'http://127.0.0.1:5001/perfume-ecom-3b6b8/us-central1/adminLogin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin');
      } else {
        setError(data.message || 'Access Denied: Invalid Credentials');
      }
    } catch {
      setError('System Error: Connection to Auth-Server failed.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#051e34] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#039BE5] via-[#FFCA28] to-[#039BE5]"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#039BE5]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFCA28]/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo / Icon Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFCA28] rounded-2xl mb-4 shadow-xl shadow-[#FFCA28]/20">
            <Lock className="text-[#051e34] w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">FireScent <span className="text-[#039BE5]">BackOffice</span></h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Administrative Access Only</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative">
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/50 p-4 animate-shake">
              <AlertCircle className="text-red-500 shrink-0" size={18} />
              <p className="text-red-500 text-xs font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-[#039BE5] text-[10px] font-black uppercase tracking-widest mb-3">
                Security Key / Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  className="w-full bg-[#051e34]/50 border-b-2 border-white/20 px-4 py-4 text-white outline-none focus:border-[#FFCA28] transition-all font-mono"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFCA28] transition-colors" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-[#039BE5] hover:bg-[#FFCA28] hover:text-[#051e34] text-white font-black py-4 uppercase text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isAuthenticating ? (
                <span className="animate-pulse">Verifying Identity...</span>
              ) : (
                <>
                  Establish Connection <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">
            Protected by Firebase Security Rules & AES-256 Encryption
          </p>
          <button onClick={() => navigate('/')} className='text-gray-300 text-sm pt-4 font-bold uppercase tracking-widest hover:cursor-pointer hover:text-[#039BE5] transition-colors'>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
