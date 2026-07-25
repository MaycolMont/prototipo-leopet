import React, { useState, useEffect, useRef } from 'react';
import { CreditCard, CheckCircle2, Loader2 } from 'lucide-react';

interface PayPalCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PayPalCheckout({ amount, onSuccess, onCancel }: PayPalCheckoutProps) {
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paypalRef.current && status === "idle") {
      paypalRef.current.innerHTML = "";

      const btn = document.createElement("div");
      btn.className = "paypal-button-container";

      const button = document.createElement("button");
      button.className = "w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-3 shadow-md cursor-pointer";
      button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
        </svg>
        Pagar con PayPal (${amount.toFixed(2)} USD)
      `;

      button.onclick = () => {
        setStatus("processing");
        setTimeout(() => {
          setStatus("success");
          setTimeout(() => {
            onSuccess();
          }, 1500);
        }, 2000);
      };

      btn.appendChild(button);
      paypalRef.current.appendChild(btn);
    }
  }, [status, amount, onSuccess]);

  if (status === "processing") {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <Loader2 size={32} className="text-[#07c4e1] animate-spin" />
        <p className="text-sm text-gray-600 font-medium">Procesando pago en PayPal Sandbox...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 size={40} className="text-[#00626d]" />
        <p className="text-sm text-[#004955] font-semibold">¡Pago aprobado en Sandbox!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div ref={paypalRef} />
      <button
        onClick={onCancel}
        className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium py-2 transition-colors"
      >
        Cancelar
      </button>
    </div>
  );
}
