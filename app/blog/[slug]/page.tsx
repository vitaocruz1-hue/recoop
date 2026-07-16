import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getNewsBySlug } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug).catch(() => null);
  if (!news) notFound();

  const date = news.publishedAt
    ? new Date(news.publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-ink">
      <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-lime transition hover:gap-3"
        >
          <ArrowLeft size={16} /> Voltar ao site
        </Link>

        <span className="mt-10 inline-block rounded-full bg-lime px-3 py-1 text-xs font-semibold text-forest">
          {news.tag}
        </span>

        <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-cream md:text-5xl">
          {news.title}
        </h1>

        {date && <p className="mt-4 text-sm text-mint/60">Publicado em {date}</p>}

        <p className="mt-8 text-lg font-medium text-mint/80">{news.excerpt}</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-mint/70">
          {news.content.split(/\n{2,}|\n/).filter(Boolean).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
