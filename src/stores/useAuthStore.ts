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
  likeCount:number;
  login: (token: string, user: User) => void;
  likesum: (count: number) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      isLoggedIn: false,
      user: null,
      likeCount:0,
      login: (token, user:User) => {
        set({ token, user, isLoggedIn: true, userId:user?.id });
      },
      likesum: (count:number) => {
        set({ likeCount: count+1});
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
