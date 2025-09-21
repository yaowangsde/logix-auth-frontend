import { create } from 'zustand'
import * as Auth from '../api/auth'

type State = {
  accessToken: string | null
  setToken: (t: string | null) => void
  login: (email: string, password: string) => Promise<void>
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<State>((set, get) => ({
  accessToken: null,
  setToken: (t) => set({ accessToken: t }),
  login: async (email, password) => {
    const res = await Auth.login(email, password)
    set({ accessToken: res.accessToken })
  },
  refresh: async () => {
    const res = await Auth.refresh()
    set({ accessToken: res.accessToken })
  },
  logout: async () => {
    await Auth.logout()
    set({ accessToken: null })
  }
}))
