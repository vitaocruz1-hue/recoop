"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { VIEWBOX, STATES, CENTROIDS, ACTIVE, HUB } from "@/data/brazil-map";

type Tip = { name: string; active: boolean; x: number; y: number } | null;

/**
 * Mapa interativo do Brasil.
 * Pontos de luz pulsam nos estados de atuação e arcos fluem em direção
 * à sede (Curitiba/PR) — o crédito voltando para casa.
 * Animações pausam fora da tela (useInView) para economizar bateria.
 */
export default function BrazilMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-40px" });
  const [tip, setTip] = useState<Tip>(null);
  const activeSet = new Set(ACTIVE);

  const handleMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    const uf = target.getAttribute ? target.getAttribute("data-uf") : null;
    if (!uf || !wrapRef.current) return;
    const st = STATES.find((s) => s.id === uf);
    if (!st) return;
    const r = wrapRef.current.getBoundingClientRect();
    setTip({
      name: st.name,
      active: activeSet.has(uf),
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    });
  };

  const arcs = ACTIVE.filter((u) => u !== "pr").map((u) => {
    const c = CENTROIDS[u];
    const mx = (c.x + HUB.x) / 2;
    const my =
      Math.min(c.y, HUB.y) - Math.hypot(HUB.x - c.x, HUB.y - c.y) * 0.18;
    return {
      u,
      d: `M${c.x} ${c.y} Q${mx.toFixed(0)} ${my.toFixed(0)} ${HUB.x} ${HUB.y}`,
    };
  });

  return (
    <div
      ref={wrapRef}
      className={`brmap relative w-full ${inView ? "play" : ""}`}
    >
      <svg
        viewBox={VIEWBOX}
        role="img"
        aria-label="Mapa do Brasil com os estados de atuação da Recoop"
        className="block h-auto w-full overflow-visible"
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => setTip(null)}
      >
        {STATES.map((s) => (
          <path
            key={s.id}
            d={s.d}
            data-uf={s.id}
            className={`st${activeSet.has(s.id) ? " on" : ""}`}
          />
        ))}
        {arcs.map((a) => (
          <path key={a.u} d={a.d} className="flow" />
        ))}
        {ACTIVE.map((u, i) => {
          const c = CENTROIDS[u];
          return (
            <g key={u}>
              <circle
                cx={c.x}
                cy={c.y}
                r={5}
                className="ping"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <circle cx={c.x} cy={c.y} r={3.4} className="dot" />
            </g>
          );
        })}
        <circle cx={HUB.x} cy={HUB.y} r={5} className="hubring" />
        <circle cx={HUB.x} cy={HUB.y} r={3.2} className="hubdot" />
      </svg>
      {tip && (
        <div className="maptip" style={{ left: tip.x, top: tip.y }}>
          <b>{tip.name}</b> · {tip.active ? "atuação ativa" : "em expansão"}
        </div>
      )}
    </div>
  );
}
