import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if we have the credentials, otherwise use a placeholder
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase credentials missing in Vercel settings.' } }),
        signUp: async () => ({ error: { message: 'Supabase credentials missing in Vercel settings.' } }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: { message: 'Supabase credentials missing in Vercel settings.' } }),
        updateUser: async () => ({ error: { message: 'Supabase credentials missing in Vercel settings.' } }),
      }
    } as any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Check your .env or Vercel Environment Variables.');
}
