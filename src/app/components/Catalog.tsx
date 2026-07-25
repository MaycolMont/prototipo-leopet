import React, { useState, useMemo } from 'react';
import { motion } from "motion/react";
import { Search, ChevronLeft, ChevronRight, CheckCircle2, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useManada } from '../context/ManadaContext';
import { MOCK_PETS } from '../lib/mockData';
import { rankPets, isHighPriority, type ScoredPet } from '../lib/recommendation';

const PAGE_SIZE = 6;

type SortMode = "recomendado" | "recientes" | "nombre";

function PetCard({ pet, onApadrinar }: { pet: ScoredPet; onApadrinar: (pet: ScoredPet) => void }) {
  const urgent = isHighPriority(pet.score);

  return (
    <div className={`bg-white rounded-[24px] overflow-hidden flex flex-col h-full group transition-shadow hover:shadow-lg border ${
      urgent ? "border-[#004955]/30" : "border-[#b1d0d5]"
    }`}>
      <Link to={`/mascota/${pet.id}`} className="relative h-[240px] overflow-hidden block">
        <ImageWithFallback src={pet.imagen} alt={pet.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-white/90 px-4 py-1 rounded-full text-[#66949b] text-sm font-medium">
            {pet.edad} {pet.edad === 1 ? "año" : "años"}
          </span>
        </div>
        {urgent && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#004955]" />
        )}
      </Link>
      <div className="p-8 flex flex-col gap-3 flex-grow">
        <div>
          <h3 className="text-[#004955] text-[28px] font-bold leading-tight">{pet.nombre}</h3>
          <p className="text-[#66949b] text-[18px] font-light">{pet.raza}</p>
        </div>
        <p className="text-[#3e494a] text-sm leading-relaxed line-clamp-2">{pet.descripcion}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-gray-500 text-sm">{pet.fundacionNombre}</span>
          {urgent && (
            <span className="text-[#004955] text-xs font-semibold">Necesita apoyo</span>
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onApadrinar(pet); }}
          className="w-full bg-[#00626d] text-[#07c4e1] py-3 rounded-full text-[16px] font-medium tracking-wide hover:bg-[#004955] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart size={18} />
          Apadrinar
        </button>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="px-2 text-gray-400 text-sm">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              p === page
                ? "bg-[#004955] text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export function Catalog() {
  const navigate = useNavigate();
  const { addToManada, pets: manadaPets } = useManada();
  const [filter, setFilter] = useState<"todos" | "Perro" | "Gato">("todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("recomendado");
  const [page, setPage] = useState(1);
  const [addedId, setAddedId] = useState<number | null>(null);

  const ranked = useMemo(() => rankPets(MOCK_PETS), []);

  const filtered = useMemo(() => {
    let result = ranked;
    if (filter !== "todos") result = result.filter((p) => p.especie === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          (p.raza && p.raza.toLowerCase().includes(q)) ||
          (p.fundacionNombre && p.fundacionNombre.toLowerCase().includes(q))
      );
    }
    return result;
  }, [ranked, filter, search]);

  const sorted = useMemo(() => {
    if (sort === "recomendado") return filtered;
    const copy = [...filtered];
    if (sort === "nombre") copy.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (sort === "recientes") copy.sort((a, b) => (b.fechaRegistro || "").localeCompare(a.fechaRegistro || ""));
    return copy;
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  const handleApadrinar = (pet: ScoredPet) => {
    if (manadaPets.some((mp) => mp.petId === String(pet.id))) {
      navigate("/mi-manada/configurar");
      return;
    }
    addToManada({
      id: `manada-${pet.id}`,
      petId: String(pet.id),
      name: pet.nombre,
      rescueName: pet.fundacionNombre || "",
      tag: pet.status === "NO_APADRINADO" ? "SALUDABLE" : "ATENCIÓN",
      monthlyAmount: 25.00,
      image: pet.imagen,
    });
    setAddedId(pet.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const urgentCount = ranked.filter((p) => isHighPriority(p.score)).length;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="py-10 px-4 md:px-12 lg:px-[96px] bg-gray-50 border-b border-[#b1d0d5]/40">
        <div className="max-w-[1248px] mx-auto flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
            <div className="flex gap-2">
              {(["todos", "Perro", "Gato"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); resetPage(); }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-[#004955] text-white"
                      : "text-[#004955] hover:bg-gray-200"
                  }`}
                >
                  {f === "todos" ? "Todos" : f === "Perro" ? "Perros" : "Gatos"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortMode); resetPage(); }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#004955] bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-[#07c4e1]/50 cursor-pointer"
              >
                <option value="recomendado">Recomendados</option>
                <option value="recientes">Más recientes</option>
                <option value="nombre">Nombre A-Z</option>
              </select>

              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                  placeholder="Buscar..."
                  className="w-52 pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-[#333] placeholder:text-gray-400 outline-none focus:border-[#07c4e1]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            {sorted.length} mascotas disponibles
            {urgentCount > 0 && <> · <span className="text-[#004955] font-medium">{urgentCount} necesitan apoyo urgente</span></>}
          </p>
        </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-4 md:px-[96px] mt-10">
        {addedId && (
          <div className="mb-6 bg-[#47f6a1]/15 border border-[#0d9955]/20 rounded-xl p-4 flex items-center gap-2 text-[#0d9955] font-medium text-sm">
            <CheckCircle2 size={18} />
            Mascota agregada a tu Manada
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.map((pet, i) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <PetCard pet={pet} onApadrinar={handleApadrinar} />
            </motion.div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontraron mascotas con esos filtros.</p>
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
