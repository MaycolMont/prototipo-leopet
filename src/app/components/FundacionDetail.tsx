import React from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, MapPin, PawPrint, CheckCircle2, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MOCK_FUNDACIONES } from '../../data/mockFundaciones';
import { MOCK_MASCOTAS } from '../../data/mockMascotas';
import { useManada } from '../context/ManadaContext';
import { useFavoritos } from '../context/FavoritosContext';

const statusLabel: Record<string, string> = {
  NO_APADRINADO: "Disponible",
  APADRINADO: "Apadrinado",
  EN_PROCESO: "En Proceso",
  ADOPTADO: "Adoptado",
};

export function FundacionDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToManada, pets: manadaPets } = useManada();
  const { isFavorito, toggleFavorito } = useFavoritos();

  const fundacion = MOCK_FUNDACIONES.find((f) => f.id === id) || MOCK_FUNDACIONES[0];
  const mascotas = MOCK_MASCOTAS.filter((m) => m.fundacionId === fundacion.id);
  const favorita = isFavorito(fundacion.id);

  const handleApadrinar = (mascota: typeof MOCK_MASCOTAS[0]) => {
    if (manadaPets.some((mp) => mp.petId === String(mascota.id))) return;
    addToManada({
      id: `manada-${mascota.id}`,
      petId: String(mascota.id),
      name: mascota.nombre,
      rescueName: fundacion.nombre,
      tag: mascota.status === "NO_APADRINADO" ? "SALUDABLE" : "ATENCIÓN",
      monthlyAmount: 25.00,
      image: mascota.imagen,
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden">
        <ImageWithFallback
          src={fundacion.portadaUrl}
          alt={fundacion.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute inset-0 px-4 md:px-12 lg:px-[96px] flex flex-col justify-end pb-8">
          <Link
            to="/fundaciones"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-4 transition-colors w-fit"
          >
            <ArrowLeft size={20} />
            Volver a Fundaciones
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white flex-shrink-0 bg-white">
              <ImageWithFallback
                src={fundacion.logoUrl}
                alt={`Logo ${fundacion.nombre}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-white text-3xl md:text-4xl font-bold">{fundacion.nombre}</h1>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <MapPin size={14} />
                  {fundacion.ubicacion}
                </div>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <PawPrint size={14} />
                  {fundacion.cantidadMascotasCuidado} mascotas
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleFavorito(fundacion.id)}
              className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                favorita
                  ? "bg-[#ee5871] text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              aria-label={favorita ? "Quitar de favoritas" : "Marcar como favorita"}
            >
              <Heart size={20} className={favorita ? "fill-white" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1248px] mx-auto px-4 md:px-[96px] py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="text-[#004955] text-xl font-bold mb-3">Sobre nosotros</h2>
                <p className="text-[#3e494a] text-sm leading-relaxed">
                  {fundacion.descripcionCorta}
                </p>
              </div>

              {fundacion.historia && (
                <div>
                  <h3 className="text-[#004955] text-lg font-semibold mb-2">Historia</h3>
                  <p className="text-[#3e494a] text-sm leading-relaxed">
                    {fundacion.historia}
                  </p>
                </div>
              )}

              <div className="bg-[#004955] text-white p-6 rounded-2xl space-y-3">
                <h3 className="text-[#07c4e1] text-lg font-semibold">Datos de la fundación</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#07c4e1]" />
                    <span>{fundacion.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PawPrint size={14} className="text-[#07c4e1]" />
                    <span>{fundacion.cantidadMascotasCuidado} mascotas bajo cuidado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#07c4e1]" />
                    <span>Estado: {fundacion.estadoSolicitud}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mascotas */}
          <div className="lg:col-span-7">
            <h2 className="text-[#004955] text-xl font-bold mb-6">
              Mascotas de {fundacion.nombre} ({mascotas.length})
            </h2>

            {mascotas.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
                <PawPrint size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600 font-medium">Esta fundación aún no tiene mascotas registradas.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mascotas.map((mascota) => {
                  const isInManada = manadaPets.some((mp) => mp.petId === String(mascota.id));
                  return (
                    <div
                      key={mascota.id}
                      className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link to={`/mascota/${mascota.id}`} className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 block">
                        <ImageWithFallback
                          src={mascota.imagen}
                          alt={mascota.nombre}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 w-full space-y-2">
                        <div className="flex items-center justify-between">
                          <Link to={`/mascota/${mascota.id}`} className="text-[#1b1c1c] text-lg font-semibold hover:text-[#07c4e1] transition-colors">
                            {mascota.nombre}
                          </Link>
                          <div className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-gray-400" />
                            {statusLabel[mascota.status] || mascota.status}
                          </div>
                        </div>

                        <p className="text-gray-500 text-xs">
                          {mascota.raza || "Sin raza"} · {mascota.edad} {mascota.edad === 1 ? "año" : "años"} · {mascota.sexo}
                        </p>

                        <p className="text-[#3e494a] text-sm leading-relaxed line-clamp-2">
                          {mascota.descripcion}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-500">{mascota.ubicacion}</span>
                          <button
                            onClick={() => handleApadrinar(mascota)}
                            disabled={isInManada}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                              isInManada
                                ? "bg-gray-100 text-gray-400 cursor-default"
                                : "bg-[#00626d] text-[#07c4e1] hover:bg-[#004955] cursor-pointer"
                            }`}
                          >
                            <Heart size={14} />
                            {isInManada ? "En tu manada" : "Apadrinar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
