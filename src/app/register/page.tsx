'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { User } from '@/stores/useAuthStore';

export default function RegistroPage() {
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify({ nombre, password }),
    })

    const data = await res.json()

    if (res.ok) {
      const token = data.token
      const { id } = JSON.parse(atob(token?.split('.')[1]))
      login(data.token, {nombre, id})
      router.push('/')
    } else {
      alert(data.error || 'register error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='m-auto max-w-80'>
      <h1 className="text-2xl font-bold text-green-400 mb-8 flex items-center">
        Registro
      </h1>
      <div className='flex flex-col gap-6'>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className='p-4 border-amber-100'/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className='p-4 border-amber-100'/>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-4 border-amber-100 rounded-2xl">
            Registrarse
        </button>
      </div>
    </form>
  );
}