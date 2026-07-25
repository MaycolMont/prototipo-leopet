import React from 'react';
import { Hero } from './components/Hero';
import { Nosotros } from './components/Nosotros';
import { UrgentPets } from './components/UrgentPets';
import { Mission } from './components/Mission';
import { Objectives } from './components/Objectives';
import { RegistrationForm } from './components/RegistrationForm';

export function HomePage() {
  return (
    <>
      <Hero />
      <section id="nosotros">
        <Nosotros />
      </section>
      <UrgentPets />
      <section id="mision">
        <Mission />
      </section>
      <Objectives />
      <RegistrationForm />
    </>
  );
}
