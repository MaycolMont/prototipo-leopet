import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { EvidenceCard } from '../components/EvidenceCard';
import { MOCK_EVIDENCE } from '../lib/mockData';
import { PawPrint } from 'lucide-react';

export function DashboardEvidencias() {
  const { isAuthenticated } = useAuth();
  const [evidencias, setEvidencias] = useState(MOCK_EVIDENCE);

  const handleRate = (evidenceId: string, calificacion: number, comentario: string) => {
    setEvidencias((prev) =>
      prev.map((ev) =>
        ev.id === evidenceId ? { ...ev, calificacion, comentario } : ev
      )
    );
  };

  const handleReport = (evidenceId: string, motivo: string) => {
    setEvidencias((prev) =>
      prev.map((ev) =>
        ev.id === evidenceId ? { ...ev, estado: "en_revision" as const } : ev
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-[#004955] text-2xl font-semibold">Evidencias Recibidas</h2>
          <p className="text-[#3e494a] text-sm mt-1">
            Califica las fotos y videos enviados por las fundaciones de tus mascotas apadrinadas.
          </p>
        </div>

        {evidencias.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#BDC8CA]/40">
            <PawPrint size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Aún no tienes evidencias</p>
            <p className="text-gray-400 text-sm mt-1">Las fundaciones enviarán fotos y videos pronto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evidencias.map((ev) => (
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
                calificacion={ev.calificacion}
                comentario={ev.comentario}
                estado={ev.estado}
                onRate={(cal, com) => handleRate(ev.id, cal, com)}
                onReport={(motivo) => handleReport(ev.id, motivo)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
