import React, { useState } from 'react';
import { Search, Users, PawPrint, DollarSign } from 'lucide-react';
import { useFoundation } from '../context/FoundationContext';
import { useAuth } from '../context/AuthContext';
import { FoundationLayout } from './FoundationLayout';

export function FoundationPadrinos() {
  const { padrinos, mascotas } = useFoundation();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const fundacionId = user?.id === "usr-fund1" ? "fund-01" : user?.id === "usr-fund2" ? "fund-02" : "fund-03";

  const misPadrinos = padrinos.filter((p) => {
    if (p.fundacionId !== fundacionId) return false;
    if (search && !p.donadorNombre.toLowerCase().includes(search.toLowerCase()) && !p.mascotaNombre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalMensual = misPadrinos
    .filter((p) => p.estado === "activo")
    .reduce((sum, p) => sum + p.montoMensual, 0);

  const activos = misPadrinos.filter((p) => p.estado === "activo").length;
  const pausados = misPadrinos.filter((p) => p.estado === "pausado").length;

  return (
    <FoundationLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-5 flex items-center gap-4 shadow-sm">
            <div className="bg-[#004955]/10 p-3 rounded-xl"><Users size={24} className="text-[#004955]" /></div>
            <div>
              <p className="text-[#3e494a] text-xs font-medium">Padrinos Activos</p>
              <p className="text-[#004955] text-2xl font-bold">{activos}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-5 flex items-center gap-4 shadow-sm">
            <div className="bg-[#004955]/10 p-3 rounded-xl"><DollarSign size={24} className="text-[#004955]" /></div>
            <div>
              <p className="text-[#3e494a] text-xs font-medium">Aporte Mensual</p>
              <p className="text-[#004955] text-2xl font-bold">${totalMensual}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-5 flex items-center gap-4 shadow-sm">
            <div className="bg-[#004955]/10 p-3 rounded-xl"><Users size={24} className="text-[#004955]" /></div>
            <div>
              <p className="text-[#3e494a] text-xs font-medium">Pausados</p>
              <p className="text-[#004955] text-2xl font-bold">{pausados}</p>
            </div>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o mascota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#07c4e1]/50 focus:border-[#07c4e1] transition-colors"
          />
        </div>

        <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Donador</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mascota</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto Mensual</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Desde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {misPadrinos.map((padrino) => (
                  <tr key={padrino.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-[#004955] font-medium text-sm">{padrino.donadorNombre}</p>
                        <p className="text-gray-500 text-xs">{padrino.donadorCorreo}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <PawPrint size={14} className="text-[#07c4e1]" />
                        <span className="text-sm text-gray-700">{padrino.mascotaNombre}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[#004955] font-semibold text-sm">${padrino.montoMensual}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        padrino.estado === "activo"
                          ? "bg-[#004955]/10 text-[#004955]"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {padrino.estado === "activo" ? "Activo" : "Pausado"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-gray-500 text-sm">{padrino.fechaInicio}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {misPadrinos.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron padrinos</p>
            </div>
          )}
        </div>
      </div>
    </FoundationLayout>
  );
}
