import { api } from './client'

export type LoginRes = { accessToken: string, expiresIn: number }

export async function register(email: string, password: string) {
  return api('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export async function login(email: string, password: string) {
  return api<LoginRes>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export async function refresh() {
  return api<LoginRes>('/auth/refresh', { method: 'POST' })
}

export async function logout() {
  return api('/auth/logout', { method: 'POST' })
}
