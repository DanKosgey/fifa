import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, MapPin } from 'lucide-react';

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
  'CAT 1': { fill: '#0F172A', hover: '#1E293B', selected: '#020617' }, // Slate 900
  'CAT 2': { fill: '#334155', hover: '#475569', selected: '#1E293B' }, // Slate 700
  'CAT 3': { fill: '#64748B', hover: '#94A3B8', selected: '#475569' }, // Slate 500
  'CAT 4': { fill: '#94A3B8', hover: '#CBD5E1', selected: '#64748B' }, // Slate 400
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
      className="relative w-full max-w-3xl mx-auto aspect-[4/3] bg-white/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-900/10"
    >
      <style>{`
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.2); }
        }
        .pitch-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>

      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
      >
        {/* Pitch */}
        <g className="pitch">
          <rect x="200" y="180" width="400" height="240" fill="#064E3B" rx="8" className="pitch-glow" />
          {/* Pitch Lines */}
          <line x1="400" y1="180" x2="400" y2="420" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <circle cx="400" cy="300" r="40" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <circle cx="400" cy="300" r="4" fill="rgba(255,255,255,0.3)" />
          
          {/* Left Penalty Area */}
          <rect x="200" y="240" width="60" height="120" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <rect x="200" y="270" width="20" height="60" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <circle cx="240" cy="300" r="3" fill="rgba(255,255,255,0.3)" />
          <path d="M 260 270 A 30 30 0 0 1 260 330" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />

          {/* Right Penalty Area */}
          <rect x="540" y="240" width="60" height="120" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <rect x="580" y="270" width="20" height="60" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <circle cx="560" cy="300" r="3" fill="rgba(255,255,255,0.3)" />
          <path d="M 540 270 A 30 30 0 0 0 540 330" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
        </g>

        {/* Stands */}
        <g className="stands" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinejoin="round">
          {SECTIONS.map((section) => {
            const isSelected = selectedSection === section.id;
            const isHovered = hoveredSection === section.id;
            const isFaded = selectedSection && !isSelected;
            const colors = CATEGORY_COLORS[section.category];

            return (
              <motion.path
                key={section.id}
                d={section.path}
                fill={isSelected ? '#10B981' : isHovered ? '#059669' : colors.fill}
                opacity={isFaded ? 0.2 : 1}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isFaded ? 0.2 : 1,
                  fill: isSelected ? '#10B981' : isHovered ? '#34D399' : colors.fill
                }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectSection(isSelected ? null : section.id)}
                onPointerEnter={() => setHoveredSection(section.id)}
                onPointerLeave={() => setHoveredSection(null)}
                className="cursor-pointer transition-colors duration-200"
                whileHover={{ scale: 1.01, filter: 'brightness(1.2)' }}
              />
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-900/10 flex flex-wrap justify-center gap-6">
        {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
          <div key={cat} className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-slate-900/20" style={{ backgroundColor: colors.fill }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{cat}</span>
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
            className="absolute z-50 pointer-events-none bg-white/95 backdrop-blur-md text-slate-900 px-6 py-5 rounded-2xl shadow-2xl min-w-[220px] border border-slate-800"
            style={{
              left: mousePos.x + 220 > (containerRef.current?.offsetWidth || 800) 
                ? mousePos.x - 240 
                : mousePos.x + 20,
              top: mousePos.y + 140 > (containerRef.current?.offsetHeight || 600)
                ? mousePos.y - 150
                : mousePos.y + 20,
            }}
          >
            {(() => {
              const section = SECTIONS.find(s => s.id === hoveredSection);
              if (!section) return null;
              const colors = CATEGORY_COLORS[section.category];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-black text-xs uppercase tracking-widest text-slate-900">{section.name}</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ backgroundColor: colors.fill }} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Category</span>
                      <span className="text-slate-900 text-[11px] font-black uppercase tracking-widest">{section.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">From</span>
                      <span className="font-black text-slate-900 text-xl leading-none font-mono-data tracking-tighter">${section.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100/50 px-3 py-2 rounded-lg border border-slate-700/50">
                    <Info className="w-3 h-3 text-slate-500" />
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Click to filter listings</span>
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
