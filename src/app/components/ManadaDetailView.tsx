import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Trash2, CreditCard, Heart, ShieldAlert, Check } from 'lucide-react';
import imgJasper from "../../imports/Manada/05315c921ffb0646b298e09ecd7293761ebbf584.png";
import imgMain from "../../imports/DetalleDeMascotaLeoPet/b5e67b3823fbd4287dcd8b82dc791a0d64b1d4a9.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface ApadrinadaPet {
  id: string;
  name: string;
  rescueName: string;
  tag: string;
  amount: number;
  category: string;
  image: string;
}

const defaultPetsMap: Record<string, ApadrinadaPet[]> = {
  "mi-manada": [
    {
      id: "pluto",
      name: "Pluto",
      rescueName: "Refugio Almas Peludas, GYE",
      tag: "URGENT CARE",
      amount: 4.25,
      category: "Alimentación Especial",
      image: imgMain,
    },
    {
      id: "jasper-1",
      name: "Jasper",
      rescueName: "Sunshine Rescue, AZ",
      tag: "URGENT CARE",
      amount: 4.25,
      category: "Medical Supplies",
      image: imgJasper,
    },
    {
      id: "jasper-2",
      name: "Jasper",
      rescueName: "Sunshine Rescue, AZ",
      tag: "URGENT CARE",
      amount: 4.25,
      category: "Medical Supplies",
      image: imgJasper,
    },
    {
      id: "jasper-3",
      name: "Jasper",
      rescueName: "Sunshine Rescue, AZ",
      tag: "URGENT CARE",
      amount: 4.25,
      category: "Medical Supplies",
      image: imgJasper,
    }
  ],
  "mininos": [
    {
      id: "jasper-m1",
      name: "Michi",
      rescueName: "Refugio Amigos Felinos",
      tag: "RESCUE",
      amount: 4.25,
      category: "Alimentación",
      image: imgJasper,
    }
  ],
  "tratamientos": [
    {
      id: "jasper-t1",
      name: "Rocky",
      rescueName: "Huellitas Sanas",
      tag: "HIGH PRIORITY",
      amount: 8.50,
      category: "Tratamiento Ortopédico",
      image: imgJasper,
    }
  ]
};

export function ManadaDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const manadaId = id || "mi-manada";

  const [pets, setPets] = useState<ApadrinadaPet[]>(defaultPetsMap[manadaId] || defaultPetsMap["mi-manada"]);

  const totalMonthly = pets.reduce((acc, p) => acc + p.amount, 0);

  const handleRemovePet = (petId: string) => {
    setPets(pets.filter(p => p.id !== petId));
  };

  const getManadaTitle = () => {
    switch (manadaId) {
      case "mi-manada": return "Mi Manada";
      case "mininos": return "Mininos";
      case "tratamientos": return "Tratamientos";
      case "zoo": return "Zoo";
      default: return manadaId.charAt(0).toUpperCase() + manadaId.slice(1);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-70px)] py-10 px-4 md:px-12 lg:px-24">
      {/* Navigation & Header */}
      <div className="mb-8">
        <Link
          to="/manadas"
          className="inline-flex items-center gap-2 text-[#004955] hover:text-[#00626d] font-medium mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a Mis Manadas
        </Link>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[#004955] text-3xl md:text-4xl font-semibold tracking-wide">
              {getManadaTitle()} ({pets.length})
            </h1>
            <p className="text-[#3e494a] text-sm mt-1">
              Mascotas apadrinadas pertenecientes a esta manada.
            </p>
          </div>

          <button
            onClick={() => navigate('/carrito')}
            disabled={pets.length === 0}
            className={`font-medium text-lg px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-sm ${
              pets.length > 0
                ? "bg-[#07c4e1] hover:bg-[#06aec8] text-[#004955] cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <CreditCard size={20} />
            Pagar Apadrinamientos (${totalMonthly.toFixed(2)})
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pets List (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {pets.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <Heart size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-[#004955] text-xl font-semibold mb-2">No hay mascotas en esta manada</h3>
              <p className="text-gray-500 text-sm mb-6">
                Puedes apadrinar mascotas desde el catálogo y agregarlas aquí.
              </p>
              <Link
                to="/mascotas"
                className="bg-[#004955] text-white px-6 py-3 rounded-full font-medium inline-block hover:bg-[#00626d] transition-colors"
              >
                Explorar mascotas
              </Link>
            </div>
          ) : (
            pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Pet Image */}
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <ImageWithFallback
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pet Details */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#004955] text-xs font-semibold tracking-wider uppercase">
                      {pet.tag}
                    </span>
                    <div className="text-right">
                      <span className="text-[#004955] text-2xl font-bold">
                        ${pet.amount.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#3e494a] block">/mensualmente</span>
                    </div>
                  </div>

                  <h3 className="text-[#1b1c1c] text-2xl font-semibold">{pet.name}</h3>

                  <div className="flex items-center gap-1.5 text-[#3e494a] text-sm">
                    <MapPin size={16} className="text-[#004955]" />
                    <span>{pet.rescueName}</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100">
                    <span className="bg-[#e1e4d4] text-[#626659] text-xs font-medium px-3 py-1 rounded-full">
                      {pet.category}
                    </span>

                    <button
                      onClick={() => handleRemovePet(pet.id)}
                      className="text-[#004955] hover:text-red-600 text-sm font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={16} />
                      Remover de manada
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Summary (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
            <h3 className="text-[#004955] text-xl font-semibold border-b border-gray-100 pb-4">
              Resumen de Apadrinamiento
            </h3>

            <div className="space-y-3 text-sm text-[#3e494a]">
              <div className="flex justify-between">
                <span>Total de mascotas:</span>
                <span className="font-semibold text-[#004955]">{pets.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Frecuencia:</span>
                <span className="font-semibold text-[#004955]">Mensual Recurrente</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#004955] border-t border-gray-100 pt-3">
                <span>Monto Total:</span>
                <span>${totalMonthly.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="bg-[#07c4e1]/10 border border-[#07c4e1]/30 rounded-xl p-4 text-xs text-[#004955] space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <Check size={16} className="text-[#07c4e1]" />
                Impacto directo y transparente
              </p>
              <p>
                Tus donaciones cubren alimentación, vacunas y atención veterinaria especializada para cada miembro de la manada.
              </p>
            </div>

            <button
              onClick={() => navigate('/carrito')}
              disabled={pets.length === 0}
              className={`w-full font-medium text-lg py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md ${
                pets.length > 0
                  ? "bg-[#07c4e1] hover:bg-[#06aec8] text-[#004955] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <CreditCard size={20} />
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
