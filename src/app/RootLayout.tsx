import React from 'react';
import { Outlet } from 'react-router';
import { NavbarDonador } from './components/NavbarDonador';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ManadaProvider } from './context/ManadaContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { AdminProvider } from './context/AdminContext';
import { FoundationProvider } from './context/FoundationContext';
import { ManadaFloatingBar } from './components/ManadaFloatingBar';

export function RootLayout() {
  return (
    <AuthProvider>
      <ManadaProvider>
        <SubscriptionProvider>
          <AdminProvider>
            <FoundationProvider>
              <div className="min-h-screen bg-white font-['Host_Grotesk'] overflow-x-hidden flex flex-col">
                <NavbarDonador />
                <main id="main-content" className="flex-grow" tabIndex={-1}>
                  <Outlet />
                </main>
                <Footer />
                <ManadaFloatingBar />
              </div>
            </FoundationProvider>
          </AdminProvider>
        </SubscriptionProvider>
      </ManadaProvider>
    </AuthProvider>
  );
}
