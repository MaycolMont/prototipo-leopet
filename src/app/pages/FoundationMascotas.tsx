import React, { useState } from 'react';
import { Plus, Search, Edit2, PawPrint, X, Check, Camera, ChevronDown, Trash2, Eye, EyeOff } from 'lucide-react';
import { useFoundation } from '../context/FoundationContext';
import { useAuth } from '../context/AuthContext';
import { FoundationLayout } from './FoundationLayout';
import imgMain from "../../imports/DetalleDeMascotaLeoPet/b5e67b3823fbd4287dcd8b82dc791a0d64b1d4a9.png";
import imgFood from "../../imports/DetalleDeMascotaLeoPet/9ec279e8e0b77d8a1cef5b76d12950fe70e8b841.png";
import imgPlay from "../../imports/DetalleDeMascotaLeoPet/bd95c8085784a9dd890c235868f306b717608099.png";
import imgPluto from "../../imports/Catalog/7abaafcc2a09d50e0fc877db77c9c704cd360ae6.png";
import imgJasper from "../../imports/Manada/05315c921ffb0646b298e09ecd7293761ebbf584.png";

const IMAGENES_MOCK = [imgMain, imgFood, imgPlay, imgPluto, imgJasper];

interface FormData {
  nombre: string;
  raza: string;
  edad: number;
  sexo: "Macho" | "Hembra";
  peso: number;
  especie: "Perro" | "Gato";
  descripcion: string;
  historia: string;
  imagen: string;
  galeria: string[];
  visible: boolean;
  status: "NO_APADRINADO" | "APADRINADO" | "EN_PROCESO" | "ADOPTADO";
  esterilizacion: boolean | null;
  vacunacion: boolean | null;
  desparasitacion: boolean | null;
  enfermedades: string;
}

const EMPTY_FORM: FormData = {
  nombre: "",
  raza: "",
  edad: 0,
  sexo: "Macho",
  peso: 0,
  especie: "Perro",
  descripcion: "",
  historia: "",
  imagen: IMAGENES_MOCK[0],
  galeria: [],
  visible: true,
  status: "NO_APADRINADO",
  esterilizacion: null,
  vacunacion: null,
  desparasitacion: null,
  enfermedades: "",
};

const INPUT_CLASS = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#07c4e1]/50 focus:border-[#07c4e1] transition-colors";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none pr-10`;

const statusLabel: Record<string, string> = {
  NO_APADRINADO: "Disponible",
  APADRINADO: "Apadrinado",
  EN_PROCESO: "En Proceso",
  ADOPTADO: "Adoptado",
};

const statusBadgeClass: Record<string, string> = {
  NO_APADRINADO: "bg-gray-100 text-gray-600",
  APADRINADO: "bg-gray-100 text-gray-600",
  EN_PROCESO: "bg-[#004955]/10 text-[#004955]",
  ADOPTADO: "bg-gray-100 text-gray-400",
};

export function FoundationMascotas() {
  const { mascotas, addMascota, updateMascota } = useFoundation();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [toast, setToast] = useState("");
  const [showImagePicker, setShowImagePicker] = useState(false);

  const fundacionId = user?.id === "usr-fund1" ? "fund-01" : user?.id === "usr-fund2" ? "fund-02" : "fund-03";

  const filteredMascotas = mascotas.filter((m) => {
    if (m.fundacionId !== fundacionId) return false;
    if (search && !m.nombre.toLowerCase().includes(search.toLowerCase()) && !(m.raza && m.raza.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (mascota: typeof mascotas[0]) => {
    setEditingId(mascota.id);
    setForm({
      nombre: mascota.nombre,
      raza: mascota.raza || "",
      edad: mascota.edad || 0,
      sexo: mascota.sexo || "Macho",
      peso: mascota.peso || 0,
      especie: (mascota.especie === "Gato" ? "Gato" : "Perro") as "Perro" | "Gato",
      descripcion: mascota.descripcion || "",
      historia: mascota.historia || "",
      imagen: mascota.imagen || IMAGENES_MOCK[0],
      galeria: mascota.galeria || [],
      visible: mascota.visible !== false,
      status: mascota.status || "NO_APADRINADO",
      esterilizacion: mascota.esterilizacion ?? null,
      vacunacion: mascota.vacunacion ?? null,
      desparasitacion: mascota.desparasitacion ?? null,
      enfermedades: mascota.enfermedades || "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.nombre || !form.descripcion) return;

    if (editingId) {
      updateMascota(editingId, form);
      showToast("Mascota actualizada exitosamente");
    } else {
      const now = new Date().toISOString();
      const newMascota = {
        ...form,
        id: Date.now(),
        fundacionId,
        createdAt: now,
        updatedAt: now,
        fechaRegistro: now.split("T")[0],
        ubicacion: "Guayaquil",
      };
      addMascota(newMascota as any);
      showToast("Mascota registrada con éxito");
    }
    setShowModal(false);
  };

  const toggleVisibility = (id: number, currentVisible: boolean) => {
    updateMascota(id, { visible: !currentVisible });
    showToast(`Mascota ${currentVisible ? "ocultada" : "mostrada"} en el catálogo`);
  };

  return (
    <FoundationLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o raza..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${INPUT_CLASS} pl-10`}
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#07c4e1] text-[#004955] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#06aec8] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07c4e1]"
          >
            <Plus size={18} />
            Registrar Mascota
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMascotas.map((mascota) => (
            <div key={mascota.id} className={`bg-white rounded-2xl border border-[#BDC8CA]/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${mascota.visible === false ? "opacity-60" : ""}`}>
              <div className="h-40 overflow-hidden relative">
                <img src={mascota.imagen} alt={mascota.nombre} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass[mascota.status] || "bg-gray-100 text-gray-600"}`}>
                    {statusLabel[mascota.status] || mascota.status}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[#004955] font-bold text-lg">{mascota.nombre}</h3>
                    <p className="text-gray-500 text-sm">{mascota.raza || "Sin raza"} · {mascota.edad} {mascota.edad === 1 ? "año" : "años"} · {mascota.sexo}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{mascota.descripcion}</p>
                <div className="flex flex-wrap gap-1.5">
                  {mascota.vacunacion === true && mascota.esterilizacion === true && mascota.desparasitacion === true && !mascota.enfermedades && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium">Salud al día</span>
                  )}
                  {mascota.enfermedades && (
                    <span className="px-2 py-0.5 bg-[#004955]/10 text-[#004955] rounded text-[10px] font-medium">{mascota.enfermedades}</span>
                  )}
                  {mascota.peso > 0 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium">{mascota.peso} kg</span>
                  )}
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => openEdit(mascota)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-[#004955] rounded-lg text-xs font-medium transition-colors"
                  >
                    <Edit2 size={14} />
                    Editar
                  </button>
                  <button
                    onClick={() => toggleVisibility(mascota.id, mascota.visible !== false)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      mascota.visible !== false
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-[#07c4e1]/10 text-[#00626d] hover:bg-[#07c4e1]/20"
                    }`}
                  >
                    {mascota.visible !== false ? <><EyeOff size={14} /> Ocultar</> : <><Eye size={14} /> Mostrar</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMascotas.length === 0 && (
          <div className="text-center py-12">
            <PawPrint size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron mascotas</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex-shrink-0 border-b border-gray-100 px-5 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-[#004955] text-lg sm:text-xl font-bold">
                {editingId ? "Editar Mascota" : "Registrar Nueva Mascota"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
              {/* Image selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Foto de la Mascota</label>
                <div className="relative">
                  <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-[#07c4e1] transition-colors"
                    onClick={() => setShowImagePicker(true)}>
                    <img src={form.imagen} alt="Vista previa" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => setShowImagePicker(true)}
                    className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                </div>
              </div>

              {showImagePicker && (
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-2">Seleccionar imagen:</p>
                  <div className="grid grid-cols-5 gap-2">
                    {IMAGENES_MOCK.map((img, i) => (
                      <button key={i} onClick={() => { setForm({ ...form, imagen: img }); setShowImagePicker(false); }}
                        className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-colors ${form.imagen === img ? "border-[#07c4e1] ring-2 ring-[#07c4e1]/30" : "border-transparent hover:border-gray-300"}`}>
                        <img src={img} alt={`Opción ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Basic info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nombre *</label>
                  <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Ej: Pluto" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Raza</label>
                  <input type="text" value={form.raza} onChange={(e) => setForm({ ...form, raza: e.target.value })}
                    placeholder="Ej: Beagle Mix" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Edad (años)</label>
                  <input type="number" min={0} value={form.edad || ""} onChange={(e) => setForm({ ...form, edad: parseInt(e.target.value) || 0 })}
                    placeholder="Ej: 3" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Peso (kg)</label>
                  <input type="number" min={0} value={form.peso || ""} onChange={(e) => setForm({ ...form, peso: parseInt(e.target.value) || 0 })}
                    placeholder="Ej: 9" className={INPUT_CLASS} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Sexo</label>
                  <select value={form.sexo} onChange={(e) => setForm({ ...form, sexo: e.target.value as "Macho" | "Hembra" })}
                    className={SELECT_CLASS}>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-[38px] text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Especie</label>
                  <select value={form.especie} onChange={(e) => setForm({ ...form, especie: e.target.value as "Perro" | "Gato" })}
                    className={SELECT_CLASS}>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-[38px] text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Estado</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as FormData["status"] })}
                    className={SELECT_CLASS}>
                    <option value="NO_APADRINADO">Disponible</option>
                    <option value="APADRINADO">Apadrinado</option>
                    <option value="EN_PROCESO">En Proceso</option>
                    <option value="ADOPTADO">Adoptado</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-[38px] text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Descripción *</label>
                <input type="text" maxLength={200} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="Una línea describiendo a la mascota" className={INPUT_CLASS} />
                <p className="text-[10px] text-gray-400 mt-1 text-right">{form.descripcion.length}/200</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Historia</label>
                <textarea value={form.historia} onChange={(e) => setForm({ ...form, historia: e.target.value })} rows={4}
                  placeholder="Cuenta la historia completa de esta mascota..."
                  className={`${INPUT_CLASS} resize-none`} />
              </div>

              {/* Health attributes */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Estado de Salud</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                    <input type="checkbox" checked={form.vacunacion === true}
                      onChange={(e) => setForm({ ...form, vacunacion: e.target.checked ? true : null })}
                      className="w-4 h-4 rounded border-gray-300 text-[#07c4e1] focus:ring-[#07c4e1]" />
                    <span className="text-sm text-gray-700">Vacunado</span>
                  </label>
                  <label className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                    <input type="checkbox" checked={form.esterilizacion === true}
                      onChange={(e) => setForm({ ...form, esterilizacion: e.target.checked ? true : null })}
                      className="w-4 h-4 rounded border-gray-300 text-[#07c4e1] focus:ring-[#07c4e1]" />
                    <span className="text-sm text-gray-700">Esterilizado</span>
                  </label>
                  <label className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                    <input type="checkbox" checked={form.desparasitacion === true}
                      onChange={(e) => setForm({ ...form, desparasitacion: e.target.checked ? true : null })}
                      className="w-4 h-4 rounded border-gray-300 text-[#07c4e1] focus:ring-[#07c4e1]" />
                    <span className="text-sm text-gray-700">Desparasitado</span>
                  </label>
                </div>
                <div className="mt-3">
                  <input type="text" value={form.enfermedades} onChange={(e) => setForm({ ...form, enfermedades: e.target.value })}
                    placeholder="Enfermedades conocidas (opcional)" className={INPUT_CLASS} />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 border-t border-gray-100 px-5 sm:px-6 py-4 flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave}
                className="flex-1 px-4 py-2.5 bg-[#07c4e1] text-[#004955] rounded-xl text-sm font-semibold hover:bg-[#06aec8] transition-colors">
                {editingId ? "Guardar Cambios" : "Registrar Mascota"}
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
