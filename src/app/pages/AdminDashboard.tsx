import React from 'react';
import { Link } from 'react-router';
import { PawPrint, FileCheck, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AdminLayout } from './AdminLayout';

export function AdminDashboard() {
  const { solicitudes, denuncias } = useAdmin();

  const pendientes = solicitudes.filter((s) => s.estado === "Pendiente").length;
  const aprobadas = solicitudes.filter((s) => s.estado === "Aprobada").length;
  const rechazadas = solicitudes.filter((s) => s.estado === "Rechazada").length;
  const denunciasAbiertas = denuncias.filter((d) => d.estado === "pendiente" || d.estado === "notificada").length;
  const denunciasResueltas = denuncias.filter((d) => d.estado === "resuelta").length;

  const stats = [
    { label: "Fundaciones Aprobadas", value: aprobadas, icon: <PawPrint size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
    { label: "Solicitudes Pendientes", value: pendientes, icon: <FileCheck size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
    { label: "Denuncias Abiertas", value: denunciasAbiertas, icon: <AlertTriangle size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
    { label: "Denuncias Resueltas", value: denunciasResueltas, icon: <TrendingUp size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-5 flex items-center gap-4 shadow-sm">
              <div className={`${stat.color} p-3 rounded-xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[#3e494a] text-xs font-medium">{stat.label}</p>
                <p className="text-[#004955] text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-6 shadow-sm">
            <h3 className="text-[#004955] text-lg font-semibold mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <Link to="/admin/solicitudes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="bg-[#004955]/10 p-2 rounded-lg"><FileCheck size={18} className="text-[#004955]" /></div>
                <div className="flex-1">
                  <p className="text-[#004955] font-medium text-sm">Revisar Solicitudes</p>
                  <p className="text-gray-500 text-xs">{pendientes} pendiente{pendientes !== 1 ? "s" : ""} de revisión</p>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-[#07c4e1] transition-colors" />
              </Link>
              <Link to="/admin/denuncias" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="bg-[#004955]/10 p-2 rounded-lg"><AlertTriangle size={18} className="text-[#004955]" /></div>
                <div className="flex-1">
                  <p className="text-[#004955] font-medium text-sm">Moderar Denuncias</p>
                  <p className="text-gray-500 text-xs">{denunciasAbiertas} denuncia{denunciasAbiertas !== 1 ? "s" : ""} abierta{denunciasAbiertas !== 1 ? "s" : ""}</p>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-[#07c4e1] transition-colors" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-6 shadow-sm">
            <h3 className="text-[#004955] text-lg font-semibold mb-4">Resumen de Actividad</h3>
            <div className="space-y-3">
              {solicitudes.filter((s) => s.estado === "Pendiente").slice(0, 3).map((sol) => (
                <div key={sol.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-[#004955] font-medium text-sm">{sol.fundacionNombre}</p>
                    <p className="text-gray-500 text-xs">{sol.ubicacion} · {sol.fechaSolicitud}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#004955]/10 text-[#004955]">
                    Pendiente
                  </span>
                </div>
              ))}
              {solicitudes.filter((s) => s.estado === "Pendiente").length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No hay solicitudes pendientes</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
