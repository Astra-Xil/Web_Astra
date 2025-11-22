'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🚀 初回ロードでセッション取得
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }
    getSession()
  }, [])

  // ＝＝＝＝＝＝＝＝＝＝＝
  // SignUp（ユーザー登録）
  // ＝＝＝＝＝＝＝＝＝＝＝
  const signUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      alert('確認メールを送信しました！')
    } catch (e: any) {
      alert('サインアップエラー: ' + e.message)
    }
  }

  // ＝＝＝＝＝＝＝＝＝＝＝
  // SignIn（ログイン）
  // ＝＝＝＝＝＝＝＝＝＝＝
  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      const { data } = await supabase.auth.getSession()
      setSession(data.session)

      alert('ログイン成功！')
    } catch (e: any) {
      alert('サインインエラー: ' + e.message)
    }
  }

  // ＝＝＝＝＝＝＝＝＝＝＝
  // SignOut（ログアウト）
  // ＝＝＝＝＝＝＝＝＝＝＝
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setSession(null)

      alert('ログアウトしました！')
    } catch (e: any) {
      alert('ログアウトエラー: ' + e.message)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ padding: 40 }}>
      <h1>Supabase Auth Login</h1>

      {/* 🔥 ログイン済みのときの画面 */}
      {session ? (
        <div>
          <p>ログイン中: {session.user.email}</p>
          <button onClick={signOut}>Log Out</button>
        </div>
      ) : (
        /* 🔥 ログインしていないときの画面 */
        <div>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <div style={{ marginTop: 20 }}>
            <button onClick={signUp}>Sign Up</button>
            <button onClick={signIn}>Sign In</button>
          </div>
        </div>
      )}
    </div>
  )
}
