'use client'


import { signInWithGoogle } from "@/utils/auth/signInWithGoogle"

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle()

    if (!result.success) {
      alert("Google ログイン失敗: " + result.error)
      return
    }

    // OAuth の場合、成功時は自動で Google → Supabase → /auth/callback に飛ぶ
  }

  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  )
}
