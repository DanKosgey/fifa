import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type TicketCategory = 'CAT 1' | 'CAT 2' | 'CAT 3' | 'CAT 4';

export interface Section {
  id: string;
  name: string;
  category: TicketCategory;
  path: string;
  price: number;
}

const SECTIONS: Section[] = [
  { id: 'N_UP', name: 'North Upper', category: 'CAT 3', price: 150, path: 'M 250 80 L 550 80 L 550 130 L 250 130 Z' },
  { id: 'N_LOW', name: 'North Lower', category: 'CAT 2', price: 250, path: 'M 250 130 L 550 130 L 550 180 L 250 180 Z' },
  { id: 'S_UP', name: 'South Upper', category: 'CAT 3', price: 150, path: 'M 250 470 L 550 470 L 550 520 L 250 520 Z' },
  { id: 'S_LOW', name: 'South Lower', category: 'CAT 2', price: 250, path: 'M 250 420 L 550 420 L 550 470 L 250 470 Z' },
  { id: 'W_UP', name: 'West Upper', category: 'CAT 2', price: 250, path: 'M 100 230 L 150 230 L 150 370 L 100 370 Z' },
  { id: 'W_LOW', name: 'West Lower', category: 'CAT 1', price: 450, path: 'M 150 230 L 200 230 L 200 370 L 150 370 Z' },
  { id: 'E_UP', name: 'East Upper', category: 'CAT 2', price: 250, path: 'M 650 230 L 700 230 L 700 370 L 650 370 Z' },
  { id: 'E_LOW', name: 'East Lower', category: 'CAT 1', price: 450, path: 'M 600 230 L 650 230 L 650 370 L 600 370 Z' },
  { id: 'NW_UP', name: 'NW Upper', category: 'CAT 4', price: 90, path: 'M 100 80 L 250 80 L 250 130 L 150 130 L 150 230 L 100 230 Z' },
  { id: 'NW_LOW', name: 'NW Lower', category: 'CAT 3', price: 150, path: 'M 150 130 L 250 130 L 250 180 L 200 180 L 200 230 L 150 230 Z' },
  { id: 'NE_UP', name: 'NE Upper', category: 'CAT 4', price: 90, path: 'M 550 80 L 700 80 L 700 230 L 650 230 L 650 130 L 550 130 Z' },
  { id: 'NE_LOW', name: 'NE Lower', category: 'CAT 3', price: 150, path: 'M 550 130 L 650 130 L 650 230 L 600 230 L 600 180 L 550 180 Z' },
  { id: 'SE_UP', name: 'SE Upper', category: 'CAT 4', price: 90, path: 'M 650 370 L 700 370 L 700 520 L 550 520 L 550 470 L 650 470 Z' },
  { id: 'SE_LOW', name: 'SE Lower', category: 'CAT 3', price: 150, path: 'M 600 370 L 650 370 L 650 470 L 550 470 L 550 420 L 600 420 Z' },
  { id: 'SW_UP', name: 'SW Upper', category: 'CAT 4', price: 90, path: 'M 100 370 L 150 370 L 150 470 L 250 470 L 250 520 L 100 520 Z' },
  { id: 'SW_LOW', name: 'SW Lower', category: 'CAT 3', price: 150, path: 'M 150 370 L 200 370 L 200 420 L 250 420 L 250 470 L 150 470 Z' },
];

const CATEGORY_COLORS: Record<TicketCategory, { fill: string; hover: string; selected: string }> = {
  'CAT 1': { fill: '#fcd34d', hover: '#fbbf24', selected: '#f59e0b' }, // Amber
  'CAT 2': { fill: '#93c5fd', hover: '#60a5fa', selected: '#3b82f6' }, // Blue
  'CAT 3': { fill: '#86efac', hover: '#4ade80', selected: '#22c55e' }, // Green
  'CAT 4': { fill: '#d8b4fe', hover: '#c084fc', selected: '#a855f7' }, // Purple
};

interface SeatMapProps {
  selectedSection: string | null;
  onSelectSection: (sectionId: string | null) => void;
}

export default function SeatMap({ selectedSection, onSelectSection }: SeatMapProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-3xl mx-auto aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-gray-200"
    >
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full drop-shadow-xl"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
      >
        {/* Pitch */}
        <g className="pitch">
          <rect x="200" y="180" width="400" height="240" fill="#166534" rx="4" />
          {/* Pitch Lines */}
          <line x1="400" y1="180" x2="400" y2="420" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <circle cx="400" cy="300" r="40" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
          <circle cx="400" cy="300" r="4" fill="rgba(255,255,255,0.4)" />
          
          {/* Left Penalty Area */}
          <rect x="200" y="240" width="60" height="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
          <rect x="200" y="270" width="20" height="60" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
          <circle cx="240" cy="300" r="3" fill="rgba(255,255,255,0.4)" />
          <path d="M 260 270 A 30 30 0 0 1 260 330" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />

          {/* Right Penalty Area */}
          <rect x="540" y="240" width="60" height="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
          <rect x="580" y="270" width="20" height="60" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
          <circle cx="560" cy="300" r="3" fill="rgba(255,255,255,0.4)" />
          <path d="M 540 270 A 30 30 0 0 0 540 330" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
        </g>

        {/* Stands */}
        <g className="stands" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round">
          {SECTIONS.map((section) => {
            const isSelected = selectedSection === section.id;
            const isHovered = hoveredSection === section.id;
            const isFaded = selectedSection && !isSelected;
            const colors = CATEGORY_COLORS[section.category];

            return (
              <motion.path
                key={section.id}
                d={section.path}
                fill={isSelected ? colors.selected : isHovered ? colors.hover : colors.fill}
                opacity={isFaded ? 0.4 : 1}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isFaded ? 0.4 : 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectSection(isSelected ? null : section.id)}
                onPointerEnter={() => setHoveredSection(section.id)}
                onPointerLeave={() => setHoveredSection(null)}
                className="cursor-pointer transition-colors duration-200"
                whileHover={{ scale: 1.01, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
              />
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-gray-100 flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-700">
        {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: colors.fill }} />
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredSection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 pointer-events-none bg-[#0a0a0a]/95 backdrop-blur-md text-white px-5 py-4 rounded-xl shadow-2xl min-w-[180px] border border-gray-800"
            style={{
              left: Math.min(mousePos.x + 15, (containerRef.current?.offsetWidth || 800) - 195),
              top: Math.min(mousePos.y + 15, (containerRef.current?.offsetHeight || 600) - 100),
            }}
          >
            {(() => {
              const section = SECTIONS.find(s => s.id === hoveredSection);
              if (!section) return null;
              return (
                <div className="flex flex-col gap-2">
                  <div className="font-black text-sm uppercase tracking-widest text-white mb-1">{section.name}</div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-gray-800 rounded border border-gray-700">{section.category}</span>
                    <span className="font-black text-[#d4af37] text-sm">${section.price}</span>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
