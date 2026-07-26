import React, { useState } from "react";
import { Star, AlertTriangle, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EvidenceCardProps {
  id: string;
  mascotaNombre: string;
  fundacionNombre: string;
  tipo: "foto" | "video";
  titulo: string;
  descripcion: string;
  imagenUrl: any;
  fecha: string;
  calificacion?: number | null;
  comentario?: string | null;
  estado?: "publicada" | "en_revision";
  onRate?: (calificacion: number, comentario: string) => void;
  onReport?: (motivo: string) => void;
}

export function EvidenceCard({
  id,
  mascotaNombre,
  fundacionNombre,
  tipo,
  titulo,
  descripcion,
  imagenUrl,
  fecha,
  calificacion: initialCalificacion,
  comentario: initialComentario,
  estado,
  onRate,
  onReport,
}: EvidenceCardProps) {
  const [calificacion, setCalificacion] = useState(initialCalificacion || 0);
  const [comentario, setComentario] = useState(initialComentario || "");
  const [hoverCalificacion, setHoverCalificacion] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [reported, setReported] = useState(estado === "en_revision");

  const handleRate = (value: number) => {
    setCalificacion(value);
    onRate?.(value, comentario);
  };

  const handleComment = (value: string) => {
    setComentario(value);
    onRate?.(calificacion, value);
  };

  const handleReport = () => {
    if (!motivo) return;
    onReport?.(motivo);
    setReported(true);
    setShowReport(false);
  };

  const reportReasons = [
    "Foto duplicada",
    "Contenido sospechoso",
    "No corresponde a la mascota",
    "Calidad insuficiente",
    "Otro",
  ];

  return (
    <div className="bg-white border border-[#BDC8CA]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <ImageWithFallback src={imagenUrl} alt={titulo} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tipo === "video" ? "bg-[#004955]/10 text-[#004955]" : "bg-gray-100 text-gray-600"}`}>
            {tipo === "video" ? "Video" : "Foto"}
          </span>
          <span className="bg-white/90 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
            {fecha}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[#004955] font-semibold text-lg">{titulo}</h3>
            <p className="text-gray-500 text-xs">{mascotaNombre} · {fundacionNombre}</p>
          </div>
        </div>

        <p className="text-[#3e494a] text-sm leading-relaxed">{descripcion}</p>

        <div className="border-t border-gray-100 pt-3 space-y-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverCalificacion(star)}
                onMouseLeave={() => setHoverCalificacion(0)}
                onClick={() => handleRate(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={22}
                  className={`transition-colors ${
                    star <= (hoverCalificacion || calificacion)
                      ? "fill-[#ffac13] text-[#ffac13]"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            {calificacion > 0 && <span className="text-xs text-gray-500 ml-2">{calificacion}/5</span>}
          </div>

          <div className="flex items-start gap-2">
            <MessageSquare size={16} className="text-gray-400 mt-1 flex-shrink-0" />
            <textarea
              value={comentario}
              onChange={(e) => handleComment(e.target.value)}
              placeholder="Comentario opcional..."
              rows={2}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#07c4e1] outline-none resize-none"
            />
          </div>

          {reported ? (
            <p className="text-xs text-[#ffac13] font-medium flex items-center gap-1">
              <AlertTriangle size={14} />
              Reporte enviado — En revisión
            </p>
          ) : (
            <button
              onClick={() => setShowReport(!showReport)}
              className="text-xs text-gray-400 hover:text-[#ee5871] font-medium flex items-center gap-1 transition-colors"
            >
              <AlertTriangle size={14} />
              Reportar inconsistencia
            </button>
          )}

          {showReport && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <p className="text-sm font-medium text-gray-700">Selecciona el motivo:</p>
              <div className="flex flex-wrap gap-2">
                {reportReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setMotivo(reason)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      motivo === reason
                        ? "bg-[#ee5871] text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-[#ee5871]"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setShowReport(false); setMotivo(""); }}
                  className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReport}
                  disabled={!motivo}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    motivo
                      ? "bg-[#ee5871] text-white hover:bg-[#d94a63]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Enviar Reporte
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
