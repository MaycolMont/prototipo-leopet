import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Trash2, Heart, CreditCard, Lock, CheckCircle2, Edit3 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useManada } from '../context/ManadaContext';
import { useAuth } from '../context/AuthContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { AuthModal } from '../components/AuthModal';
import { PayPalCheckout } from '../components/PayPalCheckout';

export function ConfigurarManada() {
  const navigate = useNavigate();
  const { mascotas, removeFromManada, updateAnimalAmount, totalMonthly, clearManada, nombre, setNombre } = useManada();
  const { isAuthenticated } = useAuth();
  const { addSubscription } = useSubscriptions();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [editingName, setEditingName] = useState(false);

  const handleConfirm = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowPayPal(true);
  };

  const handlePaymentSuccess = () => {
    addSubscription({
      id: `sub-${Date.now()}`,
      userId: "user-1",
      manadaId: "mi-manada",
      pets: mascotas.map((a) => ({ petId: a.animalId, name: a.nombre || "", monthlyAmount: a.montoMensual, image: a.imagenUrl })),
      totalMonthly,
      status: "active",
      createdAt: new Date().toISOString(),
    });
    clearManada();
    setIsSuccess(true);
    setShowPayPal(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-white min-h-[calc(100vh-70px)] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-[#07c4e1]/20 rounded-full flex items-center justify-center mx-auto text-[#004955]">
            <CheckCircle2 size={48} className="text-[#00626d]" />
          </div>
          <h2 className="text-[#004955] text-3xl font-bold">¡Apadrinamiento Exitoso!</h2>
          <p className="text-[#3e494a] text-base leading-relaxed">
            Gracias por convertirte en padrino. Has iniciado el apadrinamiento para{" "}
            <span className="font-semibold text-[#004955]">
              {mascotas.map((a) => a.nombre).join(", ")}
            </span>. Recibirás reportes mensuales del progreso y salud.
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <Link to="/dashboard" className="bg-[#004955] hover:bg-[#00626d] text-white py-3 px-6 rounded-full font-medium transition-colors shadow-md">
              Ir a Mi Dashboard
            </Link>
            <Link to="/mascotas" className="text-[#004955] hover:underline text-sm font-medium">
              Explorar más mascotas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[calc(100vh-70px)] py-10 px-4 md:px-12 lg:px-24">
      <div className="mb-8">
        <Link to="/mascotas" className="inline-flex items-center gap-2 text-[#004955] hover:text-[#00626d] font-medium mb-4 transition-colors">
          <ArrowLeft size={20} />
          Volver al Catálogo
        </Link>
        <h1 className="text-[#004955] text-3xl md:text-4xl font-semibold tracking-wide">
          Mi Manada — Configurar Apadrinamiento
        </h1>
        <p className="text-[#3e494a] text-sm mt-1">
          Ajusta los montos mensuales y confirma tu apadrinamiento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          {/* Manada name */}
          <div className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-5 shadow-sm mb-4">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Nombre de tu manada</label>
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#07c4e1] rounded-xl text-[#004955] font-medium focus:ring-2 focus:ring-[#07c4e1] outline-none"
                  autoFocus
                  maxLength={40}
                />
                <button
                  onClick={() => setEditingName(false)}
                  className="text-[#004955] hover:text-[#00626d] p-2"
                >
                  <CheckCircle2 size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[#004955] font-semibold text-lg">{nombre}</span>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-gray-400 hover:text-[#004955] p-1 transition-colors"
                  title="Editar nombre"
                >
                  <Edit3 size={14} />
                </button>
              </div>
            )}
          </div>

          <h2 className="text-[#004955] text-xl font-semibold mb-4">
            Mascotas en tu manada ({mascotas.length})
          </h2>

          {mascotas.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
              <Heart size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-medium">Tu manada está vacía</p>
              <Link to="/mascotas" className="mt-4 inline-block bg-[#004955] text-white text-sm px-5 py-2.5 rounded-full font-medium">
                Ver Catálogo de Mascotas
              </Link>
            </div>
          ) : (
            mascotas.map((animal) => (
              <div key={animal.animalId} className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <ImageWithFallback src={animal.imagenUrl} alt={animal.nombre} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#1b1c1c] text-xl font-semibold">{animal.nombre}</h3>
                    <span className="text-[#004955] font-bold text-lg">
                      ${animal.montoMensual.toFixed(2)} / mes
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    {animal.refugioNombre}
                  </p>

                  <div className="flex items-center gap-3">
                    <label className="text-xs font-medium text-gray-600 whitespace-nowrap">Monto mensual:</label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={animal.montoMensual}
                      onChange={(e) => updateAnimalAmount(animal.animalId, Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#07c4e1]"
                    />
                    <span className="text-sm font-bold text-[#004955] w-16 text-right">${animal.montoMensual.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <span>{animal.etiqueta && <span className="px-2 py-0.5 rounded-full bg-[#004955]/10 text-[#004955] text-[10px] font-semibold">{animal.etiqueta}</span>}</span>
                    <button
                      onClick={() => removeFromManada(animal.animalId)}
                      className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
            <h2 className="text-[#004955] text-xl font-semibold border-b border-gray-100 pb-3">
              Resumen de Apadrinamiento
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Manada:</span>
                <span className="font-semibold text-[#004955]">{nombre}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Mascotas:</span>
                <span className="font-semibold text-[#004955]">{mascotas.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frecuencia:</span>
                <span className="font-semibold text-[#004955]">Mensual Recurrente</span>
              </div>
              <div className="flex justify-between text-[#004955] font-bold text-lg border-t border-gray-100 pt-3">
                <span>Total mensual:</span>
                <span>${totalMonthly.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Lock size={14} className="text-[#00626d]" />
              <span>Pago procesado de forma segura vía PayPal Sandbox</span>
            </div>

            {showPayPal ? (
              <PayPalCheckout
                amount={totalMonthly}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPayPal(false)}
              />
            ) : (
              <button
                onClick={handleConfirm}
                disabled={mascotas.length === 0}
                className={`w-full font-medium text-lg py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md ${
                  mascotas.length > 0
                    ? "bg-[#07c4e1] hover:bg-[#06aec8] text-[#004955] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <CreditCard size={20} />
                Confirmar Apadrinamiento
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowPayPal(true)}
      />
    </div>
  );
}
