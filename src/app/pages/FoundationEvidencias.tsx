import React, { useState } from 'react';
import { Plus, Search, Camera, Star, Video, X, Image, ChevronDown } from 'lucide-react';
import { useFoundation } from '../context/FoundationContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { FoundationLayout } from './FoundationLayout';
import imgMain from "../../imports/DetalleDeMascotaLeoPet/b5e67b3823fbd4287dcd8b82dc791a0d64b1d4a9.png";
import imgFood from "../../imports/DetalleDeMascotaLeoPet/9ec279e8e0b77d8a1cef5b76d12950fe70e8b841.png";
import imgPlay from "../../imports/DetalleDeMascotaLeoPet/bd95c8085784a9dd890c235868f306b717608099.png";

const IMAGENES_MOCK = [imgMain, imgFood, imgPlay];

const INPUT_CLASS = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#07c4e1]/50 focus:border-[#07c4e1] transition-colors";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none pr-10`;

interface EvidenciaForm {
  mascotaId: string;
  titulo: string;
  descripcion: string;
  tipo: "foto" | "video";
}

export function FoundationEvidencias() {
  const { mascotas, evidencias, addEvidencia } = useFoundation();
  const { user } = useAuth();
  const { agregarNotificacion } = useNotifications();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<EvidenciaForm>({ mascotaId: "", titulo: "", descripcion: "", tipo: "foto" });
  const [toast, setToast] = useState("");

  const fundacionId = user?.id === "usr-fund1" ? "fund-01" : user?.id === "usr-fund2" ? "fund-02" : "fund-03";
  const fundacionNombre = user?.id === "usr-fund1" ? "Huellitas Felices" : user?.id === "usr-fund2" ? "Refugio Almas Peludas" : "Huellitas Sanas";

  const misMascotas = mascotas.filter((m) => m.fundacionId === fundacionId);
  const misEvidencias = evidencias.filter((e) => {
    if (e.fundacionId !== fundacionId) return false;
    if (search && !e.titulo.toLowerCase().includes(search.toLowerCase()) && !e.mascotaNombre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handlePublish = () => {
    if (!form.mascotaId || !form.titulo || !form.descripcion) return;
    const mascota = misMascotas.find((m) => m.id === form.mascotaId);
    if (!mascota) return;

    const newEvidencia = {
      id: `ev-${Date.now()}`,
      mascotaId: form.mascotaId,
      mascotaNombre: mascota.nombre,
      fundacionId,
      fundacionNombre,
      tipo: form.tipo,
      titulo: form.titulo,
      descripcion: form.descripcion,
      imagenUrl: IMAGENES_MOCK[Math.floor(Math.random() * IMAGENES_MOCK.length)],
      fecha: new Date().toISOString().split("T")[0],
      estado: "publicada" as const,
    };

    addEvidencia(newEvidencia);

    agregarNotificacion({
      tipo: "evidencia_favorita",
      usuario_id: 1,
      fundacion_id: fundacionId === "fund-01" ? 1 : fundacionId === "fund-02" ? 2 : 3,
      animal_id: Number(form.mascotaId),
      visible: true,
      leido: false,
      fecha_leido: null,
      calificacion: null,
      fecha_calificacion: null,
      es_alerta_salud: false,
      descripcion_alerta: null,
      mensaje: `${fundacionNombre} publicó evidencia de ${mascota.nombre}: '${form.titulo}'`,
      es_admin_mensaje: false,
    });

    setShowModal(false);
    setForm({ mascotaId: "", titulo: "", descripcion: "", tipo: "foto" });
    showToast("Evidencia enviada a los padrinos");
  };

  return (
    <FoundationLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título o mascota..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#07c4e1]/50 focus:border-[#07c4e1] transition-colors"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#07c4e1] text-[#004955] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#06aec8] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07c4e1]"
          >
            <Plus size={18} />
            Nueva Evidencia
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {misEvidencias.map((ev) => (
            <div key={ev.id} className="bg-white rounded-2xl border border-[#BDC8CA]/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-44 overflow-hidden relative">
                <img src={ev.imagenUrl} alt={ev.titulo} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                  {ev.tipo === "foto" ? <Image size={12} /> : <Video size={12} />}
                  {ev.tipo === "foto" ? "Foto" : "Video"}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-[#004955] font-bold text-base">{ev.titulo}</h3>
                <p className="text-gray-500 text-sm">
                  {ev.mascotaNombre} · {ev.fecha}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">{ev.descripcion}</p>
                {ev.calificacionPromedio && (
                  <div className="flex items-center gap-1 pt-1">
                    <Star size={14} className="text-[#ffac13] fill-[#ffac13]" />
                    <span className="text-sm font-medium text-[#004955]">{ev.calificacionPromedio}</span>
                    <span className="text-gray-400 text-xs">/ 5</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {misEvidencias.length === 0 && (
          <div className="text-center py-12">
            <Camera size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron evidencias</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex-shrink-0 border-b border-gray-100 px-5 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-[#004955] text-lg sm:text-xl font-bold">Nueva Evidencia</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4">
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Mascota *</label>
                <select value={form.mascotaId} onChange={(e) => setForm({ ...form, mascotaId: e.target.value })}
                  className={SELECT_CLASS}>
                  <option value="">Seleccionar mascota</option>
                  {misMascotas.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-[38px] text-gray-400 pointer-events-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
                <div className="flex gap-3">
                  {(["foto", "video"] as const).map((tipo) => (
                    <button key={tipo} onClick={() => setForm({ ...form, tipo })}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        form.tipo === tipo
                          ? "bg-[#07c4e1]/10 border-[#07c4e1] text-[#004955]"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}>
                      {tipo === "foto" ? <Image size={16} /> : <Video size={16} />}
                      {tipo === "foto" ? "Foto" : "Video"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Título *</label>
                <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Ej: Pluto disfrutando de su almuerzo"
                  className={INPUT_CLASS} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Descripción *</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3}
                  placeholder="Describe el avance o estado de la mascota..."
                  className={`${INPUT_CLASS} resize-none`} />
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <Camera size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Arrastra o haz clic para subir una imagen</p>
                <p className="text-gray-400 text-xs mt-1">Simulado — se usará una imagen de ejemplo</p>
              </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-100 px-5 sm:px-6 py-4 flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handlePublish}
                className="flex-1 px-4 py-2.5 bg-[#07c4e1] text-[#004955] rounded-xl text-sm font-semibold hover:bg-[#06aec8] transition-colors">
                Publicar Evidencia
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
