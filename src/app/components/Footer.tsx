import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#004955] text-white py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start mb-12 md:mb-20">
          <div>
            <h2 className="text-xl sm:text-[24px] font-semibold tracking-[0.64px] mb-6">Contáctanos</h2>
            <div className="space-y-3 text-sm sm:text-[16px] font-normal text-white/80">
              <p>
                <a href="mailto:consultas@leopet.com" className="hover:text-[#07c4e1] transition-colors underline-offset-4 hover:underline">consultas@leopet.com</a>
              </p>
              <p>
                <a href="tel:+5930991234568" className="hover:text-[#07c4e1] transition-colors underline-offset-4 hover:underline">+593 099 123 4568</a>
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-center">
             <div className="text-white font-bold text-3xl sm:text-5xl tracking-tighter mb-4">LEOPET</div>
             <div className="flex justify-center gap-6 mt-6">
                <span className="text-lg sm:text-[24px] font-semibold tracking-[0.48px]">Síguenos</span>
             </div>
          </div>

          <div className="flex flex-col md:items-end">
             <div className="text-[#07C4E1] font-bold text-3xl sm:text-4xl mb-4">LEOPET</div>
             <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#0598ae] flex items-center justify-center hover:bg-[#07c4e1] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Instagram de LeoPet">
                  <span className="text-white text-xs font-semibold">IG</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#0598ae] flex items-center justify-center hover:bg-[#07c4e1] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Facebook de LeoPet">
                  <span className="text-white text-xs font-semibold">FB</span>
                </a>
             </div>
          </div>
        </div>

        <div className="border-t border-[#07C4E1]/30 pt-8 md:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm sm:text-[16px] font-normal text-white/80 tracking-[0.32px]">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-[#07c4e1] transition-colors underline-offset-4 hover:underline">Términos y Condiciones</a>
              <div className="w-px h-6 bg-[#07C4E1] hidden sm:block" aria-hidden="true" />
              <a href="#" className="hover:text-[#07c4e1] transition-colors underline-offset-4 hover:underline">Política de privacidad</a>
            </div>
            <p>Leopet © 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
