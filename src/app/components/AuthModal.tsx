import React, { useState, useRef, useEffect } from "react";
import { X, Mail, Lock, User, Heart, IdCard, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateFields = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === "login") {
      if (!email.trim()) newErrors.email = "El correo es obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Ingresa un correo válido";
      if (!password) newErrors.password = "La contraseña es obligatoria";
    } else {
      if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
      if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
      if (!cedula.trim()) newErrors.cedula = "La cédula es obligatoria";
      else if (!/^\d{10}$/.test(cedula.replace(/\D/g, ""))) newErrors.cedula = "Ingresa una cédula válida (10 dígitos)";
      if (!email.trim()) newErrors.email = "El correo es obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Ingresa un correo válido";
      if (!password) newErrors.password = "La contraseña es obligatoria";
      else if (password.length < 8) newErrors.password = "Mínimo 8 caracteres";
      if (!confirmPassword) newErrors.confirmPassword = "Confirma tu contraseña";
      else if (password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
      if (!acceptTerms) newErrors.terms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    if (mode === "login") {
      login(email, password);
    } else {
      register(nombre, apellido, email, password, cedula);
    }

    setIsSubmitting(false);
    onSuccess?.();
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setCedula("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAcceptTerms(false);
    setShowPassword(false);
    setErrors({});
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
    resetForm();
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 4 ? 1 : password.length < 8 ? 2 : 3;
  const strengthColors = ["bg-gray-200", "bg-red-400", "bg-[#ffac13]", "bg-[#47f6a1]"];
  const strengthLabels = ["", "Débil", "Media", "Fuerte"];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-[24px] max-w-md w-full p-8 shadow-xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07c4e1]"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#07c4e1]/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Heart size={24} className="text-[#00626d]" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-[#004955] text-2xl font-semibold">
              {mode === "login" ? "Bienvenido de vuelta" : "Únete a Leopet"}
            </h2>
            <p className="text-[#3e494a] text-sm">
              {mode === "login" ? "Inicia sesión para continuar" : "Crea tu cuenta de padrino"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {mode === "register" && (
            <>
              <div>
                <label htmlFor="auth-nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-[#ee5871]" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    ref={firstInputRef}
                    id="auth-nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="María Fernanda"
                    autoComplete="given-name"
                    aria-required="true"
                    aria-invalid={!!errors.nombre}
                    aria-describedby={errors.nombre ? "error-nombre" : undefined}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] focus:border-transparent outline-none transition-colors ${
                      errors.nombre ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.nombre && <p id="error-nombre" className="text-red-500 text-xs mt-1" role="alert">{errors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="auth-apellido" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido <span className="text-[#ee5871]" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="auth-apellido"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Gómez López"
                    autoComplete="family-name"
                    aria-required="true"
                    aria-invalid={!!errors.apellido}
                    aria-describedby={errors.apellido ? "error-apellido" : undefined}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] focus:border-transparent outline-none transition-colors ${
                      errors.apellido ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.apellido && <p id="error-apellido" className="text-red-500 text-xs mt-1" role="alert">{errors.apellido}</p>}
              </div>
              <div>
                <label htmlFor="auth-cedula" className="block text-sm font-medium text-gray-700 mb-1">
                  Cédula <span className="text-[#ee5871]" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <IdCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="auth-cedula"
                    type="text"
                    inputMode="numeric"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="1712345678"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={!!errors.cedula}
                    aria-describedby={errors.cedula ? "error-cedula" : undefined}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] focus:border-transparent outline-none transition-colors ${
                      errors.cedula ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.cedula && <p id="error-cedula" className="text-red-500 text-xs mt-1" role="alert">{errors.cedula}</p>}
              </div>
            </>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico <span className="text-[#ee5871]" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                ref={mode === "login" ? firstInputRef : undefined}
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "error-email" : undefined}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] focus:border-transparent outline-none transition-colors ${
                  errors.email ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
            </div>
            {errors.email && <p id="error-email" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña <span className="text-[#ee5871]" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "error-password" : undefined}
                className={`w-full pl-10 pr-12 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] focus:border-transparent outline-none transition-colors ${
                  errors.password ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p id="error-password" className="text-red-500 text-xs mt-1" role="alert">{errors.password}</p>}

            {mode === "register" && password.length > 0 && (
              <div className="mt-2" aria-live="polite">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColors[passwordStrength] : "bg-gray-200"}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Seguridad: <span className="font-medium">{strengthLabels[passwordStrength]}</span></p>
              </div>
            )}
          </div>

          {mode === "register" && (
            <>
              <div>
                <label htmlFor="auth-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña <span className="text-[#ee5871]" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="auth-confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    aria-required="true"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? "error-confirm" : undefined}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#07c4e1] focus:border-transparent outline-none transition-colors ${
                      errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                  />
                  {confirmPassword && confirmPassword === password && (
                    <CheckCircle2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#47f6a1]" aria-label="Las contraseñas coinciden" />
                  )}
                </div>
                {errors.confirmPassword && <p id="error-confirm" className="text-red-500 text-xs mt-1" role="alert">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="auth-terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#07c4e1] accent-[#07c4e1] focus:ring-[#07c4e1] cursor-pointer"
                  aria-required="true"
                  aria-invalid={!!errors.terms}
                />
                <label htmlFor="auth-terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                  Acepto los{" "}
                  <a href="#" className="text-[#07c4e1] hover:underline font-medium" onClick={(e) => e.stopPropagation()}>Términos y Condiciones</a>
                  {" "}y la{" "}
                  <a href="#" className="text-[#07c4e1] hover:underline font-medium" onClick={(e) => e.stopPropagation()}>Política de Privacidad</a>
                  {" "}de Leopet.
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs" role="alert">{errors.terms}</p>}
            </>
          )}

          {mode === "login" && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#07c4e1] accent-[#07c4e1]" />
                <span className="text-sm text-gray-600">Recordarme</span>
              </label>
              <button type="button" className="text-sm text-[#07c4e1] hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {Object.keys(errors).length > 0 && !Object.values(errors).some(Boolean) && (
            <p className="text-red-500 text-sm" role="alert">Completa todos los campos correctamente</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00626d] hover:bg-[#004955] text-[#07c4e1] font-medium text-lg py-3.5 rounded-full transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07c4e1]"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>{mode === "login" ? "Ingresando..." : "Creando cuenta..."}</span>
              </>
            ) : (
              mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button
            onClick={switchMode}
            className="text-[#07c4e1] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07c4e1] rounded"
          >
            {mode === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
