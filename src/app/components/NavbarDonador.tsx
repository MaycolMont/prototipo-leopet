import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import svgPaths from "../../imports/NavbarDonador/svg-hguxyjw148";
import { useAuth } from '../context/AuthContext';
import { useManada } from '../context/ManadaContext';
import { AuthModal } from './AuthModal';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Shield, Building2 } from 'lucide-react';

export function NavbarDonador() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, isAuthenticated, logout } = useAuth();
  const { pets } = useManada();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [userMenuOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isAdmin = user?.rol === 'admin';
  const isFoundation = user?.rol === 'fundacion';

  return (
    <>
      <nav className="bg-[#004955] h-[70px] w-full px-4 md:px-8 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-md" role="navigation" aria-label="Menú principal">
        <Link to="/" className="h-[50px] w-[60px] flex-shrink-0" aria-label="LeoPet — Ir al inicio">
          <svg className="size-full" fill="none" viewBox="0 0 60 50" aria-hidden="true">
            <g id="Group 1">
              <path d={svgPaths.p39cb6400} fill="white" />
              <path d={svgPaths.p1b35b7a0} fill="#EE5871" />
              <path d={svgPaths.p2522ae00} fill="#EE5871" />
              <path d={svgPaths.p3d6cebf1} fill="white" />
              <path d={svgPaths.p17fc5000} fill="white" />
              <path d={svgPaths.p1073b100} fill="#EE5871" />
              <path d={svgPaths.p101f8c40} fill="white" />
              <path d={svgPaths.p39f6f000} fill="white" />
              <path d={svgPaths.p1226c6c0} fill="white" />
              <path d={svgPaths.pc3ed400} fill="white" />
            </g>
          </svg>
        </Link>

        {/* Desktop nav links — only Mascotas + Fundaciones */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 text-white text-[15px] lg:text-[18px] font-medium font-['Host_Grotesk']">
          <Link to="/mascotas" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">Mascotas</Link>
          <Link to="/fundaciones" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">Fundaciones</Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>

          {/* Manada icon */}
          <Link
            to="/mi-manada/configurar"
            className="relative w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
            aria-label={`Ver Mi Manada${pets.length > 0 ? ` (${pets.length} mascota${pets.length > 1 ? "s" : ""})` : ""}`}
          >
            <svg className="size-full" fill="none" viewBox="0 0 36 36" aria-hidden="true">
              <path d={svgPaths.pd47b000} fill="#07C4E1" />
              <path d={svgPaths.p21ec9b80} fill="#07C4E1" />
              <path d={svgPaths.p21a62080} fill="#07C4E1" />
              <path d={svgPaths.p290d7080} fill="#07C4E1" />
              <path d={svgPaths.p3c4d8a10} fill="#07C4E1" />
              <path d={svgPaths.p38b13200} fill="#07C4E1" />
            </svg>
            {pets.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ee5871] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {pets.length}
              </span>
            )}
          </Link>

          {/* Auth section */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 text-white hover:bg-white/10 rounded-lg px-2 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="Menú de usuario"
              >
                <span className="w-8 h-8 rounded-full bg-[#07c4e1] text-[#004955] flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {user?.nombre?.charAt(0)?.toUpperCase()}{user?.apellido?.charAt(0)?.toUpperCase()}
                </span>
                <ChevronDown
                  size={14}
                  className={`hidden sm:block transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.nombre} {user?.apellido}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EE5871]/10 text-[#EE5871] uppercase tracking-wide flex-shrink-0">
                          <Shield size={10} aria-hidden="true" />
                          Admin
                        </span>
                      )}
                      {isFoundation && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#07c4e1]/10 text-[#00626d] uppercase tracking-wide flex-shrink-0">
                          <Building2 size={10} aria-hidden="true" />
                          Fund.
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user?.correo}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard size={16} className="text-gray-400" aria-hidden="true" />
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Shield size={16} className="text-[#EE5871]" aria-hidden="true" />
                        Panel Admin
                      </Link>
                    )}
                    {isFoundation && (
                      <Link
                        to="/fundacion"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Building2 size={16} className="text-[#07c4e1]" aria-hidden="true" />
                        Panel Fundación
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => { setUserMenuOpen(false); logout(); navigate('/'); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut size={16} className="text-gray-400" aria-hidden="true" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-[#07c4e1] text-[#004955] px-4 lg:px-6 py-1.5 lg:py-2 rounded-full font-medium text-sm lg:text-[16px] hover:bg-[#06aec8] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="hidden sm:inline">Iniciar Sesión</span>
              <span className="sm:hidden">Entrar</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] z-40 bg-black/40" onClick={() => setMobileMenuOpen(false)} role="dialog" aria-label="Menú de navegación móvil">
          <div
            className="bg-[#004955] border-t border-white/10 px-6 py-6 shadow-lg max-h-[calc(100vh-70px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="menu"
          >
            <div className="flex flex-col text-white text-lg font-medium font-['Host_Grotesk'] gap-1">
              <Link to="/" className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors" role="menuitem">Inicio</Link>
              <a href={isHome ? "#nosotros" : "/#nosotros"} className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors" role="menuitem">Nosotros</a>
              <a href={isHome ? "#mision" : "/#mision"} className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors" role="menuitem">Misión</a>
            </div>
            <div className="w-full h-px bg-white/20 my-3" />
            <div className="flex flex-col text-white text-lg font-medium font-['Host_Grotesk'] gap-1">
              <Link to="/mascotas" className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors" role="menuitem">Mascotas</Link>
              <Link to="/fundaciones" className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors" role="menuitem">Fundaciones</Link>
            </div>

            {isAuthenticated && (
              <>
                <div className="w-full h-px bg-white/20 my-3" />
                <div className="flex flex-col text-white text-lg font-medium font-['Host_Grotesk'] gap-1">
                  <Link to="/dashboard" className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors" role="menuitem">Dashboard</Link>
                  {isAdmin && (
                    <Link to="/admin" className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-[#EE5871] font-semibold" role="menuitem">Panel Admin</Link>
                  )}
                  {isFoundation && (
                    <Link to="/fundacion" className="px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-[#07c4e1] font-semibold" role="menuitem">Panel Fundación</Link>
                  )}
                </div>
                <div className="w-full h-px bg-white/20 my-3" />
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); navigate('/'); }}
                  className="text-left px-3 py-2.5 text-white text-lg font-medium font-['Host_Grotesk'] rounded-lg hover:bg-white/10 transition-colors"
                  role="menuitem"
                >
                  Cerrar sesión
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <div className="w-full h-px bg-white/20 my-3" />
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowAuthModal(true); }}
                  className="w-full bg-[#07c4e1] text-[#004955] py-3 rounded-full font-semibold text-lg hover:bg-[#06aec8] transition-colors"
                  role="menuitem"
                >
                  Iniciar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
