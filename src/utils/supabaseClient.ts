import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log status for debugging (Safe: doesn't show the actual keys)
console.log('Supabase Connection Status:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlFormatValid: supabaseUrl?.startsWith('https://'),
});

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
  console.error('CRITICAL: Supabase credentials are missing!');
}
