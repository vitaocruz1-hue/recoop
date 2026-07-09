"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo assinatura "nível 3":
 * partículas que se espalham e RETORNAM ao centro — metáfora do
 * crédito recuperado (recuperação = valor que volta).
 * Canvas leve, respeita prefers-reduced-motion.
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      angle: number;
      radius: number;
      base: number;
      speed: number;
      size: number;
      phase: number;
    };
    let particles: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const count = w < 640 ? 34 : 64;
      particles = Array.from({ length: count }, () => {
        const base = 90 + Math.random() * Math.min(w, h) * 0.42;
        return {
          angle: Math.random() * Math.PI * 2,
          radius: base,
          base,
          speed: 0.0016 + Math.random() * 0.0022,
          size: 0.8 + Math.random() * 2.2,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    let t = 0;
    const renderFrame = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h * 0.42;

      for (const p of particles) {
        // efeito boomerang: o raio "respira" para dentro e para fora
        const breathe = Math.sin(t * 0.006 + p.phase);
        const r = p.base * (0.55 + 0.45 * (breathe * 0.5 + 0.5));
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r * 0.62;

        // linha de retorno ao centro (fica mais forte quando volta)
        const pull = 1 - (r / p.base - 0.55) / 0.45; // 0..1
        ctx.strokeStyle = `rgba(180, 224, 74, ${0.05 + pull * 0.12})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        ctx.fillStyle = `rgba(207, 233, 216, ${0.25 + pull * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let running = false;
    let heroVisible = true;

    const loop = () => {
      t += 1;
      renderFrame();
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce || !heroVisible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    init();
    if (reduce) {
      // acessibilidade: com reduced-motion, desenha 1 frame estático
      t = 40;
      renderFrame();
    } else {
      start();
    }

    // economia de bateria: pausa quando o hero sai da tela
    const io = new IntersectionObserver((entries) => {
      heroVisible = entries[0]?.isIntersecting ?? true;
      if (heroVisible) {
        start();
      } else {
        stop();
      }
    });
    io.observe(canvas);

    // pausa quando a aba fica oculta
    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      resize();
      init();
      if (reduce) renderFrame();
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
