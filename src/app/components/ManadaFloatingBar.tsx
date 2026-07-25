import React from "react";
import { Link } from "react-router";
import { Heart, ChevronRight } from "lucide-react";
import { useManada } from "../context/ManadaContext";

export function ManadaFloatingBar() {
  const { pets } = useManada();

  if (pets.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Link
        to="/mi-manada/configurar"
        className="bg-[#00626d] hover:bg-[#004955] text-white pl-5 pr-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all hover:shadow-xl group"
      >
        <div className="relative">
          <Heart size={22} className="text-[#07c4e1]" />
          <span className="absolute -top-2 -right-2 bg-[#ee5871] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {pets.length}
          </span>
        </div>
        <span className="font-medium text-sm hidden sm:inline">Ver mi Manada</span>
        <ChevronRight size={16} className="text-[#07c4e1] group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
