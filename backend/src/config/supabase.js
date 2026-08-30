import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://edhnurlieeddmhmbogkm.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaG51cmxpZWVkZG1obWJvZ2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzg5MDcsImV4cCI6MjEwMzY1NDkwN30.BqnZgXVAZRzj9KcI21cL1_boUNWrGeIcAwlHe8pHrnE';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('id').limit(1);
    if (error) {
      console.warn('[Supabase] Connection test warning:', error.message);
      return false;
    }
    console.log(`[Supabase] Connected successfully to project: ${supabaseUrl}`);
    return true;
  } catch (err) {
    console.error('[Supabase] Connection failed:', err.message);
    return false;
  }
};
