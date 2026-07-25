import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { BarChart3, FileCheck, AlertTriangle, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || user?.rol !== "admin") {
    return (
      <div className="bg-white min-h-[calc(100vh-70px)] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <Shield size={32} className="text-red-400" />
          </div>
          <h2 className="text-[#004955] text-2xl font-bold">Acceso Restringido</h2>
          <p className="text-gray-500 max-w-sm">Esta sección es exclusiva para administradores. Inicia sesión con una cuenta de administrador para continuar.</p>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="inline-block bg-[#004955] text-white px-6 py-3 rounded-full font-medium hover:bg-[#00626d] transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { path: "/admin", label: "Resumen", icon: <BarChart3 size={18} />, exact: true },
    { path: "/admin/solicitudes", label: "Solicitudes", icon: <FileCheck size={18} /> },
    { path: "/admin/denuncias", label: "Denuncias", icon: <AlertTriangle size={18} /> },
  ];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-70px)]">
      <div className="bg-[#004955] px-4 md:px-12 lg:px-[96px] py-6">
        <div className="max-w-[1248px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield size={24} className="text-[#07c4e1]" />
                <h1 className="text-white text-2xl sm:text-3xl font-semibold">Panel Administrador</h1>
              </div>
              <p className="text-[#07c4e1] text-sm">
                Bienvenido, {user?.nombre} {user?.apellido}
              </p>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
              aria-label="Cerrar sesión"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>

          <div className="flex gap-1 mt-6 bg-[#003840] rounded-xl p-1 w-full sm:w-fit overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = tab.exact
                ? location.pathname === tab.path
                : location.pathname.startsWith(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-[#07c4e1] text-[#004955]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-4 md:px-12 lg:px-[96px] py-8">
        {children}
      </div>
    </div>
  );
}
