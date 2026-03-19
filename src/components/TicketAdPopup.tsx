import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TicketAdPopup = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const trailsRef = useRef<{ x: number; y: number }[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [ballKey, setBallKey] = useState(0);
  const [ringsKey, setRingsKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const DURATION = 3200;

  const waypoints = [
    { lp: 0,    x: -0.15, y: 0.75 },
    { lp: 0.15, x: 0.10,  y: 0.20 },
    { lp: 0.30, x: 0.65,  y: 0.80 },
    { lp: 0.45, x: 0.85,  y: 0.15 },
    { lp: 0.60, x: 0.30,  y: 0.65 },
    { lp: 0.75, x: 0.75,  y: 0.40 },
    { lp: 1.00, x: 0.50,  y: 0.35 },
  ];

  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
  function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function getPos(progress: number, W: number, H: number) {
    let seg = waypoints.length - 2;
    for (let i = 1; i < waypoints.length; i++) {
      if (progress <= waypoints[i].lp) { seg = i - 1; break; }
    }
    const a = waypoints[seg];
    const b = waypoints[seg + 1] || waypoints[seg];
    const range = b.lp - a.lp;
    const local = range > 0 ? (progress - a.lp) / range : 0;
    const e = easeInOut(Math.max(0, Math.min(1, local)));
    return {
      x: lerp(a.x * W, b.x * W, e),
      y: lerp(a.y * H, b.y * H, e),
    };
  }

  function drawTrails(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const trails = trailsRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i < trails.length; i++) {
      const a = trails[i - 1], b = trails[i];
      const t = i / trails.length;
      const alpha = t * 0.75;
      const r = 255;
      const g = Math.round(lerp(50, 180, t));
      const b_val = Math.round(lerp(0, 50, t));
      
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(${r},${g},${b_val},${alpha})`;
      ctx.lineWidth = lerp(1, 8, t);
      ctx.lineCap = 'round';
      ctx.stroke();

      if (t > 0.7) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, lerp(1, 5, t), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,100,${alpha * 0.6})`;
        ctx.fill();
      }
    }
  }

  function startAnimation() {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    canvas.width = stage.offsetWidth;
    canvas.height = stage.offsetHeight;
    trailsRef.current = [];
    startTimeRef.current = null;
    setShowPopup(false);
    setBallKey(k => k + 1);
    setRingsKey(k => k + 1);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    function animate(ts: number) {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const W = canvas!.width, H = canvas!.height;
      const pos = getPos(progress, W, H);
      trailsRef.current.push({ x: pos.x, y: pos.y });
      if (trailsRef.current.length > 80) trailsRef.current.shift();
      drawTrails(canvas!);
      
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          const ctx = canvas!.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        }, 400);
        setTimeout(() => setShowPopup(true), 350);
        
        // Auto-loop: restart after 7 seconds of showing the popup
        setTimeout(() => {
          if (!location.pathname.startsWith('/match/') && !isDismissed) {
            startAnimation();
          }
        }, 8500);
      }
    }
    animFrameRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    const timer = setTimeout(startAnimation, 100);
    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (location.pathname.startsWith('/match/') || isDismissed) {
    return null;
  }

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5,
    left: Math.random() * 100,
    bottom: Math.random() * 20,
    dur: 4 + Math.random() * 6,
    del: Math.random() * 8,
    color: ['#ff4d00','#ff8c00','#ffb700','#ff2a00','#ffd000'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed bottom-6 right-6 z-50 w-60 pointer-events-none">
      <style>{`
        .wc-stage {
          position: relative;
          width: 100%;
          height: 260px;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #1a0008 0%, #080003 100%);
          font-family: var(--font-barlow);
          pointer-events: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,80,0,0.1);
          border: 1px solid rgba(255,100,0,0.25);
        }
        .wc-bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 70%, rgba(255,60,0,0.22) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(255,140,0,0.15) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 100%, rgba(200,0,50,0.2) 0%, transparent 60%);
        }
        .wc-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,100,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,100,0,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
        }
        .wc-corner-tag {
          position: absolute;
          top: 12px;
          left: 14px;
          font-family: var(--font-barlow-cond);
          font-size: 8px;
          font-weight: 800;
          color: rgba(255,120,0,0.35);
          text-transform: uppercase;
          letter-spacing: 2px;
          pointer-events: none;
        }
        .wc-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: wcFloatUp var(--dur) var(--del) ease-in infinite;
        }
        @keyframes wcFloatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-240px) scale(0); opacity: 0; }
        }
        .wc-ball-wrap {
          position: absolute;
          width: 44px;
          height: 44px;
          animation: wcJourney 3.2s cubic-bezier(0.25,0.1,0.25,1) forwards;
          filter: drop-shadow(0 0 12px rgba(255,100,0,0.8));
        }
        .wc-ball-svg {
          width: 44px;
          height: 44px;
          animation: wcSpin 0.5s linear infinite;
        }
        @keyframes wcJourney {
          0%   { left: -60px;              top: 75%;  }
          15%  { left: 10%;                top: 20%;  }
          30%  { left: 65%;                top: 80%;  }
          45%  { left: 85%;                top: 15%;  }
          60%  { left: 30%;                top: 65%;  }
          75%  { left: 75%;                top: 40%;  }
          85%  { left: calc(50% - 22px);   top: calc(50% - 90px); }
          93%  { left: calc(50% - 22px);   top: calc(50% - 90px); transform: scale(1.4); opacity: 0.6; }
          100% { left: calc(50% - 22px);   top: calc(50% - 90px); transform: scale(0); opacity: 0; }
        }
        @keyframes wcSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .wc-ring {
          position: absolute;
          left: 50%;
          top: calc(50% - 90px);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          border: 2px solid;
          pointer-events: none;
        }
        .wc-ring-1 { width: 50px; height: 50px; border-color: rgba(255,160,0,0.9); animation: wcRingOut 0.7s ease-out 2.8s forwards; }
        .wc-ring-2 { width: 50px; height: 50px; border-color: rgba(255,80,0,0.7);  animation: wcRingOut 0.7s ease-out 2.95s forwards; }
        .wc-ring-3 { width: 50px; height: 50px; border-color: rgba(255,200,0,0.5); animation: wcRingOut 0.7s ease-out 3.1s forwards; }
        @keyframes wcRingOut {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4); opacity: 0; }
        }

        .wc-burst {
          position: absolute;
          left: 50%;
          top: calc(50% - 90px);
          transform: translate(-50%,-50%) scale(0);
          opacity: 0;
          pointer-events: none;
          animation: wcBurst 0.5s ease-out 2.9s forwards;
        }
        @keyframes wcBurst {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0); }
          60%  { opacity: 1; transform: translate(-50%,-50%) scale(1.4); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(2.5); }
        }

        .wc-popup-wrap {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%) translateY(0) scale(1);
          width: 210px;
          animation: wcPopIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes wcPopIn {
          0%   { opacity: 0; transform: translateX(-50%) translateY(80px) scale(0.85); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        .wc-card {
          background: linear-gradient(135deg, #1f0a00 0%, #3a1400 50%, #1f001a 100%);
          border: 1px solid rgba(255,130,0,0.4);
          border-radius: 16px;
          padding: 16px 14px 14px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }
        .wc-card::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 15%;
          right: 15%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff8c00, #ffcc00, #ff8c00, transparent);
          border-radius: 2px;
        }
        .wc-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top, rgba(255,120,0,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .wc-close {
          position: absolute;
          top: 6px;
          right: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          color: rgba(255,255,255,0.5);
          font-size: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .wc-close:hover { background: rgba(255,80,0,0.4); color: #fff; border-color: rgba(255,80,0,0.6); }

        .wc-badge {
          display: inline-block;
          background: linear-gradient(90deg, #ff5500, #ffb300);
          color: #fff;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 20px;
          margin-bottom: 6px;
          font-family: var(--font-barlow-cond);
          box-shadow: 0 3px 8px rgba(255,80,0,0.3);
        }
        .wc-title {
          font-family: var(--font-barlow-cond);
          font-size: 16px;
          font-weight: 900;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
          line-height: 1.1;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .wc-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 14px;
          line-height: 1.4;
        }
        .wc-btn-wrap { display: flex; gap: 6px; }
        .wc-btn-primary {
          flex: 1.2;
          background: linear-gradient(135deg, #ff5500, #ff9d00);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          cursor: pointer;
          font-family: var(--font-barlow-cond);
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          box-shadow: 0 3px 12px rgba(255,80,0,0.25);
        }
        .wc-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%);
        }
        .wc-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(255,80,0,0.45); }
        .wc-btn-primary:active { transform: scale(0.96); }
        .wc-btn-secondary {
          flex: 0.8;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          border-radius: 8px;
          padding: 8px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .wc-btn-secondary:hover { background: rgba(255,100,0,0.2); border-color: rgba(255,100,0,0.5); color: #fff; }
      `}</style>

      <div className="wc-stage" ref={stageRef}>
        <div className="wc-bg-glow" />
        <div className="wc-grid" />
        <div className="wc-corner-tag">FIFA World Cup 2026™</div>

        {/* Ambient particles */}
        {particles.map(p => (
          <div key={p.id} className="wc-particle" style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            // @ts-ignore
            '--dur': `${p.dur}s`,
            // @ts-ignore
            '--del': `${p.del}s`,
          }} />
        ))}

        {/* Fire trail canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

        {/* Explosion rings */}
        <div key={`rings-${ringsKey}`}>
          <div className="wc-ring wc-ring-1" />
          <div className="wc-ring wc-ring-2" />
          <div className="wc-ring wc-ring-3" />
        </div>

        {/* Starburst */}
        <div key={`burst-${ringsKey}`} className="wc-burst">
          <svg width="80" height="80" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(55,55)">
              {[0,30,60,90,120,150].map((angle, i) => (
                <g key={i} transform={`rotate(${angle})`}>
                  <line x1="0" y1="-48" x2="0" y2="-28" stroke={i % 2 === 0 ? '#ffb300' : '#ff6600'} strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="0" y1="28" x2="0" y2="48" stroke={i % 2 === 0 ? '#ffcc00' : '#ff4500'} strokeWidth="2.5" strokeLinecap="round"/>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Spinning Ball - Realistic Soccer Ball */}
        <div key={`ball-${ballKey}`} className="wc-ball-wrap">
          <svg className="wc-ball-svg" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="wc-ball-shine" cx="35%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="wc-ball-base" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="85%" stopColor="#e0e0e0"/>
                <stop offset="100%" stopColor="#b0b0b0"/>
              </radialGradient>
              <filter id="wc-ball-depth">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
                <feOffset in="blur" dx="1" dy="1" result="offsetBlur"/>
                <feComposite in="SourceGraphic" in2="offsetBlur" operator="over"/>
              </filter>
            </defs>
            
            {/* Base Sphere */}
            <circle cx="32" cy="32" r="30" fill="url(#wc-ball-base)" stroke="#999" strokeWidth="0.5"/>
            
            {/* Soccer Ball Panels (Hexagons/Pentagons) */}
            <g fill="#1a1a1a" opacity="0.95">
              {/* Center Pentagon */}
              <path d="M32 18 L42 25 L38 37 L26 37 L22 25 Z" />
              
              {/* Surrounding Hexagons (simplified paths for realistic feel) */}
              <path d="M32 18 L22 25 L10 20 L12 8 L24 5 Z" />
              <path d="M42 25 L32 18 L40 5 L52 8 L54 20 Z" />
              <path d="M42 25 L54 20 L60 32 L54 44 L42 39 Z" />
              <path d="M38 37 L42 39 L54 44 L48 56 L36 59 Z" />
              <path d="M26 37 L38 37 L36 59 L24 59 L22 39 Z" />
              <path d="M22 25 L26 37 L22 39 L10 44 L4 32 L10 20 Z" />
            </g>
            
            {/* Stitching / Lines */}
            <g fill="none" stroke="#333" strokeWidth="0.8" opacity="0.4">
              <circle cx="32" cy="32" r="30" />
              <path d="M32 18 L42 25 M42 25 L38 37 M38 37 L26 37 M26 37 L22 25 M22 25 L32 18" />
              <path d="M10 20 L22 25 M54 20 L42 25 M60 32 L54 44 M48 56 L38 37 M24 59 L26 37 M4 32 L10 44" />
            </g>
            
            {/* Lighting & Shine */}
            <circle cx="32" cy="32" r="30" fill="url(#wc-ball-shine)" />
            <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            
            {/* Subtle Texture/Grain */}
            <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" strokeDasharray="1 2" />
          </svg>
        </div>

        {/* Ticket Popup */}
        {showPopup && (
          <div className="wc-popup-wrap">
            <div className="wc-card">
              <div className="wc-card-glow" />
              <button className="wc-close" onClick={() => setIsDismissed(true)}>✕</button>
              <div className="wc-badge">🔥 Limited Availability</div>
              <div className="wc-title">Premium Tickets ✦</div>
              <div className="wc-sub">
                Buy or sell — explore the interactive 3D seat map for the best views at FIFA World Cup 2026™
              </div>
              <div className="wc-btn-wrap">
                <button className="wc-btn-primary" onClick={() => navigate('/tickets')}>
                  Buy Ticket →
                </button>
                <button className="wc-btn-secondary" onClick={() => navigate('/match/1')}>3D Map</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketAdPopup;
