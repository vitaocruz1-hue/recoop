"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Mail, ArrowDown } from "lucide-react";
import AmbientBackground from "./AmbientBackground";
import CountUp from "./CountUp";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // parallax: camadas se movem em velocidades diferentes ao rolar
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-36 md:pt-40"
    >
      {/* camada 1: gradiente que muda de cor sozinho */}
      <div className="animated-mesh absolute inset-0 -z-10" />
      {/* camada 2: escurecimento para leitura */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      {/* camada 3: partículas que retornam ao centro (assinatura) */}
      <AmbientBackground />
      {/* orbe de brilho */}
      <div className="glow-orb pointer-events-none absolute -right-32 top-24 -z-10 h-[460px] w-[460px] rounded-full bg-moss/40 blur-[150px]" />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 pb-24 md:grid-cols-[1.25fr_1fr] md:items-center"
      >
        <motion.div style={{ y: yText }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-lime"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Recuperação de créditos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-cream md:text-7xl"
          >
            Recupere <br />o que é{" "}
            <span className="relative inline-block text-lime">
              seu
              <motion.span
                className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-lime/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.6 }}
              />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-md text-lg text-mint/80"
          >
            Solução ágil e eficiente em recuperação de crédito. Temos o time e
            as ferramentas certas para trazer de volta os créditos da sua
            empresa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="https://wa.me/08009412551"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-semibold text-forest transition hover:brightness-110"
            >
              <MessageCircle size={18} />
              WhatsApp
              <ArrowDown className="rotate-[-90deg] transition-transform group-hover:translate-x-1" size={16} />
            </a>
            <a
              href="mailto:contato@recoop.com.br"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-cream transition hover:border-lime hover:text-lime"
            >
              <Mail size={18} /> E-mail
            </a>
          </motion.div>
        </motion.div>

        {/* card flutuante com boomerang (vai-e-vem) */}
        <motion.div style={{ y: yCard }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/10 bg-emerald/50 p-8 backdrop-blur-md"
          >
            {/* selo flutuante boomerang */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="absolute -right-4 -top-4 rounded-2xl bg-lime px-4 py-2 text-xs font-bold text-forest shadow-lg"
            >
              +30 mi recuperados
            </motion.div>

            <p className="text-xs uppercase tracking-[0.2em] text-mint/50">
              Resultado acumulado
            </p>
            <p className="mt-2 font-display text-6xl font-extrabold text-lime">
              <CountUp to={30} prefix="R$ " suffix="mi" />
            </p>
            <p className="mt-1 text-mint/70">recuperados para clientes</p>

            <div className="mt-6 h-px bg-white/10" />

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-display text-2xl font-bold text-cream">
                  <CountUp to={60} />
                </p>
                <p className="text-mint/60">posições de atendimento</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-cream">
                  <CountUp to={10} suffix="mil" />
                </p>
                <p className="text-mint/60">ligações por dia</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
