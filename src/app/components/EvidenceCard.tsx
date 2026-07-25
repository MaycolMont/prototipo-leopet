import React, { useState } from "react";
import { Star, AlertTriangle, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EvidenceCardProps {
  id: string;
  petName: string;
  foundationName: string;
  type: "photo" | "video";
  title: string;
  description: string;
  imageUrl: any;
  date: string;
  initialRating?: number;
  initialComment?: string;
  onRate?: (rating: number, comment: string) => void;
  onReport?: (reason: string) => void;
}

export function EvidenceCard({ id, petName, foundationName, type, title, description, imageUrl, date, initialRating, initialComment, onRate, onReport }: EvidenceCardProps) {
  const [rating, setRating] = useState(initialRating || 0);
  const [comment, setComment] = useState(initialComment || "");
  const [hoverRating, setHoverRating] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reported, setReported] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    onRate?.(value, comment);
  };

  const handleComment = (value: string) => {
    setComment(value);
    onRate?.(rating, value);
  };

  const handleReport = () => {
    if (!reportReason) return;
    onReport?.(reportReason);
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
        <ImageWithFallback src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${type === "video" ? "bg-[#ee5871] text-white" : "bg-[#07c4e1] text-[#004955]"}`}>
            {type === "video" ? "Video" : "Foto"}
          </span>
          <span className="bg-white/90 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
            {date}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[#004955] font-semibold text-lg">{title}</h3>
            <p className="text-gray-500 text-xs">{petName} · {foundationName}</p>
          </div>
        </div>

        <p className="text-[#3e494a] text-sm leading-relaxed">{description}</p>

        <div className="border-t border-gray-100 pt-3 space-y-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={22}
                  className={`transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-[#ffac13] text-[#ffac13]"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && <span className="text-xs text-gray-500 ml-2">{rating}/5</span>}
          </div>

          <div className="flex items-start gap-2">
            <MessageSquare size={16} className="text-gray-400 mt-1 flex-shrink-0" />
            <textarea
              value={comment}
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
                    onClick={() => setReportReason(reason)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      reportReason === reason
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
                  onClick={() => { setShowReport(false); setReportReason(""); }}
                  className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReport}
                  disabled={!reportReason}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    reportReason
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
