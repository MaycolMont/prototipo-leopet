import React, { useMemo } from 'react';
import { motion } from "motion/react";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MOCK_PETS } from '../lib/mockData';
import { topFeatured, isHighPriority, type ScoredPet } from '../lib/recommendation';

function FeaturedCard({ pet }: { pet: ScoredPet }) {
  const urgent = isHighPriority(pet.score);

  return (
    <Link
      to={`/mascota/${pet.id}`}
      className="bg-white rounded-[24px] border border-[#b1d0d5] overflow-hidden flex flex-col h-full group hover:shadow-lg transition-shadow"
    >
      <div className="relative h-[240px] overflow-hidden">
        <ImageWithFallback src={pet.imagen} alt={pet.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute top-4 left-4 bg-white/90 px-4 py-1 rounded-full text-[#66949b] text-sm font-medium">
          {pet.edad} {pet.edad === 1 ? "año" : "años"}
        </span>
        {urgent && <div className="absolute top-0 left-0 right-0 h-1 bg-[#004955]" />}
      </div>
      <div className="p-8 flex flex-col gap-3 flex-grow">
        <div>
          <h3 className="text-[#004955] text-[28px] font-bold leading-tight">{pet.nombre}</h3>
          <p className="text-[#66949b] text-[18px] font-light">{pet.raza}</p>
        </div>
        <p className="text-[#3e494a] text-sm leading-relaxed line-clamp-2">{pet.descripcion}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-gray-500 text-sm">{pet.fundacionNombre}</span>
          {urgent && (
            <span className="text-[#004955] text-xs font-semibold">Necesita apoyo</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function UrgentPets() {
  const featured = useMemo(() => topFeatured(MOCK_PETS, 3), []);

  return (
    <section className="py-24 bg-gray-50 px-4 md:px-12 lg:px-[100px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[#1b1c1c] text-[32px] font-bold mb-2">Casos prioritarios</h2>
            <p className="text-[#3e494a] text-[16px]">Animales que necesitan apoyo inmediato.</p>
          </div>
          <Link to="/mascotas" className="text-[#00626d] text-sm font-semibold flex items-center gap-2 hover:underline">
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((pet, idx) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <FeaturedCard pet={pet} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
