import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "./globals.css";
import HeaderLayout from "@/components/header";
export const metadata: Metadata = {
  title: "Food-Recomendation-UVG",
  description: "Sistema de recomendación de comida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <HeaderLayout>{children}
        </HeaderLayout>
      </body> 
    </html>
  );
}
