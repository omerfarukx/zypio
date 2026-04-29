import { createClient } from '@supabase/supabase-js';

// Vercel build sırasında environment variables bulunamazsa sahte URL ile buildin patlamasını engeller
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jbnouxpxtfkgcwgbbazh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_07jnNNDUyON1yPgL1RU_sA_sHYEHEgt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
