import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-success/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-10 rounded-[40px] border-white/5 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="bg-success p-3 rounded-2xl mb-4">
            <Rocket className="text-primary" size={32} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-heading font-black">Set New Password</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Enter your new secure password below
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-2xl flex gap-3 text-danger text-sm"
          >
            <AlertCircle size={18} className="shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="flex justify-center mb-4 text-success">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Password Updated!</h2>
            <p className="text-gray-400">Redirecting you to login...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-success/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-success/50 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-success text-primary font-black py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all flex items-center justify-center gap-2 group shadow-[0_10px_30px_-10px_rgba(0,200,150,0.3)]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Update Password
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
