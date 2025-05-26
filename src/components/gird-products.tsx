'use client';

import { useEffect, useState } from 'react';
import ProductCard from './product-card';
import { Producto } from './product-card';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './../stores/useAuthStore';

export default function GridProducts({ productos } : { productos : Producto[] }) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-green-400 mb-8 flex items-center">
                Los más populares
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {
                    productos.map((product: Producto, index) => (
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