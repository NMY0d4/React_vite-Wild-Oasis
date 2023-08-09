import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://gfbeuvqxvnkjggwkcsmr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmV1dnF4dm5ramdnd2tjc21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODI2MzcsImV4cCI6MjAwNzA1ODYzN30.8JZVgNqu0y_xLxL6GN3h3PtDbGloxHCSF2M4fWbWnt8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
