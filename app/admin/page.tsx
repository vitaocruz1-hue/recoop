"use client";

import { useCallback, useEffect, useState } from "react";
import {
  login,
  checkSession,
  adminListNews,
  adminCreateNews,
  adminUpdateNews,
  adminPublishNews,
  adminUnpublishNews,
  adminDeleteNews,
  type NewsItem,
} from "@/lib/api";

const TOKEN_KEY = "recoop_admin_token";

const emptyForm = { title: "", tag: "", excerpt: "", content: "" };

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // painel
  const [news, setNews] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // ===== sessão =====
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setChecking(false);
      return;
    }
    checkSession(saved)
      .then(() => setToken(saved))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecking(false));
  }, []);

  const loadNews = useCallback(async (tk: string) => {
    try {
      setNews(await adminListNews(tk));
    } catch {
      setError("Não foi possível carregar as notícias. O backend está rodando?");
    }
  }, []);

  useEffect(() => {
    if (token) loadNews(token);
  }, [token, loadNews]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const result = await login(email, password);
      localStorage.setItem(TOKEN_KEY, result.accessToken);
      setToken(result.accessToken);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Falha no login.");
    } finally {
      setLoggingIn(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setNews([]);
  }

  // ===== CRUD =====
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setBusy(true);
    setError("");
    setFeedback("");
    try {
      if (editingId) {
        await adminUpdateNews(token, editingId, form);
        setFeedback("Notícia atualizada.");
      } else {
        await adminCreateNews(token, form);
        setFeedback("Notícia criada como rascunho. Clique em Publicar para ela aparecer no site.");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadNews(token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setBusy(false);
    }
  }

  function startEdit(item: NewsItem) {
    setEditingId(item.id);
    setForm({ title: item.title, tag: item.tag, excerpt: item.excerpt, content: item.content });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function togglePublish(item: NewsItem) {
    if (!token) return;
    setBusy(true);
    setError("");
    try {
      if (item.published) {
        await adminUnpublishNews(token, item.id);
        setFeedback("Notícia despublicada (voltou a rascunho).");
      } else {
        await adminPublishNews(token, item.id);
        setFeedback("Notícia publicada! Já aparece no site.");
      }
      await loadNews(token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao alterar publicação.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item: NewsItem) {
    if (!token) return;
    if (!confirm(`Excluir de vez a notícia "${item.title}"?`)) return;
    setBusy(true);
    setError("");
    try {
      await adminDeleteNews(token, item.id);
      setFeedback("Notícia excluída.");
      await loadNews(token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao excluir.");
    } finally {
      setBusy(false);
    }
  }

  // ===== estilos base =====
  const input =
    "w-full rounded-xl border border-white/10 bg-forest/60 px-4 py-3 text-cream placeholder:text-mint/40 outline-none transition focus:border-lime/60";
  const btn =
    "rounded-xl bg-lime px-5 py-3 text-sm font-bold text-forest transition hover:brightness-110 disabled:opacity-50";
  const btnGhost =
    "rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-mint/80 transition hover:border-lime/50 hover:text-lime";

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink text-mint/60">
        Carregando…
      </main>
    );
  }

  // ===== tela de login =====
  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-emerald/30 p-8 backdrop-blur-sm"
        >
          <p className="font-display text-2xl font-extrabold tracking-tight text-cream">
            recoop<span className="text-lime">.</span>
          </p>
          <h1 className="mt-2 text-sm text-mint/70">
            Área restrita — entre para gerenciar o blog
          </h1>

          <div className="mt-8 space-y-4">
            <input
              className={input}
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={input}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginError && <p className="mt-4 text-sm text-red-400">{loginError}</p>}

          <button className={`${btn} mt-6 w-full`} disabled={loggingIn}>
            {loggingIn ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  // ===== painel =====
  return (
    <main className="min-h-screen bg-ink px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between">
          <p className="font-display text-2xl font-extrabold tracking-tight text-cream">
            recoop<span className="text-lime">.</span>{" "}
            <span className="text-base font-semibold text-mint/60">/ admin</span>
          </p>
          <button onClick={handleLogout} className={btnGhost}>
            Sair
          </button>
        </header>

        {/* formulário criar/editar */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-white/10 bg-emerald/30 p-8 backdrop-blur-sm"
        >
          <h2 className="font-display text-xl font-bold text-cream">
            {editingId ? "Editar notícia" : "Nova notícia"}
          </h2>

          <div className="mt-6 space-y-4">
            <input
              className={input}
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              minLength={5}
            />
            <input
              className={input}
              placeholder="Categoria (ex.: Crédito rural, Cooperativismo, ESG)"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              required
            />
            <textarea
              className={`${input} min-h-20 resize-y`}
              placeholder="Resumo curto (aparece no card do blog, máx. 280 caracteres)"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
              maxLength={280}
            />
            <textarea
              className={`${input} min-h-48 resize-y`}
              placeholder="Conteúdo completo da notícia (separe parágrafos com linha em branco)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className={btn} disabled={busy}>
              {editingId ? "Salvar alterações" : "Criar rascunho"}
            </button>
            {editingId && (
              <button
                type="button"
                className={btnGhost}
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancelar edição
              </button>
            )}
          </div>

          {feedback && <p className="mt-4 text-sm text-lime">{feedback}</p>}
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </form>

        {/* listagem */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-cream">
            Notícias ({news.length})
          </h2>

          <div className="mt-6 space-y-4">
            {news.length === 0 && (
              <p className="text-sm text-mint/50">
                Nenhuma notícia ainda. Crie a primeira no formulário acima.
              </p>
            )}
            {news.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-emerald/20 p-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        item.published
                          ? "bg-lime text-forest"
                          : "bg-white/10 text-mint/60"
                      }`}
                    >
                      {item.published ? "Publicada" : "Rascunho"}
                    </span>
                    <span className="text-xs text-mint/50">{item.tag}</span>
                  </div>
                  <p className="mt-2 truncate font-semibold text-cream">{item.title}</p>
                  <p className="mt-1 truncate text-sm text-mint/60">{item.excerpt}</p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <button className={btnGhost} onClick={() => startEdit(item)} disabled={busy}>
                    Editar
                  </button>
                  <button className={btnGhost} onClick={() => togglePublish(item)} disabled={busy}>
                    {item.published ? "Despublicar" : "Publicar"}
                  </button>
                  <button
                    className="rounded-xl border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-400/60"
                    onClick={() => handleDelete(item)}
                    disabled={busy}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
