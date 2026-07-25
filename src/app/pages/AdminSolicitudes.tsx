import React, { useState } from 'react';
import { Search, Eye, CheckCircle2, XCircle, FileText, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AdminLayout } from './AdminLayout';

export function AdminSolicitudes() {
  const { solicitudes, updateSolicitud } = useAdmin();
  const [filter, setFilter] = useState<"todas" | "Pendiente" | "Aprobada" | "Rechazada">("todas");
  const [search, setSearch] = useState("");
  const [selectedSol, setSelectedSol] = useState<typeof solicitudes[0] | null>(null);
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState("");

  const filtered = solicitudes.filter((s) => {
    if (filter !== "todas" && s.estado !== filter) return false;
    if (search && !s.fundacionNombre.toLowerCase().includes(search.toLowerCase()) && !s.ruc.includes(search)) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleApprove = (id: string) => {
    updateSolicitud(id, { estado: "Aprobada" });
    setSelectedSol(null);
    showToast("Fundación Aprobada Exitosamente");
  };

  const handleReject = () => {
    if (!rejectModal || !rejectReason.trim()) return;
    updateSolicitud(rejectModal, { estado: "Rechazada", motivoRechazo: rejectReason });
    setRejectModal(null);
    setRejectReason("");
    setSelectedSol(null);
    showToast("Solicitud Rechazada");
  };

  const estadoBadge = (estado: string) => {
    const styles: Record<string, string> = {
      Pendiente: "bg-[#004955]/10 text-[#004955]",
      Aprobada: "bg-gray-100 text-gray-500",
      Rechazada: "bg-gray-100 text-gray-400",
    };
    return styles[estado] || "bg-gray-100 text-gray-600";
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
          <h2 className="text-[#004955] text-2xl font-semibold">Solicitudes de Fundaciones</h2>
          <p className="text-[#3e494a] text-sm mt-1">Revisa y gestiona las solicitudes de registro de nuevas fundaciones.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {(["todas", "Pendiente", "Aprobada", "Rechazada"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === f ? "bg-[#004955] text-white" : "bg-gray-200 text-[#004955] hover:bg-gray-300"
                }`}
              >
                {f === "todas" ? "Todas" : f}
                {f === "Pendiente" && ` (${solicitudes.filter((s) => s.estado === "Pendiente").length})`}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o RUC..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 font-semibold text-[#004955]">Fundación</th>
                  <th className="px-5 py-3 font-semibold text-[#004955] hidden md:table-cell">RUC</th>
                  <th className="px-5 py-3 font-semibold text-[#004955] hidden lg:table-cell">Representante</th>
                  <th className="px-5 py-3 font-semibold text-[#004955] hidden sm:table-cell">Fecha</th>
                  <th className="px-5 py-3 font-semibold text-[#004955]">Estado</th>
                  <th className="px-5 py-3 font-semibold text-[#004955] text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sol) => (
                  <tr key={sol.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#004955]">{sol.fundacionNombre}</p>
                      <p className="text-gray-500 text-xs md:hidden">{sol.ruc}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600 hidden md:table-cell font-mono text-xs">{sol.ruc}</td>
                    <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{sol.representanteLegal}</td>
                    <td className="px-5 py-4 text-gray-500 hidden sm:table-cell text-xs">{sol.fechaSolicitud}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoBadge(sol.estado)}`}>
                        {sol.estado}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setSelectedSol(sol)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#07c4e1] hover:bg-[#07c4e1]/10 transition-colors"
                          aria-label={`Ver detalle de ${sol.fundacionNombre}`}
                        >
                          <Eye size={16} />
                        </button>
                        {sol.estado === "Pendiente" && (
                          <>
                            <button
                              onClick={() => handleApprove(sol.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#004955] hover:bg-[#004955]/10 transition-colors"
                              aria-label={`Aprobar ${sol.fundacionNombre}`}
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button
                              onClick={() => setRejectModal(sol.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                              aria-label={`Rechazar ${sol.fundacionNombre}`}
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <FileText size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No se encontraron solicitudes</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedSol && (
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedSol(null)} role="dialog" aria-modal="true" aria-label={`Detalle de ${selectedSol.fundacionNombre}`}>
            <div className="bg-white rounded-[24px] max-w-lg w-full p-8 shadow-xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedSol(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1" aria-label="Cerrar">
                <X size={24} />
              </button>
              <h2 className="text-[#004955] text-xl font-bold mb-6">{selectedSol.fundacionNombre}</h2>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">RUC</p>
                    <p className="text-[#004955] font-mono">{selectedSol.ruc}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Estado</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoBadge(selectedSol.estado)}`}>
                      {selectedSol.estado}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Representante Legal</p>
                  <p className="text-[#004955] font-medium">{selectedSol.representanteLegal}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Correo</p>
                    <p className="text-[#004955]">{selectedSol.correo}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Teléfono</p>
                    <p className="text-[#004955]">{selectedSol.telefono}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Dirección</p>
                  <p className="text-[#004955]">{selectedSol.direccion}, {selectedSol.ubicacion}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Fecha de Solicitud</p>
                  <p className="text-[#004955]">{selectedSol.fechaSolicitud}</p>
                </div>
                {selectedSol.motivoRechazo && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 text-xs font-medium uppercase tracking-wider mb-1">Motivo de Rechazo</p>
                    <p className="text-red-700 text-sm">{selectedSol.motivoRechazo}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Documentos Adjuntos</p>
                  <div className="flex gap-3">
                    {selectedSol.documentosUrls.map((url, i) => (
                      <div key={i} className="w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                        <FileText size={20} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {selectedSol.estado === "Pendiente" && (
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleApprove(selectedSol.id)}
                    className="flex-1 bg-[#004955] hover:bg-[#003a44] text-[#07c4e1] py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    Aprobar Solicitud
                  </button>
                  <button
                    onClick={() => { setRejectModal(selectedSol.id); setSelectedSol(null); }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-600 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reject Reason Modal */}
        {rejectModal && (
          <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setRejectModal(null); setRejectReason(""); }} role="dialog" aria-modal="true" aria-label="Rechazar solicitud">
            <div className="bg-white rounded-[24px] max-w-md w-full p-8 shadow-xl relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => { setRejectModal(null); setRejectReason(""); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1" aria-label="Cerrar">
                <X size={24} />
              </button>
              <h3 className="text-[#004955] text-lg font-bold mb-2">Motivo de Rechazo</h3>
              <p className="text-gray-500 text-sm mb-4">Describe el motivo por el cual se rechaza esta solicitud. Este campo es obligatorio.</p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ej: Documentación incompleta, datos incorrectos..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => { setRejectModal(null); setRejectReason(""); }}
                  className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                  className={`flex-1 py-2.5 rounded-full font-medium transition-colors ${
                    rejectReason.trim()
                      ? "bg-[#004955] hover:bg-[#003a44] text-[#07c4e1]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Confirmar Rechazo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
