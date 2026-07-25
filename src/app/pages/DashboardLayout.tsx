import React from 'react';
import { Link, useLocation } from 'react-router';
import { PawPrint, BarChart3, LayoutGrid, Settings, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSubscriptions } from '../context/SubscriptionContext';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { subscriptions } = useSubscriptions();

  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-[calc(100vh-70px)] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h2 className="text-[#004955] text-2xl font-bold">Accede a tu Dashboard</h2>
          <p className="text-gray-500">Inicia sesión para ver tus evidencias y gestionar tu manada.</p>
          <Link to="/mascotas" className="inline-block bg-[#004955] text-white px-6 py-3 rounded-full font-medium hover:bg-[#00626d] transition-colors">
            Explorar Mascotas
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { path: "/dashboard", label: "Resumen", icon: <BarChart3 size={18} />, exact: true },
    { path: "/dashboard/evidencias", label: "Evidencias", icon: <PawPrint size={18} /> },
    { path: "/dashboard/manada", label: "Mi Manada", icon: <LayoutGrid size={18} /> },
  ];

  const activeSubCount = subscriptions.filter((s) => s.status === "active").length;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-70px)]">
      <div className="bg-[#004955] px-4 md:px-12 lg:px-[96px] py-6">
        <div className="max-w-[1248px] mx-auto">
          <h1 className="text-white text-3xl font-semibold mb-2">Mi Dashboard</h1>
          <p className="text-[#07c4e1] text-sm">
            {activeSubCount > 0
              ? `Tienes ${activeSubCount} suscripción${activeSubCount > 1 ? "es" : ""} activa${activeSubCount > 1 ? "s" : ""}`
              : "Aún no tienes suscripciones activas"}
          </p>

          <div className="flex gap-1 mt-6 bg-[#003840] rounded-xl p-1 w-fit">
            {tabs.map((tab) => {
              const isActive = tab.exact
                ? location.pathname === tab.path
                : location.pathname.startsWith(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
