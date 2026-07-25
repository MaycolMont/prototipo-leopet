import React, { useState } from 'react';
import { motion } from "motion/react";
import { Search, SlidersHorizontal, CheckCircle2, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useManada } from '../context/ManadaContext';
import { MOCK_PETS } from '../lib/mockData';

function PetCard({ pet, onApadrinar }: { pet: typeof MOCK_PETS[0]; onApadrinar: (pet: typeof MOCK_PETS[0]) => void }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#b1d0d5] overflow-hidden flex flex-col h-full group transition-shadow hover:shadow-lg">
      <Link to={`/mascota/${pet.id}`} className="relative h-[240px] overflow-hidden block">
        <ImageWithFallback src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-4 left-4 bg-white/90 px-4 py-1 rounded-full text-[#66949b] text-sm font-medium">
          {pet.age}
        </div>
      </Link>
      <div className="p-8 flex flex-col gap-4 flex-grow">
        <div className="flex items-end gap-4 border-b border-[#004955] pb-2">
          <h3 className="text-[#0598ae] text-[32px] font-medium leading-none">{pet.name}</h3>
          <span className="text-[#66949b] text-[20px] font-light leading-none">{pet.breed}</span>
        </div>
        <div className="text-[#004955] text-[20px] font-semibold">
          {pet.foundation}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#004955] text-[20px] font-semibold">Salud:</span>
          <div className="bg-[#47f6a1] text-[#0d9955] px-4 py-1 rounded-full flex items-center gap-2 text-base font-medium">
            <CheckCircle2 className="w-4 h-4 fill-[#0F9855] text-white" />
            {pet.status}
          </div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onApadrinar(pet); }}
          className="mt-auto w-full bg-[#00626d] text-[#07c4e1] py-3 rounded-full text-[16px] font-medium tracking-wide shadow-md hover:bg-[#004955] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart size={18} />
          Apadrinar
        </button>
      </div>
    </div>
  );
}

export function Catalog() {
  const navigate = useNavigate();
  const { addToManada, pets: manadaPets } = useManada();
  const [filter, setFilter] = useState<"todos" | "perro" | "gato">("todos");
  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = MOCK_PETS.filter((p) => {
    if (filter !== "todos" && p.category !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.breed.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleApadrinar = (pet: typeof MOCK_PETS[0]) => {
    if (manadaPets.some((mp) => mp.petId === pet.id)) {
      navigate("/mi-manada/configurar");
      return;
    }
    addToManada({
      id: `manada-${pet.id}`,
      petId: pet.id,
      name: pet.name,
      rescueName: pet.foundation,
      tag: pet.status === "Saludable" ? "SALUDABLE" : "ATENCIÓN",
      monthlyAmount: 25.00,
      category: pet.category === "perro" ? "Alimentación Canina" : "Alimentación Felina",
      image: pet.image,
    });
    setAddedId(pet.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="py-10 px-4 md:px-12 lg:px-[96px] bg-gray-50 border-b border-[#07c4e1]/20">
        <div className="max-w-[1248px] mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-2 border border-[#b1d0d5] rounded-full text-[#b1d0d5] hover:bg-gray-100 transition-colors">
                 <SlidersHorizontal size={18} />
                 <span className="font-medium text-[20px]">Filtros</span>
               </button>
               <div className="w-px h-10 bg-[#07c4e1]" />
               <div className="flex gap-3">
                 <button onClick={() => setFilter("todos")} className={`px-6 py-2 rounded-full font-medium text-[20px] transition-colors ${filter === "todos" ? "bg-[#07c4e1] text-white" : "bg-gray-200 text-[#004955] hover:bg-gray-300"}`}>Todos</button>
                 <button onClick={() => setFilter("perro")} className={`px-6 py-2 rounded-full font-medium text-[20px] transition-colors ${filter === "perro" ? "bg-[#ffac13] text-[#004955]" : "bg-gray-200 text-[#004955] hover:bg-gray-300"}`}>Perros</button>
                 <button onClick={() => setFilter("gato")} className={`px-6 py-2 rounded-full font-medium text-[20px] transition-colors ${filter === "gato" ? "bg-[#ee5871] text-white" : "bg-gray-200 text-[#004955] hover:bg-gray-300"}`}>Gatos</button>
               </div>
            </div>
          </div>
          
          <div className="relative w-full max-w-[400px]">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, raza..." 
              className="w-full pl-6 pr-12 py-3 border border-[#d9d9d9] rounded-full text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E1E1E]" size={18} />
          </div>
        </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-4 md:px-[96px] mt-12">
        <h2 className="text-[#004955] text-[32px] font-bold mb-10">Explora nuestras mascotas</h2>

        {addedId && (
          <div className="mb-6 bg-[#47f6a1]/20 border border-[#0d9955]/30 rounded-xl p-4 flex items-center gap-3 text-[#0d9955] font-medium animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 size={20} />
            Mascota agregada a tu Manada
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pet, i) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <PetCard pet={pet} onApadrinar={handleApadrinar} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontraron mascotas con esos filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
