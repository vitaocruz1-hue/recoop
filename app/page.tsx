import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import CountUp from "@/components/CountUp";
import BrazilMap from "@/components/BrazilMap";
import { ACTIVE } from "@/data/brazil-map";
import { Reveal, WordReveal } from "@/components/Reveal";
import {
  Banknote,
  Headset,
  PhoneCall,
  MessageCircle,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  MapPin,
  Clock,
  ArrowRight,
  Sprout,
  Users,
  Leaf,
  Gavel,
  Building2,
  Handshake,
} from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* ===== MANIFESTO ===== */}
      <section id="sobre" className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <Reveal>
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            Quem somos
          </p>
        </Reveal>
        <WordReveal
          className="font-display text-3xl font-semibold leading-[1.3] text-cream md:text-[2.6rem] md:leading-[1.35]"
          text="A Recoop é especialista em recuperação de crédito. Aplicamos as estratégias mais modernas para que sua empresa recupere os créditos em atraso — preservando sua imagem e as boas relações com o mercado."
          highlight={["recuperação", "crédito", "modernas", "imagem"]}
        />
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="mx-auto max-w-6xl px-6 pb-28 md:pb-36">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            Nossos serviços
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-cream md:text-5xl">
            Somos a solução para o seu negócio
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-mint/70">
            Assumimos o compromisso de buscar, junto a terceiros, os créditos
            que a sua empresa tem a receber — tirando esse desgaste da sua
            equipe e preservando sua imagem com o mercado, seus clientes e
            investidores. Cada caso recebe uma estratégia própria, com
            medidas graduais, sempre pautadas pela ética e respaldadas pela
            legislação, com foco na recuperação rápida e efetiva.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Headset,
              title: "Cobrança administrativa",
              text: "Além de contar com as ferramentas mais avançadas do mercado para localizar devedores, higienizar cadastros e fazer a escoragem de risco, mantemos um sistema de cobrança totalmente integrado ao setor jurídico. Isso inclui central 0800, URA, gravação de todas as ligações, relatórios detalhados de desempenho e acionamentos, além da emissão e do envio automatizado de boletos via robô.",
            },
            {
              icon: Gavel,
              title: "Cobrança jurídica",
              text: "Antes mesmo de judicializar, o trabalho de pesquisa avançada de bens é o que sustenta os melhores resultados do escritório — muitas vezes ele já é suficiente para convencer o devedor a fechar acordo.",
              bullets: [
                "Pesquisa avançada de bens, que vai além do óbvio e acelera o processo",
                "Medidas coercitivas atípicas, aplicadas caso a caso, com resultados consistentes",
                "Acompanhamento pessoal de diligências, garantindo o cumprimento efetivo de mandados de busca e apreensão, reintegração, imissão de posse, penhora e remoção",
              ],
            },
            {
              icon: Building2,
              title: "Consolidação fiduciária de imóvel",
              text: "Temos ampla experiência na retomada de bens alienados fiduciariamente, com todo o amparo jurídico e administrativo necessário para evitar os vícios que costumam suspender ou até anular o processo. A Lei 9.514/97, que rege a alienação fiduciária de bem imóvel, exige atenção a detalhes que, sem experiência, frustram credores e geram prejuízos ainda maiores — por isso cuidamos de cada etapa com rigor técnico, buscando um processo rápido e efetivo.",
            },
            {
              icon: Handshake,
              title: "Relacionamento e negociação",
              text: "Mais do que recuperar o crédito e trazer retorno financeiro, investimos em relacionamento. Em vez de uma cobrança genérica, buscamos uma negociação célere e eficaz, moldada à realidade de cada cliente e de cada negócio — o que nos permite encontrar sempre a melhor solução para as duas partes.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-emerald/30 p-8 backdrop-blur-sm transition duration-500 hover:-translate-y-1.5 hover:border-lime/40">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-moss/0 to-moss/0 opacity-0 transition-opacity duration-500 group-hover:from-moss/20 group-hover:opacity-100" />
                <div className="mb-6 inline-flex rounded-2xl bg-forest p-3.5 text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-forest">
                  <c.icon size={26} />
                </div>
                <h3 className="font-display text-xl font-bold text-cream">
                  {c.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-mint/70">{c.text}</p>
                {c.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-base leading-relaxed text-mint/70">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PROCESSO ===== */}
      <Process />

      {/* ===== NÚMEROS ===== */}
      <section id="numeros" className="relative overflow-hidden py-28 md:py-32">
        <div className="animated-mesh absolute inset-0 -z-10 opacity-40" />
        <div className="absolute inset-0 -z-10 bg-ink/80" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">
              Números que <span className="text-lime">se destacam</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
            {[
              {
                icon: Banknote,
                value: <CountUp to={30} prefix="R$ " suffix=" milhões" />,
                label: "recuperados para clientes",
              },
              {
                icon: Headset,
                value: <CountUp to={60} suffix=" posições" />,
                label: "de atendimento ativas",
              },
              {
                icon: PhoneCall,
                value: <CountUp to={10} suffix=".000 ligações" />,
                label: "realizadas por dia",
              },
            ].map((n, i) => (
              <Reveal key={i} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col gap-4 bg-emerald/60 p-10 backdrop-blur-sm">
                  <n.icon className="text-lime" size={30} />
                  <p className="font-display text-3xl font-bold text-cream md:text-4xl">
                    {n.value}
                  </p>
                  <p className="text-mint/60">{n.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 grid items-center gap-10 rounded-3xl border border-white/10 bg-emerald/30 p-8 backdrop-blur-sm md:grid-cols-[1fr_1.15fr]">
              <div className="flex flex-col items-start gap-3">
                <p className="font-display text-2xl font-bold text-cream">
                  Players de mercado
                </p>
                <p className="text-mint/60">
                  Soluções personalizadas para os principais players do Brasil.
                </p>
                <p className="mt-2 font-display text-cream">
                  <span className="text-3xl font-extrabold text-lime">
                    {ACTIVE.length}
                  </span>{" "}
                  estados com atuação ativa
                </p>
                <p className="flex flex-wrap items-center gap-2 text-xs text-mint/60">
                  <i className="inline-block h-2 w-2 rounded-full bg-lime shadow-[0_0_8px_var(--lime)]" />{" "}
                  atuação <span className="mx-1">·</span>
                  <i className="inline-block h-2 w-2 rounded-full bg-cream shadow-[0_0_8px_rgba(242,247,242,0.8)]" />{" "}
                  sede — Curitiba/PR
                </p>
                <a
                  href="#contato"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-semibold text-forest transition hover:brightness-110"
                >
                  Fale com a gente <ArrowRight size={18} />
                </a>
              </div>
              <BrazilMap />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section id="blog" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            Blog
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-cream md:text-5xl">
            Conteúdo sobre crédito
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              tag: "Crédito rural",
              icon: Sprout,
              tint: "bg-gradient-to-br from-moss/50 to-forest/80",
              title:
                "Sicoob espera liberar até R$ 49 bi de crédito rural na safra 2023/24",
              text: "Expectativa de forte crescimento na oferta de crédito rural em diversas linhas.",
              href: "https://recoop.com.br/sicoob-espera-liberar-ate-r-49-bi-de-credito-rural-na-safra-2023-24/",
            },
            {
              tag: "Cooperativismo",
              icon: Users,
              tint: "bg-gradient-to-br from-emerald/70 to-forest/80",
              title:
                "Cooperativas de crédito operam em mais da metade dos municípios",
              text: "O cooperativismo de crédito cresceu acima do restante do Sistema Financeiro Nacional.",
              href: "https://recoop.com.br/cooperativas-de-credito-operam-em-mais-da-metade-dos-municipios-2/",
            },
            {
              tag: "ESG",
              icon: Leaf,
              tint: "bg-gradient-to-br from-moss/60 to-emerald/70",
              title: "A due diligence ESG",
              text: "Integridade empresarial e agenda ESG ganharam protagonismo nos negócios.",
              href: "https://recoop.com.br/a-due-diligence-esg/",
            },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <a
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-emerald/30 backdrop-blur-sm transition duration-500 hover:-translate-y-1.5 hover:border-lime/40"
              >
                <div className={`relative flex h-40 items-end overflow-hidden p-6 ${p.tint}`}>
                  <div className="animated-mesh absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110" />
                  <p.icon
                    className="pointer-events-none absolute -right-4 -top-4 text-lime/15 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                    size={112}
                    strokeWidth={1.25}
                  />
                  <span className="relative rounded-full bg-lime px-3 py-1 text-xs font-semibold text-forest">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-cream transition group-hover:text-lime">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-mint/70">{p.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-lime">
                    Ler artigo{" "}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CTA + FOOTER ===== */}
      <footer id="contato" className="relative overflow-hidden border-t border-white/10 bg-forest">
        <div className="glow-orb pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-moss/40 blur-[150px]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-16 md:flex-row md:items-center">
              <h2 className="max-w-xl font-display text-3xl font-bold leading-tight text-cream md:text-5xl">
                Revolucione seus resultados com a{" "}
                <span className="text-lime">Recoop</span>.
              </h2>
              <a
                href="https://wa.me/08009412551"
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 font-semibold text-forest transition hover:brightness-110"
              >
                <MessageCircle size={18} /> Comece a recuperar
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <div className="grid gap-10 pt-16 text-sm text-mint/70 md:grid-cols-4">
            <div>
              <p className="font-display text-2xl font-extrabold text-cream">
                recoop<span className="text-lime">.</span>
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  ["Início", "#inicio"],
                  ["Sobre", "#sobre"],
                  ["Serviços", "#servicos"],
                  ["Processo", "#processo"],
                  ["Números", "#numeros"],
                  ["Blog", "#blog"],
                ].map(([l, href]) => (
                  <li key={href}>
                    <a href={href} className="transition hover:text-lime">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-5 font-semibold uppercase tracking-widest text-cream">
                Contato
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="tel:5541996349273" className="flex items-center gap-2 transition hover:text-lime">
                    <Phone size={15} /> 41 99634-9273
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/08009412551" className="flex items-center gap-2 transition hover:text-lime">
                    <MessageCircle size={15} /> 0800 941 2551
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/recooprecuperacao" className="flex items-center gap-2 transition hover:text-lime">
                    <Instagram size={15} /> @recooprecuperacao
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/recooprecuperacao" className="flex items-center gap-2 transition hover:text-lime">
                    <Linkedin size={15} /> /recooprecuperacao
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-5 font-semibold uppercase tracking-widest text-cream">
                Endereço
              </p>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-lime" />
                  <span>
                    <strong className="text-cream">Curitiba/PR</strong> — Rua
                    Augusto Severo, 1030 – Alto da Glória, CEP 80030-240
                  </span>
                </li>
                <li className="flex gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-lime" />
                  <span>
                    <strong className="text-cream">Goiânia/GO</strong> — Av.
                    Deputado Jamel Cecílio, 3527, salas 401–403 – Jardim Goiás,
                    CEP 74085-580
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-5 font-semibold uppercase tracking-widest text-cream">
                Atendimento
              </p>
              <p className="flex items-center gap-2">
                <Clock size={15} className="text-lime" /> Segunda a sexta, das
                08h às 18h
              </p>
              <a
                href="mailto:contato@recoop.com.br"
                className="mt-4 flex items-center gap-2 transition hover:text-lime"
              >
                <Mail size={15} /> contato@recoop.com.br
              </a>
            </div>
          </div>

          <p className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-mint/40">
            Copyright © Recoop. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
