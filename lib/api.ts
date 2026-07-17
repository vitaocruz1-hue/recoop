// Cliente da API do backend Nest (recoop-backend).
// Em produção, defina NEXT_PUBLIC_API_URL apontando pro backend publicado.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3333/api";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ===== Público (blog do site) =====

export async function getPublishedNews(): Promise<NewsItem[]> {
  const res = await fetch(`${API_URL}/news`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Falha ao buscar notícias publicadas");
  return res.json();
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const res = await fetch(`${API_URL}/news/${slug}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Falha ao buscar a notícia");
  return res.json();
}

// ===== Admin (área /admin, exige token) =====

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

async function adminFetch(path: string, token: string, init: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.message || `Erro na requisição (${res.status})`, res.status);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.message || "E-mail ou senha inválidos.", res.status);
  }
  return res.json() as Promise<{ accessToken: string; user: { id: string; name: string; email: string } }>;
}

export async function checkSession(token: string) {
  return adminFetch("/auth/me", token);
}

export async function adminListNews(token: string): Promise<NewsItem[]> {
  return adminFetch("/admin/news", token);
}

export async function adminCreateNews(
  token: string,
  data: { title: string; tag: string; excerpt: string; content: string; coverImage?: string },
): Promise<NewsItem> {
  return adminFetch("/admin/news", token, { method: "POST", body: JSON.stringify(data) });
}

export async function adminUpdateNews(
  token: string,
  id: string,
  data: Partial<{ title: string; tag: string; excerpt: string; content: string; coverImage: string }>,
): Promise<NewsItem> {
  return adminFetch(`/admin/news/${id}`, token, { method: "PATCH", body: JSON.stringify(data) });
}

export async function adminPublishNews(token: string, id: string): Promise<NewsItem> {
  return adminFetch(`/admin/news/${id}/publish`, token, { method: "POST" });
}

export async function adminUnpublishNews(token: string, id: string): Promise<NewsItem> {
  return adminFetch(`/admin/news/${id}/unpublish`, token, { method: "POST" });
}

export async function adminDeleteNews(token: string, id: string): Promise<void> {
  await adminFetch(`/admin/news/${id}`, token, { method: "DELETE" });
}
