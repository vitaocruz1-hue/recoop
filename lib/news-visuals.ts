import { Sprout, Users, Leaf, Newspaper, type LucideIcon } from "lucide-react";

interface NewsVisual {
  icon: LucideIcon;
  tint: string;
}

const BY_TAG: Record<string, NewsVisual> = {
  "crédito rural": { icon: Sprout, tint: "bg-gradient-to-br from-moss/50 to-forest/80" },
  cooperativismo: { icon: Users, tint: "bg-gradient-to-br from-emerald/70 to-forest/80" },
  esg: { icon: Leaf, tint: "bg-gradient-to-br from-moss/60 to-emerald/70" },
};

const FALLBACKS: NewsVisual[] = [
  { icon: Sprout, tint: "bg-gradient-to-br from-moss/50 to-forest/80" },
  { icon: Users, tint: "bg-gradient-to-br from-emerald/70 to-forest/80" },
  { icon: Leaf, tint: "bg-gradient-to-br from-moss/60 to-emerald/70" },
  { icon: Newspaper, tint: "bg-gradient-to-br from-forest/70 to-emerald/80" },
];

/** Escolhe ícone/cor pela tag; se a tag for nova, cai num fallback estável (mesma tag = mesma cor sempre). */
export function getNewsVisual(tag: string): NewsVisual {
  const key = tag.trim().toLowerCase();
  if (BY_TAG[key]) return BY_TAG[key];

  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return FALLBACKS[hash % FALLBACKS.length];
}
