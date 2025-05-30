'use client'

import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

export type Producto = {
    nombre : string,
    restaurante : string,
    tipo : string,
    precio : number | {low : number, high : number},
    img: string,
    likes : number
}

export default function ProductCard ({ producto } : { producto : Producto }) {
    const { userId, likesum, likeCount, likedProducts, addLikedProduct } = useAuthStore()
    const [currentLikes, setCurrentLikes] = useState(producto.likes)
    const [isLoading, setIsLoading] = useState(false)

    const hasLiked = likedProducts.includes(producto.nombre)


    const likeProduct = async (productName: string) => {
      if (!userId || hasLiked || isLoading) return

      setIsLoading(true)
      
      try {
        const res = await fetch('/api/user/user-like-product', {
          method: 'POST',
          body: JSON.stringify({ usuarioId: userId, productoNombre: productName }),
        })
        const data = await res.json()
        
        if (res.ok) {
          setCurrentLikes(data.newLikes || currentLikes + 1)
          addLikedProduct(productName)
          likesum(likeCount + 1)
        } else {
          console.error(data.error || 'request error')
        }
      } catch (error) {
        console.error('Error liking product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      setCurrentLikes(producto.likes)
    }, [producto.likes])

    return (
        <Card 
            style={{ overflow: "hidden" }}
            className="bg-gray-800 border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
        >
            <CardContent className="p-0">
                <div className="h-32 rounded-t-lg flex items-center justify-center transition-colors overflow-hidden">
                  <Image 
                    src={producto.img} 
                    alt={`${producto.nombre} - ${producto.restaurante}`} 
                    height={150} 
                    width={150}
                    className="object-cover rounded-t-lg"
                  />
                </div>
                
                <div className="p-4 space-y-2">
                    <h3 className="text-white font-medium text-sm group-hover:text-green-400 transition-colors">
                      {producto.nombre}
                    </h3>
                    <Link
                      href={`/restaurant`}
                      className="text-green-400 hover:text-green-300 text-xs underline-offset-2 hover:underline block"
                    >
                      {producto.restaurante}
                    </Link>
                    <div className="flex gap-2 items-center">
                      <Badge variant={'outline'} className="border-green-500 text-green-400 text-xs">
                        Q {typeof producto.precio === 'number' ? producto.precio : producto.precio.low}
                      </Badge>
                      {userId && (
                        <Button 
                          onClick={() => likeProduct(producto.nombre)} 
                          variant="ghost" 
                          className={`text-xs transition-all duration-200 ${
                            hasLiked 
                              ? 'text-green-300 bg-green-700/50 cursor-not-allowed' 
                              : 'text-green-400 hover:text-green-300 bg-gray-700 hover:bg-green-700/30'
                          }`}
                          disabled={hasLiked || isLoading}
                        >
                          {isLoading ? (
                            <span className="animate-pulse">⏳</span>
                          ) : (
                            <span>
                              {hasLiked ? '✅' : '👍'}
                            </span>
                          )}
                          <span className="ml-1">{currentLikes}</span>
                        </Button>
                      )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}