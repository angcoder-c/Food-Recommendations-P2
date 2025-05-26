'use client';

import { useEffect, useState } from 'react';
import ProductCard from './product-card';
import { Producto } from './product-card';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './../stores/useAuthStore';

export default function MostPopularProducts() {
    const [popularProducts, setPopularProducts] = useState([])
    const loadPopularProducts = async () => {
        const res = await fetch('/api/products/get-products-more-likes', {
            method: 'GET',
        })
        const data = await res.json()

        if (res.ok) {
            setPopularProducts(data.productos)
        } else {
            alert(data.error || 'request error')
        }
    }
    useEffect(()=>{
        loadPopularProducts()
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold text-green-400 mb-8 flex items-center">
                Los más populares
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {
                    popularProducts.map((product: Producto, index) => (
                        <ProductCard
                            key={product?.nombre ?? `product-${index}`}
                            producto={product}
                        />
                    ))
                }
            </div>
        </div>
  );
}