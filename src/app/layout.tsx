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
      <body className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
          <Footer />
        </main>
      </body> 
    </html>
  );
}
