'use client'
import { createClient } from "@/utils/supabase/client"

export async function signInWithGoogle() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  })

  if (error) {
    return {
      success: false,
      error: error.message
    }
  }

  return {
    success: true
  }
}
