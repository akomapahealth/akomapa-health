"use client";

import { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Brand palette: Akomapa cyan, gold, skobeloff, and their light tints. */
const CONFETTI_COLORS = [
  "#0097b2",
  "#eeba2b",
  "#0F4C5C",
  "#66C4DC",
  "#F5C94D",
] as const;

const PARTICLES_PER_CANNON = 22;
const MAX_DELAY_S = 0.12;
const MAX_DURATION_S = 1.75;
/** Time after which every particle has landed and faded out. */
export const CONFETTI_BURST_MS = Math.ceil((MAX_DELAY_S + MAX_DURATION_S) * 1000);

type ParticleShape = "chip" | "ribbon" | "dot";

type Particle = {
  id: number;
  shape: ParticleShape;
  color: string;
  width: number;
  height: number;
  originX: number;
  dx: number;
  peak: number;
  fall: number;
  rotate: number;
  flips: number;
  duration: number;
  delay: number;
};

/** Small seeded PRNG so a burst is deterministic for a given id (pure render). */
function createRandom(seed: number) {
  let state = seed >>> 0 || 1;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildParticles(seed: number): Particle[] {
  const random = createRandom(seed * 7919 + 17);
  const between = (min: number, max: number) => min + random() * (max - min);
  const particles: Particle[] = [];

  // Two cannons low on either side of the media fire up and inward, so the
  // burst frames the slide image instead of erupting over the copy.
  for (const side of [-1, 1] as const) {
    for (let i = 0; i < PARTICLES_PER_CANNON; i += 1) {
      const roll = random();
      const shape: ParticleShape =
        roll < 0.55 ? "chip" : roll < 0.88 ? "ribbon" : "dot";
      const size =
        shape === "chip"
          ? { width: between(6, 9), height: between(9, 13) }
          : shape === "ribbon"
            ? { width: between(2.5, 3.5), height: between(14, 22) }
            : { width: between(5, 7), height: 0 };

      particles.push({
        id: particles.length,
        shape,
        color: CONFETTI_COLORS[Math.floor(random() * CONFETTI_COLORS.length)],
        width: size.width,
        height: shape === "dot" ? size.width : size.height,
        originX: side < 0 ? between(4, 10) : between(90, 96),
        dx: -side * between(40, 300),
        peak: -between(80, 170),
        fall: between(140, 280),
        rotate: side * between(180, 720),
        flips: Math.round(between(1, 3)),
        duration: between(1.2, MAX_DURATION_S),
        delay: random() * MAX_DELAY_S,
      });
    }
  }

  return particles;
}

/** Fixed, motionless confetti used when the visitor prefers reduced motion. */
const STATIC_PIECES: ReadonlyArray<{
  left: string;
  top: string;
  rotate: number;
  shape: ParticleShape;
  color: string;
}> = [
  { left: "6%", top: "10px", rotate: -18, shape: "chip", color: "#eeba2b" },
  { left: "12%", top: "26px", rotate: 34, shape: "ribbon", color: "#0097b2" },
  { left: "19%", top: "8px", rotate: 12, shape: "dot", color: "#0F4C5C" },
  { left: "27%", top: "20px", rotate: -40, shape: "ribbon", color: "#F5C94D" },
  { left: "36%", top: "6px", rotate: 22, shape: "chip", color: "#66C4DC" },
  { left: "45%", top: "18px", rotate: -8, shape: "dot", color: "#eeba2b" },
  { left: "55%", top: "8px", rotate: 48, shape: "ribbon", color: "#0F4C5C" },
  { left: "63%", top: "24px", rotate: -26, shape: "chip", color: "#0097b2" },
  { left: "71%", top: "10px", rotate: 16, shape: "dot", color: "#F5C94D" },
  { left: "79%", top: "22px", rotate: -52, shape: "ribbon", color: "#eeba2b" },
  { left: "86%", top: "6px", rotate: 30, shape: "chip", color: "#66C4DC" },
];

function pieceStyle(shape: ParticleShape, width: number, height: number) {
  return {
    width,
    height,
    borderRadius: shape === "dot" ? "9999px" : shape === "ribbon" ? "1px" : "2px",
  };
}

type AnnouncementConfettiProps = {
  /** A new value starts a new burst. */
  burstId: number;
  /** Called once the animated burst has finished (not called for reduced motion). */
  onComplete?: () => void;
};

/**
 * Decorative, non-interactive celebration overlay for milestone announcements.
 * Renders inside a positioned container; never captures pointer events or focus.
 */
export default function AnnouncementConfetti({
  burstId,
  onComplete,
}: AnnouncementConfettiProps) {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(() => buildParticles(burstId), [burstId]);

  useEffect(() => {
    if (prefersReducedMotion || !onComplete) return;
    const timer = window.setTimeout(onComplete, CONFETTI_BURST_MS);
    return () => window.clearTimeout(timer);
  }, [burstId, prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        data-testid="announcement-confetti"
        data-variant="static"
        data-burst={burstId}
        className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-12 overflow-hidden"
      >
        {STATIC_PIECES.map((piece, index) => {
          const size =
            piece.shape === "ribbon"
              ? { width: 3, height: 16 }
              : piece.shape === "dot"
                ? { width: 6, height: 6 }
                : { width: 7, height: 10 };
          return (
            <span
              key={index}
              className="absolute opacity-90"
              style={{
                left: piece.left,
                top: piece.top,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotate}deg)`,
                ...pieceStyle(piece.shape, size.width, size.height),
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      data-testid="announcement-confetti"
      data-variant="burst"
      data-burst={burstId}
      className="pointer-events-none absolute inset-0 z-[15] overflow-hidden"
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute top-[62%] will-change-transform"
          style={{
            left: `${particle.originX}%`,
            backgroundColor: particle.color,
            ...pieceStyle(particle.shape, particle.width, particle.height),
          }}
          initial={{ x: 0, y: 0, rotate: 0, scaleX: 1, opacity: 0 }}
          animate={{
            x: [0, particle.dx * 0.7, particle.dx],
            y: [0, particle.peak, particle.fall],
            rotate: [0, particle.rotate * 0.4, particle.rotate],
            scaleX: Array.from({ length: particle.flips * 2 + 1 }, (_, i) =>
              i % 2 === 0 ? 1 : -1,
            ),
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            x: { duration: particle.duration, delay: particle.delay, times: [0, 0.3, 1], ease: ["easeOut", "linear"] },
            y: { duration: particle.duration, delay: particle.delay, times: [0, 0.3, 1], ease: ["easeOut", "easeIn"] },
            opacity: { duration: particle.duration, delay: particle.delay, times: [0, 0.04, 0.75, 1] },
          }}
        />
      ))}
    </div>
  );
}
