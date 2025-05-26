'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/useAuthStore';
import Logo from '../../public/logopng.png';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-[#3a3c3a] border-b-4 border-[#e8e0c3] py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 relative">
          <Image
            src={Logo} 
            alt="FoodMate Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-gray-300 text-3xl font-semibold leading-tight">
          <div>Food</div>
          <div>Mate</div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-gray-300 text-lg font-semibold">
        <Link href="/" className="hover:text-white">Inicio</Link>
        <Link href="/recomendation" className="hover:text-white">Recomendaciones</Link>
        {user ? (
          <>
            <span className="text-gray-400">{user?.nombre}</span>
            <button
              onClick={logout}
              className="hover:text-white focus:outline-none"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:text-white">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
}
