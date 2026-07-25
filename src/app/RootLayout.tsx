import React from 'react';
import { Outlet } from 'react-router';
import { NavbarDonador } from './components/NavbarDonador';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ManadaProvider } from './context/ManadaContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { ManadaFloatingBar } from './components/ManadaFloatingBar';

export function RootLayout() {
  return (
    <AuthProvider>
      <ManadaProvider>
        <SubscriptionProvider>
          <div className="min-h-screen bg-white font-['Host_Grotesk'] overflow-x-hidden flex flex-col">
            <NavbarDonador />
            <main className="flex-grow">
              <Outlet />
            </main>
            <Footer />
            <ManadaFloatingBar />
          </div>
        </SubscriptionProvider>
      </ManadaProvider>
    </AuthProvider>
  );
}
