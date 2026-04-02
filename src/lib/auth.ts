import { supabase } from './supabase'

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } }
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles').select('*').eq('id', userId).single()
  return { data, error }
}

export async function updateProfile(userId: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('profiles').update(updates).eq('id', userId)
  return { data, error }
}