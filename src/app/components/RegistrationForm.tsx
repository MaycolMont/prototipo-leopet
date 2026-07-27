import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface FormData {
  foundationName: string;
  ruc: string;
  email: string;
  address: string;
  contactFirstName: string;
  contactLastName: string;
  phone: string;
  additionalInfo: string;
}

interface FormErrors {
  [key: string]: string;
}

export function RegistrationForm() {
  const { addSolicitud } = useAdmin();
  const [formData, setFormData] = useState<FormData>({
    foundationName: "",
    ruc: "",
    email: "",
    address: "",
    contactFirstName: "",
    contactLastName: "",
    phone: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.foundationName.trim()) e.foundationName = "El nombre es obligatorio";
    if (!formData.ruc.trim()) e.ruc = "El RUC es obligatorio";
    else if (!/^\d{13}$/.test(formData.ruc.replace(/\D/g, ""))) e.ruc = "El RUC debe tener 13 dígitos";
    if (!formData.email.trim()) e.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Ingresa un correo válido";
    if (!formData.address.trim()) e.address = "La dirección es obligatoria";
    if (!formData.contactFirstName.trim()) e.contactFirstName = "El nombre es obligatorio";
    if (!formData.contactLastName.trim()) e.contactLastName = "El apellido es obligatorio";
    if (!formData.phone.trim()) e.phone = "El teléfono es obligatorio";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) e.phone = "El teléfono debe tener 10 dígitos";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

    addSolicitud({
      id: `sol-${Date.now()}`,
      fundacionNombre: formData.foundationName.trim(),
      ruc: formData.ruc.replace(/\D/g, ""),
      correo: formData.email.trim(),
      representanteLegal: `${formData.contactFirstName.trim()} ${formData.contactLastName.trim()}`,
      telefono: formData.phone.replace(/\D/g, ""),
      direccion: formData.address.trim(),
      ubicacion: "Ecuador",
      fechaSolicitud: new Date().toISOString().split("T")[0],
      estado: "Pendiente",
      documentosUrls: [],
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const inputClass = (field: string) =>
    `w-full bg-white border rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none transition-colors ${
      errors[field] ? "border-red-400 bg-red-50 focus:border-red-400" : "border-[#d9d9d9] focus:border-[#07c4e1]"
    }`;

  if (isSuccess) {
    return (
      <section className="bg-white py-32 px-4 md:px-12 lg:px-[100px]" id="registro">
        <div className="max-w-[600px] mx-auto text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#07c4e1]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-[#00626d]" />
          </div>
          <h2 className="text-[#004955] text-3xl md:text-4xl font-bold mb-4">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-[#3e494a] text-lg leading-relaxed mb-3">
            Tu solicitud de registro para{" "}
            <span className="font-semibold text-[#004955]">{formData.foundationName}</span>{" "}
            ha sido enviada exitosamente.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Nuestro equipo revisará la información y te contactaremos al correo{" "}
            <span className="font-medium text-[#004955]">{formData.email}</span>{" "}
            en un plazo de 2-3 días hábiles.
          </p>
          <div className="bg-gray-50 border border-[#BDC8CA]/40 rounded-2xl p-6 text-left space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Resumen de la solicitud</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Fundación</p>
                <p className="text-[#004955] font-medium">{formData.foundationName}</p>
              </div>
              <div>
                <p className="text-gray-500">RUC</p>
                <p className="text-[#004955] font-medium font-mono">{formData.ruc}</p>
              </div>
              <div>
                <p className="text-gray-500">Representante</p>
                <p className="text-[#004955] font-medium">{formData.contactFirstName} {formData.contactLastName}</p>
              </div>
              <div>
                <p className="text-gray-500">Estado</p>
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#004955]/10 text-[#004955] text-xs font-semibold">Pendiente</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-32 px-4 md:px-12 lg:px-[100px]" id="registro">
      <div className="max-w-[1145px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#ee5871] text-[40px] font-semibold tracking-[1.6px] mb-4">
            Solicita el registro de tu Fundación
          </h2>
          <p className="text-[#004955] text-[20px] font-medium max-w-[800px] mx-auto">
            Ayúdanos a conocer tu impacto. Completa este formulario para que podamos verificar la información y habilitar tu fundación en nuestra plataforma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-[#0598ae] text-[24px] font-semibold uppercase mb-4">Datos de la fundación</h3>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">
                  Nombre de la fundación <span className="text-[#ee5871]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.foundationName}
                  onChange={(e) => updateField("foundationName", e.target.value)}
                  placeholder="Ej: Huellitas del Sur"
                  className={inputClass("foundationName")}
                />
                {errors.foundationName && <p className="text-red-500 text-xs mt-1">{errors.foundationName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">
                  RUC / Registro legal <span className="text-[#ee5871]">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.ruc}
                  onChange={(e) => updateField("ruc", e.target.value.replace(/\D/g, "").slice(0, 13))}
                  placeholder="0987654321001"
                  className={inputClass("ruc")}
                />
                {errors.ruc && <p className="text-red-500 text-xs mt-1">{errors.ruc}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">
                  Correo de la fundación <span className="text-[#ee5871]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="correo@fundacion.org"
                  className={inputClass("email")}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">
                  Dirección <span className="text-[#ee5871]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Av. Avenida 1234 y Calle, Guayaquil, Guayas"
                  className={inputClass("address")}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[#0598ae] text-[24px] font-semibold uppercase mb-4">Persona de contacto</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[#004955] text-[18px] font-medium block">
                    Nombre <span className="text-[#ee5871]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactFirstName}
                    onChange={(e) => updateField("contactFirstName", e.target.value)}
                    placeholder="Fulano"
                    className={inputClass("contactFirstName")}
                  />
                  {errors.contactFirstName && <p className="text-red-500 text-xs mt-1">{errors.contactFirstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[#004955] text-[18px] font-medium block">
                    Apellido <span className="text-[#ee5871]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactLastName}
                    onChange={(e) => updateField("contactLastName", e.target.value)}
                    placeholder="De Tal"
                    className={inputClass("contactLastName")}
                  />
                  {errors.contactLastName && <p className="text-red-500 text-xs mt-1">{errors.contactLastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">
                  Teléfono de contacto <span className="text-[#ee5871]">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="0987654321"
                  className={inputClass("phone")}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">Información adicional</label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => updateField("additionalInfo", e.target.value)}
                  placeholder="Proporcione cualquier información adicional que nos ayude a verificar su fundación..."
                  className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1] min-h-[160px] resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#07c4e1] text-[#004955] px-16 py-4 rounded-full font-medium text-[20px] tracking-[0.6px] flex items-center gap-4 hover:bg-[#06aec8] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando solicitud...
                </>
              ) : (
                <>
                  Enviar solicitud
                  <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.425 1.5L17.425 7.5L11.425 13.5M0.425 7.5H17.425" stroke="#004955" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
