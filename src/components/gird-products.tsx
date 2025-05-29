'use client';

import ProductCard from './product-card';
import { Producto } from './product-card';

export default function GridProducts({ title, productos } : { title:string, productos : Producto[] }) {
    const productosUnicos = Array.from(
        new Map(productos.map(p => [p.nombre, p])).values()
    );
    return (
        <div className="pb-4">
            <h2 className="text-2xl font-bold text-green-400 mb-8 flex items-center">
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {
                    productosUnicos.filter(producto => productos.indexOf(producto)!=-1).map((product: Producto, index) => {
                        return (
                        <ProductCard
                            key={(product?.nombre ?? `product-${index}`)+title}
                            producto={product}
                        />
                        )
                    })
                }
            </div>
        </div>
  );
}