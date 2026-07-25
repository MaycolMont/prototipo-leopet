import React from 'react';
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgMadeline from "../../imports/Landing/4dc920e99c2e98f921d04e2a964f2a21a4c21dc0.png";

export function Nosotros() {
  return (
    <section className="py-24 bg-white px-[100px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-24">
          <p className="font-['Libertinus_Serif'] italic text-[40px] text-[#004955] leading-[1.2] max-w-[1000px] mx-auto mb-6">
            Pues <span className="text-[#ee5871]">hemos nacido para colaborar</span>, al igual que los pies, las manos, los párpados, las hileras de dientes, superiores e inferiores. Obrar, pues, como adversarios los unos de los otros <span className="text-[#ee5871]">es contrario a la naturaleza</span>
          </p>
          <p className="font-['Host_Grotesk'] font-medium text-[24px] text-[#004955]">- Marco Aurelio</p>
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <ImageWithFallback 
              src={imgMadeline} 
              alt="Nosotros" 
              className="rounded-[24px] w-full aspect-[489/326] object-cover shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-[#0598ae] text-[32px] font-bold tracking-[1.92px] mb-6 uppercase">
              ¿QUIENES SOMOS?
            </h2>
            <div className="text-[#004955] text-[20px] font-normal leading-[1.5] space-y-4">
              <p>
                Somos <span className="font-bold">Grupo Leopet</span>, un equipo de estudiantes de la <span className="font-bold">Escuela Superior Politécnica del Litoral</span> (ESPOL), apasionados por la tecnología y <span className="font-bold">el bienestar animal</span>.
              </p>
              <p>
                Este proyecto nació en el marco de la materia de Ingeniería de Software I, con el objetivo de aplicar nuestros conocimientos <span className="font-bold">para crear una solución real</span> a un problema tangible en nuestra comunidad, los animales de compañía sin hogar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
