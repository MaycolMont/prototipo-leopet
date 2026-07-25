import React from 'react';
import { motion } from "motion/react";
import { ShieldCheck, Users, Lock } from 'lucide-react';

interface ObjectiveCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

function ObjectiveCard({ title, subtitle, description, icon }: ObjectiveCardProps) {
  return (
    <div className="bg-[#0598ae] rounded-[28px] p-10 flex flex-col items-center text-center text-white h-[420px] justify-between">
      <div className="text-[#006676] bg-white/10 p-6 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-[32px] font-semibold leading-[1.1] mb-1">
          {title}
        </h3>
        <p className="text-[32px] font-semibold leading-[1.1] mb-6">
          {subtitle}
        </p>
        <p className="text-[20px] leading-[1.25] text-white/90">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Objectives() {
  const items = [
    {
      title: "Trazabilidad",
      subtitle: "y Veracidad",
      description: "Implementar un sistema de registro y seguimiento de mascotas con evidencia multimedia para garantizar la veracidad del cuidado animal",
      icon: <ShieldCheck size={80} strokeWidth={1} />
    },
    {
      title: "Fomentar el",
      subtitle: "Compromiso",
      description: "Desarrollar funcionalidades para que los donadores puedan crear \"manadas\" y recibir actualizaciones periódicas, fomentando un apoyo continuo",
      icon: <Users size={80} strokeWidth={1} />
    },
    {
      title: "Garantizar",
      subtitle: "la Integridad",
      description: "Diseñar herramientas administrativas para validar usuarios, gestionar parámetros y resolver denuncias, asegurando el correcto funcionamiento de la plataforma",
      icon: <Lock size={80} strokeWidth={1} />
    }
  ];

  return (
    <section className="bg-[#004955] py-24 px-[100px]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-white text-[40px] font-semibold tracking-[1.6px] text-center mb-16 uppercase">Objetivos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ObjectiveCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
