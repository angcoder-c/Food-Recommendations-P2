"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type ImageType = {
  name: string;
  image: string;
};

type ImagesByRestaurant = {
  [key: string]: ImageType[];
};

export default function Restaurant() {
  const [images, setImages] = useState<ImagesByRestaurant>({});

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await fetch("/api/restaurant/get-all", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        // Assuming the API returns an array of restaurant names
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        return [];
      }
    }

    async function getAllRestaurantNames(): Promise<string[]> {
      try {
        const res = await fetch("/api/restaurant/get-all", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error fetching restaurant names:", error);
        return [];
      }
    }
    const restaurants =  getAllRestaurantNames();
    async function fetchProducts(restaurantNames: string[]) {
      try {
        const restaurants = restaurantNames.length > 0 ? restaurantNames : await fetchRestaurants();
        if (restaurants.length === 0) {
          console.warn("No restaurants found.");
          return;
        }
        const fetches = await Promise.all(
          restaurants.map(async (nombre) => {
            const res = await fetch("/api/restaurant/get-products", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ nombre }),
            });
            const text = await res.text();
            console.log("API response for", nombre, ":", text);
            return JSON.parse(text);
          })
        );

        function mapProducts(dataArray: any[]) {
          return dataArray.flatMap((data) =>
            data.productos.map((product: any) => ({
              name: product.nombre,
              image: product.img, 
            }))
          );
        }

        const imagesObj: ImagesByRestaurant = {};
        restaurants.forEach((rest, idx) => {
          imagesObj[rest] = mapProducts([fetches[idx]]);
        });

        setImages(imagesObj);
      } catch (error) {
        console.error("Error fetching products:", error);
      }    

    }
    getAllRestaurantNames().then((restaurantNames) => {
      fetchProducts(restaurantNames);
    }
  );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg"
      title="Restaurantes y sus productos">
        <h1 className="text-2xl font-bold mb-6 text-center">Restaurantes y sus productos</h1>
        <div className="flex flex-col gap-8">
          {Object.entries(images).map(([restaurant, imgs]) => (
        <div key={restaurant}>
          <h1 className="text-xl font-bold mb-4 text-center">{restaurant}</h1>
          <div className="grid grid-cols-4 gap-4 text center">
            {imgs.map((img) => (
          <div key={restaurant + "-" + img.name} className="flex flex-col items-center">
            <Image
              className="rounded-lg mb-2"
              src={img.image}
              alt={img.name}
              width={150}
              height={100}
            />
            <span className="font-bold text-sm">{img.name}</span>
          </div>
            ))}
          </div>
        </div>
          ))}
        </div>
      </Card>
    </div>
  );
}