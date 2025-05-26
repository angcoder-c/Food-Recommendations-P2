'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
      <nav className="fixed top-4 left-10 right-10 z-50 bg-gray-800/90 backdrop-blur rounded-xl shadow-lg px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <Link href={'/'} className="text-white font-medium">
              Inicio
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href={'/'} className="text-white font-medium">
              Restaurantes
            </Link>

            {
              user ? (
                <>
                  <Button onClick={logout} variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-gray-700">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-gray-700">
                    <Link href={'/login'}>Login</Link>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Link href={'/register'}>Registro</Link>
                  </Button>
                </>
              )
            }
          </div>
        </div>
      </nav>
  );
}