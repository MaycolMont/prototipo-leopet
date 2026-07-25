import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from "motion/react";
import { MapPin, Info, Heart, ShieldAlert, Star, CheckCircle, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useManada } from '../context/ManadaContext';
import { MOCK_PETS } from '../lib/mockData';

export function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToManada, pets: manadaPets } = useManada();
  const [added, setAdded] = useState(false);

  const pet = MOCK_PETS.find((p) => p.id === id) || MOCK_PETS[0];

  const isInManada = manadaPets.some((mp) => mp.petId === pet.id);

  const handleApadrinar = () => {
    if (isInManada) {
      navigate('/mi-manada/configurar');
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="pt-8">
        <section className="px-4 md:px-12 lg:px-[96px] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[600px]">
            <div className="lg:col-span-2 relative rounded-[24px] overflow-hidden group shadow-lg min-h-[350px]">
              <ImageWithFallback src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-6 left-6 flex flex-wrap gap-3">
                <span className="bg-[#00626d]/90 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">Apadrinamiento Urgente</span>
                <span className="bg-white/90 backdrop-blur-md text-[#3e494a] px-4 py-1 rounded-full text-sm font-semibold tracking-wide">Encontrado en {pet.location}</span>
              </div>
            </div>
            
            <div className="bg-white border border-[#BDC8CA]/30 rounded-[24px] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h1 className="text-[#1b1c1c] text-[40px] font-semibold tracking-[1.6px] mb-2">{pet.name}</h1>
                <div className="flex items-center gap-2 text-[#004955] mb-8">
                  <MapPin size={18} className="text-[#00626D]" />
                  <span className="text-sm font-semibold tracking-wide">{pet.foundation}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-8">
                  <div>
                    <p className="text-[#6e797b] text-[12px] font-medium tracking-widest uppercase mb-1">Edad</p>
                    <p className="text-[#1b1c1c] text-[24px] font-bold">{pet.age}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#6e797b] text-[12px] font-medium tracking-widest uppercase mb-1">Raza</p>
                    <p className="text-[#1b1c1c] text-[24px] font-bold">{pet.breed}</p>
                  </div>
                  <div>
                    <p className="text-[#6e797b] text-[12px] font-medium tracking-widest uppercase mb-1">Sexo</p>
                    <p className="text-[#1b1c1c] text-[24px] font-bold">{pet.sex}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#6e797b] text-[12px] font-medium tracking-widest uppercase mb-1">Peso</p>
                    <p className="text-[#1b1c1c] text-[24px] font-bold">{pet.weight}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {added && (
                  <div className="bg-[#47f6a1]/20 border border-[#0d9955]/30 rounded-xl p-3 flex items-center gap-2 text-[#0d9955] font-medium text-sm animate-in fade-in duration-200">
                    <CheckCircle2 size={16} />
                    Agregado a tu Manada
                  </div>
                )}
                <button
                  onClick={handleApadrinar}
                  className="w-full bg-[#00626d] text-[#07c4e1] py-4 rounded-full text-[20px] font-medium tracking-wide shadow-md hover:bg-[#004955] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Heart size={20} />
                  {isInManada ? "Ver en Mi Manada" : `Apadrinar ${pet.name}`}
                </button>
                <p className="text-xs text-center text-gray-500">
                  {isInManada ? "Esta mascota ya está en tu manada." : `Agrega a ${pet.name} a tu manada por defecto para su cuidado integral.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-12 lg:px-[96px] py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="mb-12">
                <div className="flex items-center gap-6 mb-8">
                   <div className="w-1 bg-[#00626d] h-10 rounded-full" />
                   <h2 className="text-[#1b1c1c] text-[32px] font-bold tracking-tight">La historia de {pet.name}</h2>
                </div>
                <div className="text-[#3e494a] text-[18px] leading-[1.6] space-y-6 max-w-[800px]">
                  {pet.story.split('. ').reduce((acc: string[], sentence, i) => {
                    if (i % 2 === 0) acc.push(sentence);
                    else acc[acc.length - 1] += '. ' + sentence;
                    return acc;
                  }, []).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}.</p>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <h3 className="text-[#1b1c1c] text-[24px] font-bold tracking-wide mb-8">Estado de Salud</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pet.healthStatus.map((item, idx) => (
                    <div key={idx} className="bg-white border border-[#BDC8CA]/30 p-6 rounded-[12px] flex gap-4">
                      <div className="bg-[#0598AE]/20 p-3 rounded-lg flex-shrink-0 text-[#004955]">
                        <Info size={24} className="text-[#004955]" />
                      </div>
                      <div>
                        <h4 className="text-[#1b1c1c] text-sm font-bold tracking-wide mb-1">{item.title}</h4>
                        <p className="text-[#3e494a] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#004955] text-white p-8 rounded-[24px] shadow-sm space-y-4">
                <h3 className="text-2xl font-semibold text-[#07c4e1]">¿Por qué apadrinar?</h3>
                <p className="text-sm leading-relaxed text-gray-200">
                  El apadrinamiento permite cubrir los costos mensuales de alimento, salud y estancia de {pet.name} en la fundación sin tener que adoptarlo formalmente de inmediato.
                </p>
                <div className="pt-4 border-t border-white/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#07c4e1]" />
                    <span>Reportes mensuales con fotos y vídeos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#07c4e1]" />
                    <span>Visitas programadas al refugio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
