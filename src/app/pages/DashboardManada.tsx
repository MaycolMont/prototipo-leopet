import React, { useState } from 'react';
import { Link } from 'react-router';
import { Trash2, Pause, Play, CreditCard, AlertCircle, PawPrint } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useManada } from '../context/ManadaContext';
import { DashboardLayout } from './DashboardLayout';

export function DashboardManada() {
  const { subscriptions, pauseSubscription, resumeSubscription, removePetFromSubscription } = useSubscriptions();
  const { pets, updatePetAmount, removeFromManada, totalMonthly } = useManada();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-[#004955] text-2xl font-semibold">Gestionar Manada</h2>
          <p className="text-[#3e494a] text-sm mt-1">
            Modifica montos, pausa cobros o elimina mascotas de tus suscripciones.
          </p>
        </div>

        {/* Pending Manada (cart) */}
        {pets.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#004955] text-lg font-semibold">Manada Pendiente de Pago</h3>
              <Link to="/mi-manada/configurar" className="text-[#07c4e1] text-sm font-medium hover:underline">
                Configurar →
              </Link>
            </div>
            <div className="space-y-3">
              {pets.map((pet) => (
                <div key={pet.petId} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#004955] font-medium text-sm">{pet.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={5}
                      max={100}
                      step={5}
                      value={pet.monthlyAmount}
                      onChange={(e) => updatePetAmount(pet.petId, Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-[#07c4e1] outline-none"
                    />
                    <span className="text-xs text-gray-500">/mes</span>
                    <button
                      onClick={() => removeFromManada(pet.petId)}
                      className="text-red-400 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[#004955] font-semibold">Total pendiente:</span>
              <span className="text-[#004955] font-bold text-lg">${totalMonthly.toFixed(2)}/mes</span>
            </div>
          </div>
        )}

        {/* Active Subscriptions */}
        <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-6 shadow-sm">
          <h3 className="text-[#004955] text-lg font-semibold mb-4">Suscripciones Activas</h3>

          {subscriptions.length === 0 ? (
            <div className="text-center py-10">
              <AlertCircle size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">Aún no tienes suscripciones activas</p>
              <Link to="/mascotas" className="text-[#07c4e1] text-sm font-medium hover:underline">Explorar mascotas</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="border border-gray-100 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#004955] font-semibold">
                        {sub.pets.map((p) => p.name).join(", ")}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Creada: {new Date(sub.createdAt).toLocaleDateString("es-EC")} · {sub.pets.length} mascota{sub.pets.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        sub.status === "active" ? "bg-[#004955]/10 text-[#004955]" : "bg-gray-100 text-gray-500"
                      }`}>
                        {sub.status === "active" ? "Activa" : "Pausada"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sub.pets.map((pet) => (
                      <div key={pet.petId} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#004955]">{pet.name}</p>
                        </div>
                        <span className="text-sm font-bold text-[#004955]">${pet.monthlyAmount.toFixed(2)}/mes</span>
                        <button
                          onClick={() => removePetFromSubscription(sub.id, pet.petId)}
                          className="text-red-400 hover:text-red-600 p-1 transition-colors"
                          title="Eliminar de suscripción"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-[#004955]">
                      Total: ${sub.totalMonthly.toFixed(2)}/mes
                    </span>
                    <div className="flex gap-2">
                      {sub.status === "active" ? (
                        <button
                          onClick={() => pauseSubscription(sub.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition-colors"
                        >
                          <Pause size={14} />
                          Pausar 30 días
                        </button>
                      ) : (
                        <button
                          onClick={() => resumeSubscription(sub.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004955]/10 text-[#004955] text-xs font-medium hover:bg-[#004955]/20 transition-colors"
                        >
                          <Play size={14} />
                          Reanudar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
