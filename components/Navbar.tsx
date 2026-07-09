"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Phone, MessageCircle, Instagram, Menu, X } from "lucide-react";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Números", href: "#numeros" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Topbar */}
      <div className="hidden bg-ink/95 text-[11px] text-mint/70 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-6 px-6 py-2">
          <a href="tel:5541996349273" className="flex items-center gap-1.5 transition hover:text-lime">
            <Phone size={12} /> 41 99634-9273
          </a>
          <a href="https://wa.me/08009412551" className="flex items-center gap-1.5 transition hover:text-lime">
            <MessageCircle size={12} /> 0800 941 2551
          </a>
          <a href="https://instagram.com/recooprecuperacao" className="flex items-center gap-1.5 transition hover:text-lime">
            <Instagram size={12} /> @recooprecuperacao
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav
        className={`border-b transition-colors duration-500 ${
          scrolled
            ? "border-white/10 bg-ink/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="font-display text-3xl font-extrabold tracking-tight text-cream">
            recoop<span className="text-lime">.</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm text-mint/80 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-lime">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contato"
            className="hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-forest transition hover:brightness-110 md:block"
          >
            Comece a recuperar
          </a>

          <button
            className="text-cream md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <ul className="space-y-1 border-t border-white/10 bg-ink/95 px-6 py-4 text-mint/90 backdrop-blur-xl md:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block py-2" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-lime px-5 py-2.5 text-center font-semibold text-forest"
              >
                Comece a recuperar
              </a>
            </li>
          </ul>
        )}
      </nav>

      {/* Barra de progresso de leitura */}
      <motion.div
        className="h-0.5 origin-left bg-lime"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
