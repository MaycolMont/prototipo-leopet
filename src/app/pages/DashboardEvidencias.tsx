import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useManada } from '../context/ManadaContext';
import { useFavoritos } from '../context/FavoritosContext';
import { DashboardLayout } from './DashboardLayout';
import { EvidenceCard } from '../components/EvidenceCard';
import { MOCK_EVIDENCE } from '../lib/mockData';
import { PawPrint, Heart } from 'lucide-react';

export function DashboardEvidencias() {
  const { isAuthenticated } = useAuth();
  const { mascotas } = useManada();
  const { favoritos } = useFavoritos();
  const [tab, setTab] = useState<"apadrinados" | "favoritas">("apadrinados");

  const sponsoredIds = new Set(mascotas.map((a) => a.animalId));

  const misApadrinados = MOCK_EVIDENCE.filter((ev) => sponsoredIds.has(ev.mascotaId));
  const deFavoritas = MOCK_EVIDENCE.filter(
    (ev) => favoritos.includes(ev.fundacionId) && !sponsoredIds.has(ev.mascotaId)
  );

  const activeList = tab === "apadrinados" ? misApadrinados : deFavoritas;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-[#004955] text-2xl font-semibold">Evidencias Recibidas</h2>
          <p className="text-[#3e494a] text-sm mt-1">
            Califica las fotos y videos enviados por las fundaciones de tus mascotas apadrinadas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab("apadrinados")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              tab === "apadrinados"
                ? "bg-[#004955] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <PawPrint size={14} />
            Mis apadrinados ({misApadrinados.length})
          </button>
          <button
            onClick={() => setTab("favoritas")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              tab === "favoritas"
                ? "bg-[#ee5871] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Heart size={14} className={tab === "favoritas" ? "fill-white" : ""} />
            Favoritas ({deFavoritas.length})
          </button>
        </div>

        {tab === "favoritas" && deFavoritas.length > 0 && (
          <p className="text-xs text-gray-400 italic">
            Estas evidencias son de solo lectura. Para calificar, apadrina la mascota directamente.
          </p>
        )}

        {activeList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#BDC8CA]/40">
            <PawPrint size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">
              {tab === "apadrinados"
                ? "Aún no tienes evidencias de tus apadrinados"
                : "Aún no hay evidencias de tus fundaciones favoritas"}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {tab === "apadrinados"
                ? "Las fundaciones enviarán fotos y videos pronto."
                : "Las fundaciones favoritas publicarán avances pronto."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeList.map((ev) => (
              <EvidenceCard
                key={ev.id}
                id={ev.id}
                mascotaNombre={ev.mascotaNombre}
                fundacionNombre={ev.fundacionNombre}
                tipo={ev.tipo}
                titulo={ev.titulo}
                descripcion={ev.descripcion}
                imagenUrl={ev.imagenUrl}
                fecha={ev.fecha}
                canRate={tab === "apadrinados"}
                calificacion={ev.calificacion}
                comentario={ev.comentario}
                estado={ev.estado}
                onRate={tab === "apadrinados" ? (cal, com) => {
                  // handled locally in parent if needed
                } : undefined}
                onReport={tab === "apadrinados" ? (motivo) => {
                  // handled locally in parent if needed
                } : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
