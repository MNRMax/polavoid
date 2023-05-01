import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hixkwnkstnlvlchlabpy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpeGt3bmtzdG5sdmxjaGxhYnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5NDU1NDUsImV4cCI6MTk5ODUyMTU0NX0.U0x-1BUxxt21K-ZmETLLX-5_wKLujGfWzBht2-2DgqM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)