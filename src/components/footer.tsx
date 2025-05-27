import React from "react";
import logo from "../../public/uvgLogo.png";

export default function Footer() {
  return (
    <div className="bg-gray-100 border-t border-gray-300">
      <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center md:items-start text-black">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          {/* Replace with actual image */}
            <div className="w-full max-w-[140px] h-[80px] bg-gray-300 flex items-center justify-center">
            <img
              src={logo.src}
              alt="UVG Logo"
              className="w-full h-auto object-contain"
            />
            </div>
        </div>

        {/* Contact info */}
        <div className="text-center md:text-right">
          <p className="font-semibold mb-2">¿Tiene algún problema?</p>
          <p>
            Envíenos un correo electrónico a<br />
            <a
              href="mailto:servcios.tecnologia@uvg.edu.gt"
              className="text-blue-600 underline"
            >
              servicios.tecnologia@uvg.edu.gt
            </a>{" "}
            o comuníquese al <strong>2364-0336/40</strong>, extensión{" "}
            <strong>21551</strong>
          </p>
          <p className="mt-3">
            Horario de atención: Lunes a viernes de 7:00 a 20:00
            <br />
            Sábado de 7:00 a 15:00
          </p>
        </div>
      </div>
      <div className="bg-black text-white text-center py-2">
        Copyright © 2025
      </div>
    </div>
  );
}
