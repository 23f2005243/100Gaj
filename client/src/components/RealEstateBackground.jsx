import { useMemo } from 'react';

export default function RealEstateBackground({ variant = 'default' }) {
  const bubbles = useMemo(() => {
    // Deterministic bubble layout for stable rendering
    const base = [
      { x: 10, y: 18, size: 260, delay: 0.0, duration: 18 },
      { x: 22, y: 62, size: 320, delay: 2.0, duration: 22 },
      { x: 58, y: 12, size: 240, delay: 1.3, duration: 20 },
      { x: 72, y: 48, size: 360, delay: 3.2, duration: 26 },
      { x: 86, y: 70, size: 220, delay: 1.8, duration: 19 },
    ];

    // Slightly different distribution per variant
    if (variant === 'dark') {
      return base.map((b, i) => ({
        ...b,
        x: Math.max(6, Math.min(92, b.x + (i % 2 === 0 ? 4 : -6))),
      }));
    }

    if (variant === 'home') {
      return base.map((b, i) => ({
        ...b,
        x: b.x + (i === 1 ? 10 : 0),
        y: b.y + (i === 2 ? 10 : 0),
      }));
    }

    return base;
  }, [variant]);



  return (
    <div className="relative">
      {/* Ambient gradient layer */}
      <div
        aria-hidden
        className={
          variant === 'dark'
            ? 'pointer-events-none absolute inset-0 -z-10 opacity-90 bg-[radial-gradient(800px_circle_at_20%_10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(700px_circle_at_80%_30%,rgba(251,146,60,0.16),transparent_55%),radial-gradient(900px_circle_at_60%_90%,rgba(59,130,246,0.12),transparent_60%)]'
            : 'pointer-events-none absolute inset-0 -z-10 opacity-100 bg-[radial-gradient(900px_circle_at_10%_15%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(800px_circle_at_85%_30%,rgba(251,146,60,0.22),transparent_55%),radial-gradient(900px_circle_at_60%_90%,rgba(59,130,246,0.14),transparent_60%)]'
        }
      />

      {/* Real-estate “orbits”: gently moving grid lines + points */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-10 w-[900px] h-[900px] -translate-x-1/2 rounded-full border border-light-blue-500/20 animate-spin-slow" />
        <div className="absolute left-1/2 top-24 w-[640px] h-[640px] -translate-x-1/2 rounded-full border border-light-orange-500/15 animate-spin-slow-reverse" />

        {/* “Floor plan” dotted lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,146,60,0.07)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 mask-[radial-gradient(closest-side,rgba(0,0,0,0.9),transparent_70%)]" />
      </div>

      {/* Animated bubbles/cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        {bubbles.map((b, idx) => (
          <div
            key={idx}
            className={
              variant === 'dark'
                ? 'absolute rounded-full blur-3xl animate-bubble-float'
                : 'absolute rounded-full blur-3xl animate-bubble-float'
            }
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              background:
                variant === 'dark'
                  ? 'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.22), rgba(255,255,255,0.06) 55%, rgba(0,0,0,0) 75%)'
                  : `radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25), rgba(251,146,60,0.14) 55%, rgba(0,0,0,0) 75%)`,
            }}
          />
        ))}
      </div>

      {/* Optional subtle accent sweep */}
      {variant !== 'dark' && (
        <div
          aria-hidden
          className="pointer-events-none absolute -z-0 left-1/2 top-0 w-[1200px] h-[500px] -translate-x-1/2"
          style={{
            background:
              'conic-gradient(from 90deg, rgba(56,189,248,0.0), rgba(56,189,248,0.18), rgba(251,146,60,0.14), rgba(56,189,248,0.0))',
            filter: 'blur(22px)',
            opacity: 0.9,
            animation: 'sweep 12s ease-in-out infinite',
          }}
        />
      )}

      <div className="relative">{/* children render after background */}</div>
    </div>
  );
}

