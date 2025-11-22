'use client'
import { createClient } from "@/utils/supabase/client"

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

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
