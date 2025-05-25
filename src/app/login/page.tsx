'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './../../stores/useAuthStore';

export default function LoginPage() {
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ nombre, password }),
    })

    const data = await res.json()

    if (res.ok) {
      const token = data.token
      const { id } = JSON.parse(atob(token.split('.')[1]))
      login(data.token, {nombre, id})
      router.push('/')
    } else {
      alert(data.error || 'login error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Iniciar Sesión</h1>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  );
}