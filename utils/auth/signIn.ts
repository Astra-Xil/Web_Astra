'use client'
import { createClient } from "@/utils/supabase/client"

export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error: error.message,
      session: null,
    }
  }

  return {
    success: true,
    session: data.session,
  }
}
