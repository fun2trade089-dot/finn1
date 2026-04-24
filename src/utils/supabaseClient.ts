import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log status for debugging
console.log('Supabase Connection Status:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        // Reduce retries so we don't hit 504 timeouts as easily
        fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' })
      }
    })
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase credentials missing.' } }),
        signUp: async () => ({ error: { message: 'Supabase credentials missing.' } }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: { message: 'Supabase credentials missing.' } }),
        updateUser: async () => ({ error: { message: 'Supabase credentials missing.' } }),
      }
    } as any;
