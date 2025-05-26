"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/slider";

interface ImageType {
  src: string;
  text: string;
}

export default function RecomendationPage() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState<ImageType[]>([]);

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserId(userObj.id || null);
      } catch {
        setUserId(null);
      }
    } else {
      setUserId(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    async function fetchRecommendations() {
      try {
        const res = await fetch("/api/user/get-recomendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        });
        const data = await res.json();
        if (data.recomendaciones) {
          const imgs = data.recomendaciones.map(
            (rec: { producto: string }, idx: number) => ({
              src: `/images/${rec.producto
                .replace(/\s+/g, "")
                .toLowerCase()}.jpg`,
              text: rec.producto,
              name: rec.producto,
            })
          );
          setImages(imgs);
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [userId]);

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const res = await fetch("/api/products/get-products-more-likes", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.productos) {
          const imgs = data.productos.map(
            (prod: { nombre: string }, idx: number) => ({
              src: `/images/${prod.nombre
                .replace(/\s+/g, "")
                .toLowerCase()}.jpg`,
              text: prod.nombre,
            })
          );
          setTopProducts(imgs);
        }
      } catch (err) {
        console.error("Error fetching top products:", err);
      }
    }
    fetchTopProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          Recomendaciones para ti
        </h1>
        <p>Cargando recomendaciones...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            Recomendaciones para ti
          </h1>
          <p>Por favor inicia sesión para ver tus recomendaciones.</p>
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            Los más populares
          </h1>
          {images.length === 0 && <p>No hay recomendaciones disponibles.</p>}
          <Slider images={topProducts} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Recomendaciones para ti
      </h1>
      {images.length === 0 && <p>No hay recomendaciones disponibles.</p>}
      <Slider images={images} />
    </div>
  );
}
