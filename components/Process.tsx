"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Handshake, Wallet } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Análise e diagnóstico",
    text: "Mapeamos os créditos em atraso da sua empresa e definimos a estratégia mais eficiente para cada caso.",
  },
  {
    icon: Handshake,
    title: "Negociação especializada",
    text: "Nossa equipe entra em contato preservando a sua imagem e as boas relações com o mercado e seus clientes.",
  },
  {
    icon: Wallet,
    title: "Recuperação do crédito",
    text: "Acompanhamento até o valor voltar para o seu caixa, com transparência e relatórios em cada etapa.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="processo" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-sm font-semibold uppercase tracking-[0.2em] text-moss"
      >
        Como funciona
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-cream md:text-5xl"
      >
        Três passos até o crédito <span className="text-lime">de volta</span>
      </motion.h2>

      <div ref={ref} className="relative mt-16 pl-8 md:pl-0">
        {/* trilho vertical (mobile) / à esquerda dos cards */}
        <div className="absolute left-[11px] top-2 h-full w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <motion.div className="w-full bg-lime" style={{ height }} />
        </div>

        <div className="space-y-12 md:space-y-0">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`relative md:grid md:grid-cols-2 md:gap-16 ${
                i > 0 ? "md:mt-[-40px]" : ""
              }`}
            >
              {/* ponto no trilho */}
              <span className="absolute -left-8 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-lime bg-ink text-[10px] font-bold text-lime md:left-1/2 md:-translate-x-1/2">
                {i + 1}
              </span>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`rounded-3xl border border-white/10 bg-emerald/40 p-8 backdrop-blur-sm ${
                  i % 2 === 0
                    ? "md:col-start-1"
                    : "md:col-start-2 md:row-start-1"
                }`}
              >
                <div className="mb-5 inline-flex rounded-2xl bg-forest p-3.5 text-lime">
                  <s.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-cream">
                  {s.title}
                </h3>
                <p className="mt-3 text-mint/70">{s.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
