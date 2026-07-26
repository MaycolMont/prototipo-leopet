import React, { useState } from 'react';
import { Search, Eye, AlertTriangle, X, CheckCircle2, Bell } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AdminLayout } from './AdminLayout';

export function AdminDenuncias() {
  const { denuncias, updateDenuncia } = useAdmin();
  const [filter, setFilter] = useState<"todas" | "pendiente" | "notificada" | "resuelta">("todas");
  const [search, setSearch] = useState("");
  const [selectedDen, setSelectedDen] = useState<typeof denuncias[0] | null>(null);
  const [resolutionModal, setResolutionModal] = useState<{ id: number; action: "notificada" | "resuelta" } | null>(null);
  const [resolutionText, setResolutionText] = useState("");
  const [toast, setToast] = useState("");

  const filtered = denuncias.filter((d) => {
    if (filter !== "todas" && d.estado !== filter) return false;
    if (search && !d.motivo.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleResolve = () => {
    if (!resolutionModal) return;
    updateDenuncia(resolutionModal.id, {
      estado: resolutionModal.action,
      updatedAt: new Date().toISOString(),
    });
    setResolutionModal(null);
    setResolutionText("");
    setSelectedDen(null);
    const labels: Record<string, string> = {
      notificada: "Fundación notificada",
      resuelta: "Denuncia resuelta",
    };
    showToast(labels[resolutionModal.action]);
  };

  const estadoBadge = (estado: string) => {
    const styles: Record<string, string> = {
      pendiente: "bg-[#004955]/10 text-[#004955]",
      notificada: "bg-gray-100 text-gray-600",
      resuelta: "bg-gray-100 text-gray-500",
    };
    return styles[estado] || "bg-gray-100 text-gray-600";
  };

  const estadoLabel: Record<string, string> = {
    pendiente: "Pendiente",
    notificada: "Notificada",
    resuelta: "Resuelta",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {toast && (
          <div className="bg-[#004955]/10 border border-[#004955]/20 rounded-xl p-4 flex items-center gap-3 text-[#004955] font-medium animate-in fade-in slide-in-from-top-2 duration-300" role="status">
            <CheckCircle2 size={20} />
            {toast}
          </div>
        )}

        <div>
          <h2 className="text-[#004955] text-2xl font-semibold">Denuncias y Reportes</h2>
          <p className="text-[#3e494a] text-sm mt-1">Gestiona los reportes de donadores sobre evidencias y fundaciones.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {(["todas", "pendiente", "notificada", "resuelta"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === f ? "bg-[#004955] text-white" : "bg-gray-200 text-[#004955] hover:bg-gray-300"
                }`}
              >
                {f === "todas" ? "Todas" : estadoLabel[f]}
                {f === "pendiente" && ` (${denuncias.filter((d) => d.estado === "pendiente").length})`}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por motivo..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((den) => (
            <div key={den.id} className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={16} className="text-[#004955]" />
                    <h3 className="text-[#004955] font-semibold text-sm">Denuncia #{den.id}</h3>
                  </div>
                  <p className="text-gray-500 text-xs">Fundación ID: {den.fundacionId} · {den.fecha.split("T")[0]}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoBadge(den.estado)}`}>
                  {estadoLabel[den.estado]}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-[#3e494a] text-sm leading-relaxed line-clamp-3">{den.motivo}</p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedDen(den)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Eye size={14} />
                  Ver detalle
                </button>
                {den.estado === "pendiente" && (
                  <button
                    onClick={() => setResolutionModal({ id: den.id, action: "notificada" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#004955] bg-[#004955]/10 hover:bg-[#004955]/20 transition-colors"
                  >
                    <Bell size={14} />
                    Notificar
                  </button>
                )}
                {den.estado === "notificada" && (
                  <button
                    onClick={() => setResolutionModal({ id: den.id, action: "resuelta" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#004955] bg-[#004955]/10 hover:bg-[#004955]/20 transition-colors"
                  >
                    <CheckCircle2 size={14} />
                    Resolver
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#BDC8CA]/40">
            <AlertTriangle size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">No se encontraron denuncias</p>
            <p className="text-gray-400 text-sm mt-1">No hay reportes que coincidan con los filtros seleccionados.</p>
          </div>
        )}

        {selectedDen && (
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedDen(null)} role="dialog" aria-modal="true" aria-label="Detalle de denuncia">
            <div className="bg-white rounded-[24px] max-w-lg w-full p-8 shadow-xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedDen(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1" aria-label="Cerrar">
                <X size={24} />
              </button>
              <h2 className="text-[#004955] text-xl font-bold mb-1">Detalle de Denuncia</h2>
              <p className="text-gray-500 text-sm mb-6">ID: {selectedDen.id}</p>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Fundación</p>
                    <p className="text-[#004955] font-medium">ID {selectedDen.fundacionId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Estado</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoBadge(selectedDen.estado)}`}>
                      {estadoLabel[selectedDen.estado]}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Usuario</p>
                    <p className="text-[#004955]">ID {selectedDen.usuarioId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Fecha</p>
                    <p className="text-[#004955]">{selectedDen.fecha.split("T")[0]}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Motivo</p>
                  <p className="text-[#3e494a] leading-relaxed">{selectedDen.motivo}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {resolutionModal && (
          <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setResolutionModal(null); setResolutionText(""); }} role="dialog" aria-modal="true" aria-label="Resolver denuncia">
            <div className="bg-white rounded-[24px] max-w-md w-full p-8 shadow-xl relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => { setResolutionModal(null); setResolutionText(""); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1" aria-label="Cerrar">
                <X size={24} />
              </button>
              <h3 className="text-[#004955] text-lg font-bold mb-2">
                {resolutionModal.action === "notificada" && "Notificar a la Fundación"}
                {resolutionModal.action === "resuelta" && "Marcar como Resuelta"}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {resolutionModal.action === "notificada" && "La fundación será notificada sobre este reporte."}
                {resolutionModal.action === "resuelta" && "Indica la resolución final de esta denuncia."}
              </p>
              <textarea
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                placeholder="Notas internas (opcional)..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => { setResolutionModal(null); setResolutionText(""); }}
                  className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleResolve}
                  className="flex-1 bg-[#00626d] hover:bg-[#004955] text-[#07c4e1] py-2.5 rounded-full font-medium transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
