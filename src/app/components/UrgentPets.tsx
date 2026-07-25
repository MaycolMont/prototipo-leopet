import React from 'react';
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgPluto from "../../imports/Landing/7abaafcc2a09d50e0fc877db77c9c704cd360ae6.png";

interface PetCardProps {
  name: string;
  breed: string;
  age: string;
  foundation: string;
  status: string;
  image: any;
}

function PetCard({ name, breed, age, foundation, status, image }: PetCardProps) {
  return (
    <div className="bg-white rounded-[24px] border border-[#b1d0d5] overflow-hidden flex flex-col h-full group">
      <div className="relative h-[240px] overflow-hidden">
        <ImageWithFallback src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-4 left-4 bg-white/90 px-4 py-1 rounded-full text-[#66949b] text-sm font-medium">
          {age}
        </div>
      </div>
      <div className="p-8 flex flex-col gap-4 flex-grow">
        <div className="flex items-end gap-4 border-b border-[#004955] pb-2">
          <h3 className="text-[#0598ae] text-[32px] font-medium leading-none">{name}</h3>
          <span className="text-[#66949b] text-[20px] font-light leading-none">{breed}</span>
        </div>
        <div className="text-[#004955] text-[20px] font-semibold">
          {foundation}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#004955] text-[20px] font-semibold">Salud:</span>
          <div className="bg-[#47f6a1] text-[#0d9955] px-4 py-1 rounded-full flex items-center gap-2 text-base font-medium">
            <CheckCircle2 className="w-4 h-4 fill-[#0F9855] text-white" />
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}

export function UrgentPets() {
  const pets = [
    { name: "Pluto", breed: "Raza", age: "6 meses", foundation: "Fundación LEOPET", status: "Saludable", image: imgPluto },
    { name: "Luna", breed: "Raza", age: "1 año", foundation: "Fundación LEOPET", status: "Saludable", image: imgPluto },
    { name: "Toby", breed: "Raza", age: "2 años", foundation: "Fundación LEOPET", status: "Saludable", image: imgPluto }
  ];

  return (
    <section className="py-24 bg-gray-50 px-[100px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[#1b1c1c] text-[32px] font-bold font-['Plus_Jakarta_Sans'] mb-2">Casos urgentes</h2>
            <p className="text-[#3e494a] text-[16px] font-normal">Animales que necesitan apoyo inmediato para su salud o reubicación.</p>
          </div>
          <button className="text-[#00626d] text-[14px] font-semibold flex items-center gap-2 hover:underline">
            Ver todas las mascotas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pets.map((pet, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <PetCard {...pet} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
