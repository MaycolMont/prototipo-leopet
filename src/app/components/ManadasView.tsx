import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Plus, CreditCard, ChevronRight, Info, ShieldCheck, Heart, Trash2 } from 'lucide-react';
import imgAlimentacion from "../../imports/Manadas/9ec279e8e0b77d8a1cef5b76d12950fe70e8b841.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface ManadaItem {
  id: string;
  name: string;
  count: number;
  monthlyAmount: number;
  commission: number;
  subtotal: number;
  image?: string;
}

export const initialManadas: ManadaItem[] = [
  {
    id: "mi-manada",
    name: "Mi Manada",
    count: 5,
    monthlyAmount: 25.00,
    commission: 3.75,
    subtotal: 4.25,
    image: imgAlimentacion,
  },
  {
    id: "mininos",
    name: "Mininos",
    count: 5,
    monthlyAmount: 25.00,
    commission: 3.75,
    subtotal: 4.25,
    image: imgAlimentacion,
  },
  {
    id: "tratamientos",
    name: "Tratamientos",
    count: 5,
    monthlyAmount: 50.00,
    commission: 7.50,
    subtotal: 8.50,
    image: imgAlimentacion,
  },
  {
    id: "zoo",
    name: "Zoo",
    count: 0,
    monthlyAmount: 0.00,
    commission: 0.00,
    subtotal: 0.00,
    image: imgAlimentacion,
  }
];

export function ManadasView() {
  const navigate = useNavigate();
  const [manadasList, setManadasList] = useState<ManadaItem[]>(initialManadas);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [newManadaName, setNewManadaName] = useState("");

  const totalMensual = manadasList.reduce((acc, item) => acc + item.monthlyAmount, 0);

  const handleAddManada = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManadaName.trim()) return;

    const newM: ManadaItem = {
      id: newManadaName.toLowerCase().replace(/\s+/g, '-'),
      name: newManadaName.trim(),
      count: 0,
      monthlyAmount: 0.00,
      commission: 0.00,
      subtotal: 0.00,
      image: imgAlimentacion,
    };

    setManadasList([...manadasList, newM]);
    setNewManadaName("");
    setIsAddingModalOpen(false);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-70px)] py-10 px-4 md:px-12 lg:px-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#004955] text-3xl md:text-4xl font-semibold tracking-wide">
            Mis Manadas ({manadasList.length})
          </h1>
          <p className="text-[#3e494a] text-sm mt-1">
            Gestiona tus grupos de apadrinamiento y contribuye al bienestar animal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddingModalOpen(true)}
            className="bg-[#00626d] hover:bg-[#004955] text-[#07c4e1] font-medium text-lg px-6 py-3 rounded-full transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={20} />
            Agregar nueva Manada
          </button>

          <button
            onClick={() => navigate('/carrito')}
            disabled={totalMensual === 0}
            className={`font-medium text-lg px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-sm ${
              totalMensual > 0
                ? "bg-[#07c4e1] hover:bg-[#06aec8] text-[#004955] cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <CreditCard size={20} />
            Proceder al Pago (${totalMensual.toFixed(2)})
          </button>
        </div>
      </div>

      {/* Totals Banner */}
      <div className="border-t border-b border-[#BDC8CA]/40 py-4 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#004955] font-semibold text-xl md:text-2xl">
          <span>Monto total mensual</span>
          <span className="text-xs bg-[#07c4e1]/20 text-[#004955] px-2 py-1 rounded-full font-normal">
            Suscripción Recurrente
          </span>
        </div>
        <div className="text-[#004955] font-bold text-2xl md:text-3xl">
          ${totalMensual.toFixed(2)} USD
        </div>
      </div>

      {/* Manadas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {manadasList.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-[#BDC8CA]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Top Image Preview */}
            <div className="relative h-44 bg-gray-100 overflow-hidden">
              <ImageWithFallback
                src={m.image}
                alt={m.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-[#07c4e1] text-[#004955] font-bold text-xs px-3 py-1 rounded-full shadow">
                {m.count} {m.count === 1 ? 'Mascota' : 'Mascotas'}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#004955] text-2xl font-semibold tracking-wide">
                    {m.name}
                  </h2>
                </div>

                <div className="space-y-2 text-sm text-[#40484a]">
                  <div className="flex justify-between">
                    <span>Monto Mensual:</span>
                    <span className="font-semibold text-[#004955]">
                      ${m.monthlyAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Comisión de plataforma:</span>
                    <span>${m.commission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 border-t border-gray-100 pt-2">
                    <span>Subtotal por animal:</span>
                    <span>${m.subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to={`/manada/${m.id}`}
                  className="w-full bg-[#004955] hover:bg-[#00626d] text-white py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Ver Manada
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Manada Modal */}
      {isAddingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-[#004955] text-2xl font-semibold mb-2">Crear nueva Manada</h3>
            <p className="text-gray-600 text-sm mb-6">
              Organiza tus mascotas apadrinadas por categorías o proyectos personales.
            </p>

            <form onSubmit={handleAddManada} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Manada
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Rescatados del Parque, Cachorros, etc."
                  value={newManadaName}
                  onChange={(e) => setNewManadaName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#07c4e1] focus:border-transparent outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#004955] hover:bg-[#00626d] text-white font-medium transition-colors"
                >
                  Crear Manada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
