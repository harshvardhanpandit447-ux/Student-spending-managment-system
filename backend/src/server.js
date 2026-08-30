import app from './app.js';
import { checkSupabaseConnection } from './config/supabase.js';

const PORT = process.env.PORT || 5000;

// Start listening immediately
app.listen(PORT, async () => {
  console.log(`=============================================`);
  console.log(` FinFlow REST API Server running on port ${PORT}`);
  console.log(` Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
  console.log(` Database: Supabase (edhnurlieeddmhmbogkm)`);
  console.log(`=============================================`);
  
  // Verify Supabase connection
  await checkSupabaseConnection();
});
