import React from 'react';
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgAndrewPons from "../../imports/Landing/a400d79d4372f336b630662c5699951094ef93e1.png";
import imgLogo from "../../imports/Landing/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png"; // Assuming standard naming if I had full path, but using the vectorized one from index.tsx

// Since the logo is vectorized in index.tsx, I'll use a placeholder or the import if I can find it.
// Actually, index.tsx uses Group() for the logo. I'll stick to a placeholder or simplified SVG for now if not found.

export function Hero() {
  return (
    <section className="relative h-[500px] sm:h-[700px] lg:h-[960px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src={imgAndrewPons} 
          alt="Dona y apadrina" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#152325]/80" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-end px-6 sm:px-12 lg:px-[100px] text-right">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white text-3xl sm:text-5xl lg:text-[75px] font-bold font-['Host_Grotesk'] leading-tight lg:leading-[81px] tracking-[-1.5px] mb-4">
            Dona y apadrina<br className="hidden sm:block" /> animales vulnerables
          </h1>
          <p className="text-white text-lg sm:text-2xl lg:text-[36px] font-normal font-['Host_Grotesk'] tracking-[-0.72px] mb-6 lg:mb-10 max-w-[700px]">
            Conoce los casos de diversas fundaciones
          </p>
          
          <button className="bg-[#07c4e1] text-[#004955] px-6 sm:px-8 lg:px-12 py-3 lg:py-4 rounded-full font-medium text-base sm:text-xl lg:text-[24px] flex items-center gap-3 lg:gap-4 hover:bg-[#06aec8] transition-colors ml-auto">
            <span className="hidden sm:inline">¿Tienes una fundación?</span>
            <span className="sm:hidden">¿Eres fundación?</span>
            <svg width="31" height="15" viewBox="0 0 31 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.425 1.5L29.425 7.5L23.425 13.5M1.425 7.5H29.425" stroke="#004955" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>

      <div className="absolute top-6 sm:top-[80px] right-6 sm:right-[100px] z-20 w-[120px] sm:w-[200px]">
        <div className="text-[#EE5871] font-bold text-2xl sm:text-4xl tracking-tighter">LEOPET</div>
      </div>
    </section>
  );
}
