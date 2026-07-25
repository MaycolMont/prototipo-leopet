import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#004955] text-white py-20 px-[100px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mb-20">
          <div>
            <h3 className="text-[24px] font-semibold tracking-[0.64px] mb-6">Contáctanos</h3>
            <div className="space-y-4 text-[16px] font-normal text-white/80">
              <p>consultas@leopet.com</p>
              <p>+593 099 123 4568</p>
            </div>
          </div>
          
          <div className="text-center">
             {/* Logo placeholder or similar */}
             <div className="text-white font-bold text-5xl tracking-tighter mb-4">LEOPET</div>
             <div className="flex justify-center gap-6 mt-6">
                <span className="text-[24px] font-semibold tracking-[0.48px]">Síguenos</span>
             </div>
          </div>

          <div className="flex flex-col items-end">
             {/* Logo in footer right area from design */}
             <div className="text-[#07C4E1] font-bold text-4xl mb-4">LEOPET</div>
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0598ae] flex items-center justify-center">
                  <span className="text-white text-xs">IG</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0598ae] flex items-center justify-center">
                  <span className="text-white text-xs">FB</span>
                </div>
             </div>
          </div>
        </div>

        <div className="border-t border-[#07C4E1]/30 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[16px] font-normal text-white/80 tracking-[0.32px]">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#07C4E1]">Términos y Condiciones</a>
              <div className="w-px h-6 bg-[#07C4E1]"></div>
              <a href="#" className="hover:text-[#07C4E1]">Política de privacidad</a>
            </div>
            <p>Leopet © 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
