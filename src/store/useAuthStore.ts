import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  balance: number
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateBalance: (amount: number) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateBalance: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, balance: state.user.balance + amount }
            : null,
        })),
    }),
    {
      name: 'onda-auth-storage',
    }
  )
)
