import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  fbc: string | null
  fbp: string | null
  gclid: string | null
  source: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  notes: string | null
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "viewer"
  created_at: string
  updated_at: string
}
