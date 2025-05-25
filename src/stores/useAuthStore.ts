'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export type User = {
  id: string;
  nombre: string;
} | null;

type AuthStore = {
  token: string | null;
  userId: string | null;
  isLoggedIn: boolean;
  user: User;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      isLoggedIn: false,
      user: {nombre: "", id: ""},
      login: (token, user:User) => {
        set({ token, user, isLoggedIn: true, userId:user?.id });
      },
      logout: () => {
        set({ token: null, user: null, userId:null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
