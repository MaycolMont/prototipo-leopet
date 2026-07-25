import React from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react";
import { MapPin, PawPrint, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MOCK_FUNDACIONES } from '../../data/mockFundaciones';

export function FundacionesList() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="py-10 px-4 md:px-12 lg:px-[96px] bg-gray-50 border-b border-[#07c4e1]/20">
        <div className="max-w-[1248px] mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Building2 size={32} className="text-[#004955]" />
            <h1 className="text-[#004955] text-2xl sm:text-3xl md:text-[40px] font-bold">Fundaciones Aliadas</h1>
          </div>
          <p className="text-[#3e494a] text-sm sm:text-[18px] ml-0 sm:ml-12">
            Conoce las organizaciones que cuidan de nuestras mascotas apadrinadas.
          </p>
        </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-4 md:px-[96px] mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_FUNDACIONES.map((fundacion, i) => (
            <motion.div
              key={fundacion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/fundaciones/${fundacion.id}`}
                className="bg-white rounded-[24px] border border-[#b1d0d5] overflow-hidden flex flex-col h-full group transition-shadow hover:shadow-lg block"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <ImageWithFallback
                    src={fundacion.portadaUrl}
                    alt={fundacion.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white flex-shrink-0 bg-white">
                        <ImageWithFallback
                          src={fundacion.logoUrl}
                          alt={`Logo ${fundacion.nombre}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-bold leading-tight">{fundacion.nombre}</h3>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin size={12} />
                          {fundacion.ubicacion}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <p className="text-[#3e494a] text-sm leading-relaxed line-clamp-2">
                    {fundacion.descripcionCorta}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2 text-[#004955]">
                      <PawPrint size={16} />
                      <span className="text-sm font-semibold">
                        {fundacion.cantidadMascotasCuidado} mascotas
                      </span>
                    </div>
                    <span className="text-[#07c4e1] text-sm font-semibold group-hover:underline">
                      Ver detalle →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
