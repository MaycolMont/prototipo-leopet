import React from 'react';
import { motion } from "motion/react";

export function Mission() {
  return (
    <section className="bg-[#004955] py-32 text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="bg-[#0598ae] rounded-[50px] p-12 mb-24 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-[32px] font-semibold tracking-[1.28px] mb-4">Estamos actuando por los animales</h2>
            <div className="text-[16px] font-normal tracking-[0.64px] max-w-[600px] leading-relaxed">
              <p>Desde el Despacho Legal de nuestro Centro Comunitario por la Liberación Animal (COLA); emprendemos la defensa de los derechos animales...</p>
            </div>
          </div>
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
             {/* Paw icon placeholder */}
             <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="90" cy="90" r="90" fill="#004955" />
                <path d="M70 90C70 100 80 110 90 110C100 110 110 100 110 90" stroke="#07C4E1" strokeWidth="5" />
             </svg>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold tracking-[1.6px] mb-4">Nuestra Misión</h2>
          <p className="text-[24px] font-normal tracking-[0.96px] text-white/80">Fortaleciendo la confianza entre donadores y fundaciones</p>
        </div>

        <div className="bg-[#013c45] rounded-[40px] p-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-[#0598ae] text-[48px] font-normal leading-[1.1] mb-8">
              Un Ecosistema de <span className="font-bold">Confianza y Transparencia</span>
            </h3>
            <p className="text-[20px] text-white/90 tracking-[0.4px] leading-relaxed">
              Nuestra misión es solucionar esto a través de una plataforma digital integral, diseñada para ser un sistema robusto y automatizado que facilite la gestión de donaciones y la interacción directa entre fundaciones de rescate animal y donadores, fomentando un ecosistema basado en <span className="text-[#07c4e1] font-semibold">la confianza, la transparencia y la rendición de cuentas</span>.
            </p>
          </div>
          <div className="text-[20px] text-white/80 space-y-6">
            <p>El sector de las fundaciones de rescate animal enfrenta desafíos significativos en la captación de fondos y la demostración transparente del impacto de las donaciones.</p>
            <p>La ausencia de mecanismos eficientes para la trazabilidad de las contribuciones y la verificación del cuidado animal genera desconfianza entre los donadores potenciales, lo que limita la sostenibilidad financiera de estas organizaciones.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
