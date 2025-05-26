"use client";
import React from "react";
import Navbar from "@/components/navbar";
import "../app/globals.css";


export default function HeaderLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Food-Recomendatigon-UVG</title>
        <meta name="description" content="Sistema de recomendación de comida" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}