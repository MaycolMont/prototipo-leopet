import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import svgPaths from "../../imports/NavbarDonador/svg-hguxyjw148";
import { useAuth } from '../context/AuthContext';
import { useManada } from '../context/ManadaContext';
import { AuthModal } from './AuthModal';

export function NavbarDonador() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, isAuthenticated, logout } = useAuth();
  const { pets } = useManada();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <nav className="bg-[#004955] h-[70px] w-full px-4 md:px-12 lg:px-[96px] flex items-center justify-between sticky top-0 z-50 shadow-md">
        <Link to="/" className="h-[50px] w-[60px] flex-shrink-0">
          <svg className="size-full" fill="none" viewBox="0 0 60 50">
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

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="flex items-center text-white text-base lg:text-[20px] font-medium font-['Host_Grotesk']">
            <Link to="/" className="px-3 py-2 hover:text-[#07c4e1] transition-colors">Inicio</Link>
            <a href={isHome ? "#nosotros" : "/#nosotros"} className="px-3 py-2 hover:text-[#07c4e1] transition-colors">Nosotros</a>
            <a href={isHome ? "#mision" : "/#mision"} className="px-3 py-2 hover:text-[#07c4e1] transition-colors">Misión</a>
          </div>
          
          <div className="w-px h-6 bg-white/30" />
          
          <div className="flex items-center text-white text-base lg:text-[20px] font-medium font-['Host_Grotesk']">
            <Link to="/mascotas" className="px-3 py-2 hover:text-[#07c4e1] transition-colors">Mascotas</Link>
            <Link to="/fundaciones" className="px-3 py-2 hover:text-[#07c4e1] transition-colors">Fundaciones</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="px-3 py-2 hover:text-[#07c4e1] transition-colors">Dashboard</Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <Link to="/mi-manada/configurar" className="relative w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity" title="Ver Mi Manada">
            <svg className="size-full" fill="none" viewBox="0 0 36 36">
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

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-medium hidden lg:inline">
                Hola, {user?.name}
              </span>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="bg-[#07c4e1] text-[#004955] px-4 lg:px-6 py-1.5 lg:py-2 rounded-full font-medium text-sm lg:text-[20px] flex items-center gap-2 hover:bg-[#06aec8] transition-colors"
              >
                Cerrar sesión
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
                  <path d={svgPaths.p39ccd2b2} fill="#004955" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-[#07c4e1] text-[#004955] px-4 lg:px-6 py-1.5 lg:py-2 rounded-full font-medium text-sm lg:text-[20px] flex items-center gap-2 hover:bg-[#06aec8] transition-colors"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
