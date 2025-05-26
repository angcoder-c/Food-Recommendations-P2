'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './../stores/useAuthStore';
import GridProducts from '@/components/gird-products';

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const { user, userId, likeCount, likesum } = useAuthStore();

  const loadPopularProducts = async () => {
    const res = await fetch('/api/products/get-products-more-likes', {
      method: 'GET',
    });
    const data = await res.json();
    if (res.ok) {
      setPopularProducts(data.productos);
    } else {
      console.error(data.error || 'request error');
    }
  };

  const loadRecomendations = async () => {
    const res = await fetch('/api/user/get-recomendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
    });
    const data = await res.json();
    if (res.ok) {
      setRecomendations(data.recomendaciones);
    } else {
      console.error(data.error || 'request error');
    }
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    loadPopularProducts();
  }, [likeCount]);

  useEffect(() => {
    if (isHydrated && userId) {
      loadRecomendations();
    }
  }, [isHydrated, userId, likeCount]);

  return (
    <div className="mx-auto py-8">
      {isHydrated && userId && recomendations?.length ? (
        <>
          <GridProducts 
            title='Los más populares'
            productos={popularProducts} 
          />
          
          <GridProducts 
            title='Recomendados'
            productos={recomendations} 
          />
        </>
      ) : (
        <GridProducts 
          title='Los más populares'
          productos={popularProducts} 
        />
      )}
    </div>
  );
}