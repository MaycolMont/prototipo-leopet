import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from "motion/react";

export function RegistrationForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="bg-white py-32 px-[100px]" id="registro">
      <div className="max-w-[1145px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#ee5871] text-[40px] font-semibold tracking-[1.6px] mb-4">
            Solicita el registro de tu Fundación
          </h2>
          <p className="text-[#004955] text-[20px] font-medium max-w-[800px] mx-auto">
            Ayúdanos a conocer tu impacto. Completa este formulario para que podamos verificar la información y habilitar tu fundación en nuestra plataforma.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-[#0598ae] text-[24px] font-semibold uppercase mb-4">Datos de la fundación</h3>
              
              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">Nombre de la fundación *</label>
                <input 
                  {...register("foundationName")}
                  placeholder="LeoPet Ecuador"
                  className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">RUC / Registro legal *</label>
                <input 
                  {...register("ruc")}
                  placeholder="0987654321001"
                  className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">Correo de la fundación *</label>
                <input 
                  {...register("email")}
                  placeholder="correo@correo.com"
                  className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">Dirección *</label>
                <input 
                  {...register("address")}
                  placeholder="Av. Avenida 1234 y Calle, Guayaquil, Guayas"
                  className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[#0598ae] text-[24px] font-semibold uppercase mb-4">Persona de contacto</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[#004955] text-[18px] font-medium block">Nombre *</label>
                  <input 
                    {...register("contactFirstName")}
                    placeholder="Fulano"
                    className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#004955] text-[18px] font-medium block">Apellido *</label>
                  <input 
                    {...register("contactLastName")}
                    placeholder="De Tal"
                    className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">Teléfono de contacto *</label>
                <input 
                  {...register("phone")}
                  placeholder="0987654321"
                  className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#004955] text-[18px] font-medium block">Información adicional</label>
                <textarea 
                  {...register("additionalInfo")}
                  placeholder="Proporcione cualquier información adicional que nos ayude a verificar su fundación..."
                  className="w-full bg-white border border-[#d9d9d9] rounded-lg p-4 text-[#333] placeholder:text-[#b3b3b3] outline-none focus:border-[#07c4e1] min-h-[160px] resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button 
              type="submit"
              className="bg-[#07c4e1] text-[#004955] px-16 py-4 rounded-full font-medium text-[20px] tracking-[0.6px] flex items-center gap-4 hover:bg-[#06aec8] transition-colors"
            >
              Enviar solicitud
              <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.425 1.5L17.425 7.5L11.425 13.5M0.425 7.5H17.425" stroke="#004955" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
