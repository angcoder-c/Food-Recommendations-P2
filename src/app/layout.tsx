import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "./globals.css";
import HeaderLayout from "@/components/header";
import Footer from "@/components/footer";

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
        <Navbar/>
        <div className="pt-30 pb-10 px-12 min-h-screen bg-gray-900 text-white ptop">
          {children}
        </div>
      </body> 
    </html>
  );
}
