import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Trash2, Heart, CheckCircle2, ShieldCheck, CreditCard, Lock } from 'lucide-react';
import imgJasper from "../../imports/Manada/05315c921ffb0646b298e09ecd7293761ebbf584.png";
import imgMain from "../../imports/DetalleDeMascotaLeoPet/b5e67b3823fbd4287dcd8b82dc791a0d64b1d4a9.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CarritoView() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 'pluto',
      name: 'Pluto',
      manada: 'Mi Manada',
      monthlyAmount: 25.00,
      fee: 3.75,
      subtotal: 4.25,
      image: imgMain,
    },
    {
      id: 'jasper',
      name: 'Jasper',
      manada: 'Mi Manada',
      monthlyAmount: 25.00,
      fee: 3.75,
      subtotal: 4.25,
      image: imgJasper,
    }
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '4532 •••• •••• 8892',
    cardName: 'María Fernanda Gómez',
    expiry: '08/28',
    cvv: '•••'
  });

  const totalMonthly = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
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
            Gracias por convertirte en padrino de Grupo Leopet. Has iniciado el apadrinamiento para{" "}
            <span className="font-semibold text-[#004955]">
              {cartItems.map(i => i.name).join(", ")}
            </span>. Recibirás reportes mensuales del progreso y salud en tu correo.
          </p>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/manadas"
              className="bg-[#004955] hover:bg-[#00626d] text-white py-3 px-6 rounded-full font-medium transition-colors shadow-md"
            >
              Ir a Mis Manadas
            </Link>
            <Link
              to="/mascotas"
              className="text-[#004955] hover:underline text-sm font-medium"
            >
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
        <Link
          to="/manadas"
          className="inline-flex items-center gap-2 text-[#004955] hover:text-[#00626d] font-medium mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a Mis Manadas
        </Link>
        <h1 className="text-[#004955] text-3xl md:text-4xl font-semibold tracking-wide">
          Carrito de Apadrinamiento
        </h1>
        <p className="text-[#3e494a] text-sm mt-1">
          Revisa el desglose de donaciones y completa tu pago de suscripción mensual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-[#004955] text-xl font-semibold mb-4">
            Mascotas en tu carrito ({cartItems.length})
          </h2>

          {cartItems.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
              <Heart size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-medium">Tu carrito está vacío</p>
              <Link
                to="/mascotas"
                className="mt-4 inline-block bg-[#004955] text-white text-sm px-5 py-2.5 rounded-full font-medium"
              >
                Ver Catálogo de Mascotas
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#1b1c1c] text-xl font-semibold">{item.name}</h3>
                    <span className="text-[#004955] font-bold text-lg">
                      ${item.subtotal.toFixed(2)} / mes
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    Manada asignada: <span className="font-semibold text-[#004955]">{item.manada}</span>
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <span>Monto base: ${item.monthlyAmount.toFixed(2)}</span>
                    <button
                      onClick={() => handleRemove(item.id)}
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

        {/* Payment Checkout Panel */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#BDC8CA]/40 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
            <h2 className="text-[#004955] text-xl font-semibold border-b border-gray-100 pb-3">
              Método de Pago
            </h2>

            <form onSubmit={handlePayment} className="space-y-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? "border-[#07c4e1] bg-[#07c4e1]/10 text-[#004955]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard size={18} />
                  Tarjeta Crédito/Débito
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Fecha Expiración
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal mensual:</span>
                  <span>${totalMonthly.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-[#004955] font-bold text-lg border-t border-gray-100 pt-2">
                  <span>Total hoy:</span>
                  <span>${totalMonthly.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <Lock size={14} className="text-[#00626d]" />
                <span>Pago procesado de forma encriptada y segura</span>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0}
                className={`w-full font-medium text-lg py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md ${
                  cartItems.length > 0
                    ? "bg-[#07c4e1] hover:bg-[#06aec8] text-[#004955] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirmar y Apadrinar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
