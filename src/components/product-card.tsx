'use client'

import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export type Producto = {
    nombre : string,
    restaurante : string,
    tipo : string,
    precio : number,
    img: string
}

export default function ProductCard ({ producto } : { producto : Producto }) {
    return (
        <Card
        className="bg-gray-800 border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
        >
            <CardContent className="p-0">
                <div className="h-32 rounded-t-lg flex items-center justify-center transition-colors">
                    <img src={producto.img} alt={producto.nombre + producto.restaurante} />
                </div>
                
                <div className="p-4 space-y-2">
                    <h3 className="text-white font-medium text-sm group-hover:text-green-400 transition-colors">
                      {producto.nombre}
                    </h3>
                    <Link
                      href={`/restaurant/${producto.restaurante.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-green-400 hover:text-green-300 text-xs underline-offset-2 hover:underline block"
                    >
                      {producto.restaurante}
                    </Link>
                    <Badge variant={'outline'} className="border-green-500 text-green-400 text-xs">
                      Q {producto.precio}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}