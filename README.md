# Recoop — Landing Page Nível 3

Next.js 15 + TypeScript + Tailwind + Framer Motion.
Site dark, animado e interativo: gradiente que muda de cor, partículas
de "crédito que retorna" (efeito assinatura), reveal palavra-a-palavra,
contadores que sobem no scroll, parallax, boomerang e barra de progresso.

## Rodar
```bash
npm install
npm run dev
```
Abra http://localhost:3000

## Ajustar cores
Tudo centralizado em `app/globals.css` (variáveis `--ink`, `--forest`,
`--emerald`, `--moss`, `--lime`, `--mint`, `--cream`). Troque os hex e o
site inteiro acompanha.

## Estrutura
- `app/page.tsx` — seções (manifesto, serviços, processo, números, blog, footer)
- `components/Hero.tsx` — hero com parallax + contador
- `components/AmbientBackground.tsx` — partículas de recuperação (canvas)
- `components/Process.tsx` — timeline com linha ligada ao scroll
- `components/CountUp.tsx` — contadores animados
- `components/Reveal.tsx` — reveal + reveal palavra-a-palavra
- `components/Navbar.tsx` — nav com progresso de leitura

## Observações
- Animações respeitam `prefers-reduced-motion`.
- Contatos/endereços são os mesmos do site original; confirme telefones/e-mail
  reais antes de publicar.

## Deploy (quando aprovar)
1. Crie um repositório no GitHub e suba a pasta.
2. Em vercel.com → "Add New Project" → importe o repo.
3. A Vercel detecta Next.js sozinha; só clicar em Deploy.
