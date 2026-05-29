import { createBrowserClient } from '@supabase/ssr'

export function createAuthClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function signUp(email: string, password: string, userData?: {
  name: string
  phone?: string
  role?: 'customer' | 'store_owner'
}) {
  const supabase = createAuthClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const supabase = createAuthClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const supabase = createAuthClient()

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const supabase = createAuthClient()

  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export async function getUser() {
  const supabase = createAuthClient()

  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  const supabase = createAuthClient()

  return supabase.auth.onAuthStateChange(callback)
}