"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Revela um texto palavra por palavra no scroll (efeito manifesto). */
export function WordReveal({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className?: string;
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,]/g, "");
        const isHi = highlight.includes(clean);
        return (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            style={{ marginRight: "0.28em" }}
            initial={{ opacity: 0.12, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{
              duration: 0.4,
              delay: i * 0.035,
              ease: "easeOut",
            }}
          >
            <span className={isHi ? "text-lime" : undefined}>{word}</span>
          </motion.span>
        );
      })}
    </p>
  );
}
