import React, { useState } from 'react';
import { AlertTriangle, Search, CheckCircle2, MessageSquare, X } from 'lucide-react';
import { useFoundation } from '../context/FoundationContext';
import { useAuth } from '../context/AuthContext';
import { FoundationLayout } from './FoundationLayout';

export function FoundationAdvertencias() {
  const { advertencias, updateAdvertencia } = useFoundation();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todas" | "pendiente" | "atendida">("todas");
  const [selectedAdv, setSelectedAdv] = useState<typeof advertencias[0] | null>(null);
  const [responseText, setResponseText] = useState("");
  const [toast, setToast] = useState("");

  const fundacionId = user?.id === "usr-fund1" ? "fund-01" : user?.id === "usr-fund2" ? "fund-02" : "fund-03";

  const misAdvertencias = advertencias.filter((a) => {
    if (a.fundacionId !== fundacionId) return false;
    if (filter !== "todas" && a.estado !== filter) return false;
    if (search && !a.motivo.toLowerCase().includes(search.toLowerCase()) && !a.mensajeAdmin.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const pendientes = advertencias.filter((a) => a.fundacionId === fundacionId && a.estado === "pendiente").length;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleRespond = () => {
    if (!selectedAdv || !responseText.trim()) return;
    updateAdvertencia(selectedAdv.id, {
      estado: "atendida",
      respuestaFundacion: responseText,
      fechaRespuesta: new Date().toISOString().split("T")[0],
    });
    setSelectedAdv(null);
    setResponseText("");
    showToast("Corrección enviada para revisión");
  };

  const estadoBadge = (estado: string) => {
    const styles: Record<string, string> = {
      pendiente: "bg-[#004955]/10 text-[#004955]",
      atendida: "bg-gray-100 text-gray-500",
    };
    return styles[estado] || "bg-gray-100 text-gray-600";
  };

  return (
    <FoundationLayout>
      <div className="space-y-6">
        {pendientes > 0 && (
          <div className="bg-[#004955]/5 border border-[#004955]/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="bg-[#004955]/10 p-3 rounded-xl">
              <AlertTriangle size={24} className="text-[#004955]" />
            </div>
            <div>
              <p className="text-[#004955] font-semibold text-sm">
                Tienes {pendientes} alerta{pendientes !== 1 ? "s" : ""} pendiente{pendientes !== 1 ? "s" : ""} por resolver
              </p>
              <p className="text-gray-500 text-xs">Revisa y responde a los requerimientos del administrador</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            {(["todas", "pendiente", "atendida"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-white text-[#004955] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                {f === "todas" ? "Todas" : f === "pendiente" ? "Pendientes" : "Atendidas"}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por motivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#07c4e1]/50 focus:border-[#07c4e1] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-3">
          {misAdvertencias.map((adv) => (
            <div key={adv.id} className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoBadge(adv.estado)}`}>
                      {adv.estado === "pendiente" ? "Pendiente" : "Atendida"}
                    </span>
                    <span className="text-gray-400 text-xs">{adv.fecha}</span>
                  </div>
                  <h3 className="text-[#004955] font-bold text-base mb-1">{adv.motivo}</h3>
                  <p className="text-gray-600 text-sm mb-3">{adv.mensajeAdmin}</p>
                  {adv.respuestaFundacion && (
                    <div className="bg-gray-50 rounded-xl p-3 mt-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">Tu respuesta ({adv.fechaRespuesta}):</p>
                      <p className="text-sm text-gray-700">{adv.respuestaFundacion}</p>
                    </div>
                  )}
                </div>
                {adv.estado === "pendiente" && (
                  <button
                    onClick={() => { setSelectedAdv(adv); setResponseText(""); }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#07c4e1] text-[#004955] rounded-xl text-xs font-semibold hover:bg-[#06aec8] transition-colors flex-shrink-0"
                  >
                    <MessageSquare size={14} />
                    Responder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {misAdvertencias.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {filter === "todas" ? "No tienes alertas" : `No hay alertas ${filter === "pendiente" ? "pendientes" : "atendidas"}`}
            </p>
          </div>
        )}
      </div>

      {selectedAdv && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4" onClick={() => setSelectedAdv(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex-shrink-0 border-b border-gray-100 px-5 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-[#004955] text-lg sm:text-xl font-bold">Responder Alerta</h2>
              <button onClick={() => setSelectedAdv(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4">
              <div className="bg-[#004955]/5 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Requerimiento del Admin:</p>
                <p className="text-sm font-semibold text-[#004955] mb-1">{selectedAdv.motivo}</p>
                <p className="text-sm text-gray-600">{selectedAdv.mensajeAdmin}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tu respuesta / corrección *</label>
                <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} rows={4}
                  placeholder="Describe las acciones tomadas para resolver la incidencia..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#07c4e1]/50 resize-none" />
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <p className="text-gray-500 text-sm">Subir evidencia corregida (simulado)</p>
                <p className="text-gray-400 text-xs mt-1">Se reemplazará la evidencia cuestionada</p>
              </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-100 px-5 sm:px-6 py-4 flex gap-3">
              <button onClick={() => setSelectedAdv(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleRespond}
                disabled={!responseText.trim()}
                className="flex-1 px-4 py-2.5 bg-[#07c4e1] text-[#004955] rounded-xl text-sm font-semibold hover:bg-[#06aec8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Enviar Corrección
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#004955] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toast}
        </div>
      )}
    </FoundationLayout>
  );
}
