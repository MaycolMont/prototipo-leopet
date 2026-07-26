import React from 'react';
import { Link } from 'react-router';
import { PawPrint, Heart, TrendingUp, Calendar, CreditCard, AlertCircle, Building2 } from 'lucide-react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useFavoritos } from '../context/FavoritosContext';
import { DashboardLayout } from './DashboardLayout';

export function Dashboard() {
  const { subscriptions } = useSubscriptions();
  const { favoritos } = useFavoritos();

  const activeSubs = subscriptions.filter((s) => s.status === "active");
  const pausedSubs = subscriptions.filter((s) => s.status === "paused");
  const totalPets = subscriptions.reduce((acc, s) => acc + s.pets.length, 0);
  const totalMonthly = subscriptions.reduce((acc, s) => acc + s.totalMonthly, 0);

  const stats = [
    { label: "Suscripciones activas", value: activeSubs.length, icon: <CreditCard size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
    { label: "Mascotas apadrinadas", value: totalPets, icon: <PawPrint size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
    { label: "Aporte mensual", value: `$${totalMonthly.toFixed(2)}`, icon: <TrendingUp size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
    { label: "Fundaciones favoritas", value: favoritos.length, icon: <Heart size={24} className="text-[#004955]" />, color: "bg-[#004955]/10" },
  ];

  return (
    <DashboardLayout>
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
              <Link to="/mascotas" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-[#004955]/10 p-2 rounded-lg"><PawPrint size={18} className="text-[#004955]" /></div>
                <div>
                  <p className="text-[#004955] font-medium text-sm">Explorar Mascotas</p>
                  <p className="text-gray-500 text-xs">Encuentra nuevos padrinos para tu manada</p>
                </div>
              </Link>
              <Link to="/dashboard/evidencias" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-[#004955]/10 p-2 rounded-lg"><TrendingUp size={18} className="text-[#004955]" /></div>
                <div>
                  <p className="text-[#004955] font-medium text-sm">Ver Evidencias</p>
                  <p className="text-gray-500 text-xs">Califica el progreso de tus mascotas</p>
                </div>
              </Link>
              <Link to="/fundaciones?filtro=favoritas" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-[#004955]/10 p-2 rounded-lg"><Heart size={18} className="text-[#004955]" /></div>
                <div>
                  <p className="text-[#004955] font-medium text-sm">Ver Favoritas</p>
                  <p className="text-gray-500 text-xs">Tus fundaciones guardadas</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#BDC8CA]/40 p-6 shadow-sm">
            <h3 className="text-[#004955] text-lg font-semibold mb-4">Suscripciones Recientes</h3>
            {subscriptions.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500 text-sm">Aún no tienes suscripciones</p>
                <Link to="/mascotas" className="text-[#07c4e1] text-sm font-medium hover:underline">Explorar mascotas</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {subscriptions.slice(0, 5).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div>
                      <p className="text-[#004955] font-medium text-sm">{sub.pets.map((p) => p.name).join(", ")}</p>
                      <p className="text-gray-500 text-xs">{new Date(sub.createdAt).toLocaleDateString("es-EC")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#004955] font-bold text-sm">${sub.totalMonthly.toFixed(2)}/mes</p>
                      <span className={`text-xs font-medium ${sub.status === "active" ? "text-[#004955]" : "text-gray-500"}`}>
                        {sub.status === "active" ? "Activa" : "Pausada"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
