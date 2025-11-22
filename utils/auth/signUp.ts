'use client'
import { createClient } from "@/utils/supabase/client"

export async function signUp(email: string, password: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({ email, password })

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
