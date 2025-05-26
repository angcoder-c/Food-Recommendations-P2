'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './../stores/useAuthStore';
import GridProducts from '@/components/gird-products';

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([])
  const [recomendations, setRecomendations] = useState([])
  const { user, userId } = useAuthStore()

  const loadPopularProducts = async () => {
    const res = await fetch('/api/products/get-products-more-likes', {
      method: 'GET',
    })
    const data = await res.json()
  
    if (res.ok) {
      setPopularProducts(data.productos)
    } else {
      console.error(data.error || 'request error')
    }
  }

  const loadRecomendations = async () => {
    const res = await fetch('/api/user/get-recomendations', {
      method: 'POST',
      body : JSON.stringify({ id : userId })
    })
    const data = await res.json()
  
    if (res.ok) {
      setRecomendations(data.productos)
    } else {
      console.error(data.error || 'request error')
    }
  }
  
  useEffect(()=>{
    loadPopularProducts()
    if (user) {
      loadRecomendations()
    }
  }, [])

  return (
    <div className="mx-auto py-8">
        {
          user && recomendations.length != 0 ?
          (
            <>
              <GridProducts
              productos={popularProducts}
              />

              <GridProducts 
              productos={recomendations}
              />
            </>
          ):
          (
            <GridProducts
              productos={popularProducts}
            />
          )
        }
    </div>
  );
}
