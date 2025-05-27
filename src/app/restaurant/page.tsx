"use client";
import React, { useEffect, useState } from "react";
import GridProducts from "@/components/gird-products";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Restaurant() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [products, setProducts] = useState({});

  const loadRestaurants = async () => {
    const res = await fetch('/api/restaurant/get-all', {
      method: 'GET',
    });
    const data = await res.json();
    if (res.ok) {
      setRestaurantes(data);
    } else {
      console.error('request error');
    }
  };

  const loadProductsByRestaurants = async (restaurant:string) => {
    const res = await fetch('/api/restaurant/get-products', {
      method: 'POST',
      body: JSON.stringify({ nombre: restaurant }),
    });
    const data = await res.json();
    if (res.ok) {
      setProducts(prev => ({
        ...prev,
        [restaurant]: data.productos
      }));
    } else {
      console.error(data.error || 'request error');
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (restaurantes.length > 0) {
      restaurantes.forEach(restaurante => {
        loadProductsByRestaurants(restaurante);
      });
    }
  }, [restaurantes]);

  return (
    <div>
      {
        restaurantes?.map( (restaurante, index) => {
          return (
            <GridProducts
              key={`${restaurante}-${index}`}
              title={restaurante}
              productos={products[restaurante] || []}
            />
          )
        })
      }
    </div>
  );
}