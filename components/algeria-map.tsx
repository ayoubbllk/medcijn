"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WilayaPath {
  id: string;
  name: string;
  d: string;
}

interface Pin {
  id: string;
  x: number;
  y: number;
}

/** Noms français corrects des 58 wilayas, indexés par code DZxx du SVG. */
const WILAYA_NAMES: Record<string, string> = {
  DZ01: "Adrar",
  DZ02: "Chlef",
  DZ03: "Laghouat",
  DZ04: "Oum El Bouaghi",
  DZ05: "Batna",
  DZ06: "Béjaïa",
  DZ07: "Biskra",
  DZ08: "Béchar",
  DZ09: "Blida",
  DZ10: "Bouira",
  DZ11: "Tamanrasset",
  DZ12: "Tébessa",
  DZ13: "Tlemcen",
  DZ14: "Tiaret",
  DZ15: "Tizi Ouzou",
  DZ16: "Alger",
  DZ17: "Djelfa",
  DZ18: "Jijel",
  DZ19: "Sétif",
  DZ20: "Saïda",
  DZ21: "Skikda",
  DZ22: "Sidi Bel Abbès",
  DZ23: "Annaba",
  DZ24: "Guelma",
  DZ25: "Constantine",
  DZ26: "Médéa",
  DZ27: "Mostaganem",
  DZ28: "M'Sila",
  DZ29: "Mascara",
  DZ30: "Ouargla",
  DZ31: "Oran",
  DZ32: "El Bayadh",
  DZ33: "Illizi",
  DZ34: "Bordj Bou Arreridj",
  DZ35: "Boumerdès",
  DZ36: "El Tarf",
  DZ37: "Tindouf",
  DZ38: "Tissemsilt",
  DZ39: "El Oued",
  DZ40: "Khenchela",
  DZ41: "Souk Ahras",
  DZ42: "Tipaza",
  DZ43: "Mila",
  DZ44: "Aïn Defla",
  DZ45: "Naâma",
  DZ46: "Aïn Témouchent",
  DZ47: "Ghardaïa",
  DZ48: "Relizane",
  DZ49: "El M'Ghair",
  DZ50: "El Menia",
  DZ51: "Ouled Djellal",
  DZ52: "Bordj Badji Mokhtar",
  DZ53: "Béni Abbès",
  DZ54: "Timimoun",
  DZ55: "Touggourt",
  DZ56: "Djanet",
  DZ57: "In Salah",
  DZ58: "In Guezzam",
};

/** Wilayas mises en avant par un point lumineux sur la carte. */
const PIN_IDS = [
  "DZ16", // Alger
  "DZ31", // Oran
  "DZ25", // Constantine
  "DZ23", // Annaba
  "DZ19", // Sétif
  "DZ13", // Tlemcen
  "DZ07", // Biskra
  "DZ47", // Ghardaïa
  "DZ30", // Ouargla
  "DZ08", // Béchar
  "DZ01", // Adrar
  "DZ11", // Tamanrasset
  "DZ33", // Illizi
];

function wilayaNumber(id: string) {
  return id.replace("DZ", "");
}

export function AlgeriaMap() {
  const [paths, setPaths] = useState<WilayaPath[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>("DZ16");
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    fetch("/algeria.svg")
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        const parsed = Array.from(doc.querySelectorAll("path[id]")).map((el) => ({
          id: el.getAttribute("id") || "",
          name: el.getAttribute("name") || "",
          d: el.getAttribute("d") || "",
        }));
        setPaths(parsed);
      })
      .catch(() => {
        /* la carte reste simplement vide si le fichier est introuvable */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Position des points lumineux : centre du rectangle englobant de chaque wilaya.
  useEffect(() => {
    if (paths.length === 0) return;
    const computed: Pin[] = [];
    for (const id of PIN_IDS) {
      const el = pathRefs.current.get(id);
      if (!el) continue;
      const box = el.getBBox();
      computed.push({ id, x: box.x + box.width / 2, y: box.y + box.height / 2 });
    }
    setPins(computed);
  }, [paths]);

  const handleMove = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const activeId = hoveredId ?? selectedId;
  const activeName = activeId
    ? WILAYA_NAMES[activeId] || paths.find((p) => p.id === activeId)?.name
    : null;

  return (
    <div className="relative" ref={containerRef} onMouseMove={handleMove}>
      <svg
        viewBox="0 0 1000 1000"
        className="h-auto w-full"
        role="group"
        aria-label="Carte interactive des 58 wilayas d'Algérie"
      >
        {paths.map((path) => {
          const isHovered = hoveredId === path.id;
          const isSelected = selectedId === path.id;
          return (
            <path
              key={path.id}
              ref={(el) => {
                if (el) pathRefs.current.set(path.id, el);
              }}
              d={path.d}
              fill={isHovered ? "#0F777E" : isSelected ? "#115F65" : "#16B0B7"}
              stroke="#FFFFFF"
              strokeWidth={1.2}
              strokeLinejoin="round"
              className="cursor-pointer transition-[fill] duration-200 focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label={`Wilaya ${wilayaNumber(path.id)} — ${WILAYA_NAMES[path.id] || path.name}`}
              aria-pressed={isSelected}
              onMouseEnter={() => setHoveredId(path.id)}
              onMouseLeave={() => {
                setHoveredId(null);
                setTooltip(null);
              }}
              onFocus={() => setHoveredId(path.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setSelectedId(path.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedId(path.id);
                }
              }}
            />
          );
        })}

        {pins.map((pin, index) => (
          <g key={pin.id} pointerEvents="none">
            {!reducedMotion && (
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r={10}
                fill="#FFFFFF"
                initial={{ opacity: 0.5, scale: 0.6 }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [0.6, 2, 0.6] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
              />
            )}
            <circle cx={pin.x} cy={pin.y} r={6} fill="#FFFFFF" />
            <circle cx={pin.x} cy={pin.y} r={2.6} fill="#0D949C" />
          </g>
        ))}
      </svg>

      {/* Info-bulle qui suit le curseur */}
      {hoveredId && tooltip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-xl bg-medical-900 px-3.5 py-2 text-sm font-medium text-white shadow-soft-lg"
          style={{ left: tooltip.x, top: tooltip.y - 12 }}
        >
          <span className="mr-1.5 font-heading font-bold text-medical-300">
            {wilayaNumber(hoveredId)}
          </span>
          {WILAYA_NAMES[hoveredId] || paths.find((p) => p.id === hoveredId)?.name}
        </div>
      )}

      {/* Wilaya sélectionnée */}
      {activeName && (
        <div
          className="absolute bottom-2 left-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft-lg md:bottom-6 md:left-0"
          aria-live="polite"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-medical-50 text-medical-600">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Wilaya {activeId ? wilayaNumber(activeId) : ""}</p>
            <p className="font-heading text-sm font-semibold text-foreground">{activeName}</p>
          </div>
        </div>
      )}

      {paths.length === 0 && (
        <div className="flex aspect-square w-full items-center justify-center rounded-3xl bg-medical-50 text-sm text-muted-foreground">
          Chargement de la carte…
        </div>
      )}
    </div>
  );
}
