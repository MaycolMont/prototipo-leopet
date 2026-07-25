import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { EvidenceCard } from '../components/EvidenceCard';
import { MOCK_EVIDENCE } from '../lib/mockData';
import { storage } from '../lib/storage';
import { PawPrint } from 'lucide-react';

export function DashboardEvidencias() {
  const { isAuthenticated } = useAuth();
  const ratings = storage.getEvidenceRatings();

  const handleRate = (evidenceId: string, rating: number, comment: string) => {
    const allRatings = storage.getEvidenceRatings();
    allRatings[evidenceId] = { rating, comment };
    storage.setEvidenceRatings(allRatings);
  };

  const handleReport = (evidenceId: string, reason: string) => {
    console.log(`Report submitted for ${evidenceId}: ${reason}`);
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

        {MOCK_EVIDENCE.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#BDC8CA]/40">
            <PawPrint size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Aún no tienes evidencias</p>
            <p className="text-gray-400 text-sm mt-1">Las fundaciones enviarán fotos y videos pronto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_EVIDENCE.map((ev) => (
              <EvidenceCard
                key={ev.id}
                id={ev.id}
                petName={ev.petName}
                foundationName={ev.foundationName}
                type={ev.type}
                title={ev.title}
                description={ev.description}
                imageUrl={ev.imageUrl}
                date={ev.date}
                initialRating={ratings[ev.id]?.rating}
                initialComment={ratings[ev.id]?.comment}
                onRate={(rating, comment) => handleRate(ev.id, rating, comment)}
                onReport={(reason) => handleReport(ev.id, reason)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
