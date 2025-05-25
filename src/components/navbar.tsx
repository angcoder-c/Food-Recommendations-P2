'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav>
      <a href="/">Inicio</a>
      {
      user ? (
        <>
          <span>{user?.nombre}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Registro</a>
        </>
      )}
    </nav>
  );
}