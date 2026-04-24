import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage('Password reset link sent to your email!');
      } else if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/reset-password`,
          }
        });
        
        if (error) throw error;
        
        if (data?.user && data?.session) {
            setMessage('Account created and logged in!');
        } else {
            setMessage('Success! Check your inbox for the confirmation link.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      console.error('Auth Full Error:', err);
      
      let msg = err.message || 'An unexpected error occurred';
      
      // Specifically handle the 500 error during email sending
      if (msg.includes('confirmation email') || err.status === 500) {
        msg = "Email Server Error (500). Supabase is unable to talk to Brevo. Please check your Brevo SMTP Keys and ensure your Gmail is 'Verified' as a Sender in Brevo.";
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
    setError(null);
    setMessage(null);
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsSignUp(false);
    setError(null);
    setMessage(null);
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
          <h1 className="text-3xl font-heading font-black text-center">
            {isForgotPassword ? 'Reset Password' : (isSignUp ? 'Create Account' : 'Welcome to Finnbase')}
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center px-4">
            {isForgotPassword ? 'Enter your email to receive a reset link' : (isSignUp ? 'Join smart investors today' : 'Sign in to manage your wealth')}
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-2xl flex gap-3 text-danger text-sm"
          >
            <AlertCircle size={18} className="shrink-0" />
            <p className="break-words font-medium">{error}</p>
          </motion.div>
        )}

        {message && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-success/10 border border-success/20 rounded-2xl flex gap-3 text-success text-sm"
          >
            <CheckCircle2 size={18} className="shrink-0" />
            <p>{message}</p>
          </motion.div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-success/50 transition-all text-white"
              />
            </div>
          </div>

          {!isForgotPassword && (
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                {!isSignUp && (
                  <button 
                    type="button"
                    onClick={toggleForgotPassword}
                    className="text-[10px] text-success font-bold hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-success/50 transition-all text-white"
                />
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-success text-primary font-black py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all flex items-center justify-center gap-2 group shadow-[0_10px_30px_-10px_rgba(0,200,150,0.3)]"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                {isForgotPassword ? 'Send Reset Link' : (isSignUp ? 'Sign Up' : 'Sign In')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 text-center">
          {isForgotPassword ? (
            <button 
              onClick={toggleForgotPassword}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              Back to <span className="text-success font-bold hover:underline">Sign In</span>
            </button>
          ) : (
            <button 
              onClick={toggleMode}
              className="w-full text-center text-xs text-gray-500 hover:text-white transition-colors"
            >
              {isSignUp ? (
                <>Already have an account? <span className="text-success font-bold hover:underline">Sign In</span></>
              ) : (
                <>Don't have an account? <span className="text-success font-bold hover:underline">Create one</span></>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
