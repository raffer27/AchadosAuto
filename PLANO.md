# PLANO — AchadoZ / AchadosAuto

> **Para o Claude Code:** este é o arquivo de trabalho do projeto. Leia-o inteiro no começo de
> cada sessão e siga as fases em ordem. Marque `[x]` o que concluir e anote o que descobrir.
> Trabalhe uma tarefa por vez, sempre olhando o arquivo real antes de editar.

## Comando de contexto (cole no começo de cada sessão)

```
Leia o PLANO.md e o estado atual do projeto AchadosAuto (index.html, carros.json,
conteudo/fotos/). Me diga em que fase estamos, o que já está feito e qual a próxima
tarefa. Não altere nada ainda — só se contextualize e proponha o próximo passo.
```

---

## O que o projeto É (estado real — 2026-07-18)

- **Site estático de achados de carros** (veículos abaixo da tabela FIPE). NÃO é app de "achados e
  perdidos" nem Laravel — é HTML/JS puro.
- **No ar:** https://achadozmotor.github.io/ (GitHub Pages, HTTP 200). Remotes: `org` →
  `achadozmotor/achadozmotor.github.io`, `origin` → `raffer27/AchadosAuto`.
- **Arquivos:** `index.html` (arquivo único, ~2155 linhas / 243 KB), `carros.json` (151 veículos),
  fotos em `conteudo/fotos/`.
- **Já tem:** busca por texto, exibição de FIPE e % de desconto, botão WhatsApp, tags Open Graph,
  fundo 3D com three.js (CDN).
- **Ainda NÃO tem:** filtros, ordenação (ex: por maior desconto), PWA/offline, sitemap, dados
  estruturados de veículo.

### Pendências de dados encontradas (auditoria de hoje)
- **25 de 151 carros sem `fipePreco`/desconto** (só 126 preenchidos).
- **5 carros sem foto.**
- **Erro de marca:** "Volskvagen" (deveria ser "Volkswagen") — e provavelmente outros typos.
- **1 loja só** ("RH Motors") — campo `loja` fixo.
- **Campo `plataformas` vazio em todos os 151** — feature nunca usada (decidir: usar ou remover).

### 🐞 BUG grande encontrado e corrigido na Fase 1
O `carros.json` guarda a FIPE em `fipePreco` / `fipeDescontoPct` / `fipeConfianca`, mas o
`index.html` só lia `c.fipeValor` ou `c.fipe.codigo`. Resultado: **o selo "X% abaixo da Fipe"
nunca aparecia em nenhum carro** — a proposta de valor do site estava invisível. Religado:
`buscarValorFipe()` agora lê `fipePreco` primeiro. Passou a mostrar selo em **12 carros**
(o maior: Onix Turbo **32% abaixo da FIPE**). Nenhum carro acima da FIPE ganha selo (correto).

---

## Fase 1 — Qualidade dos dados ✅ (feita em 2026-07-18)
O site está no ar mostrando dados incompletos. Isso é o que o visitante vê primeiro.

- [x] Corrigir nomes de marca no `carros.json`: Volskvagen→Volkswagen, arrizo→Chery,
      Mercedes-benz→Mercedes-Benz. Varredura confirma: nenhuma marca suspeita restante.
- [x] **Religar a FIPE** — `index.html` agora lê `fipePreco` (era o bug que escondia todos os selos).
- [x] Criar validador (`validar-dados.mjs`, roda com `node validar-dados.mjs`) — aponta carros sem
      FIPE/foto e simula os selos com a mesma lógica do site.
- [x] Verificado: JS sem erro de sintaxe, `carros.json` válido, 12 selos aparecem, 0 selo indevido.
- [ ] **PENDENTE (precisa de dado real — NÃO inventar):** preencher os 25 carros sem `fipePreco`
      (ids: 5, 6, 7, 8, 13, 22, 44, 45, 50, 56, 62, 63, 64, 66, 70, 75, 113, 114, 118, 127, 135, 138,
      142, 152, 153). Site já degrada bem (sem FIPE = sem selo, não quebra).
- [ ] **PENDENTE (precisa de dado real):** fotos dos 5 carros (ids: 148, 149, 150, 151, 152).
      Site já esconde carro sem foto da órbita do hero — não quebra.
- [ ] **PENDENTE:** `cambio` vazio em 3 carros — preencher quando souber (não inventar).

## Fase 2 — Descoberta: filtros e ordenação ✅ (feita em 2026-07-18)
São 151 carros e só dá pra buscar por texto (e a busca antiga só manda pro WhatsApp, não filtra a
página). Adicionada uma barra de controles on-page acima da grade `#dealsGrid`.

- [x] Ordenação: relevância, maior desconto FIPE, menor/maior preço, mais novo (ano), menor km.
- [x] Filtros: marca (16, populadas do JSON), faixa de preço, desconto FIPE (abaixo / ≥8% / ≥15%),
      câmbio (4 valores, populados do JSON).
- [x] Contador de resultados ("X de 151 achados") + botão "Limpar filtros".
- [x] Verificado: JS sem erro, ordenação por desconto correta (Onix Turbo 32% no topo), filtro
      combinado (Toyota + R$50–100k = 9), ordenação por km OK.
- [ ] Futuro: filtro por combustível e "aceita troca" (dados existem; só faltou UI pra não lotar a barra).
- [x] Badge "X% abaixo da FIPE" — já resolvido na Fase 1 (selo FIPE religado).

## Fase 3 — Performance (casa com a dor de CPU do PC)
O fundo 3D com three.js pesa no Intel HD 4000 e no celular dos visitantes.

- [ ] Avaliar o fundo three.js: tornar opcional / mais leve / desligar em telas pequenas / respeitar
      `prefers-reduced-motion`.
- [ ] `loading="lazy"` em todas as fotos do feed (confirmar cobertura).
- [ ] `defer` nos scripts; considerar hospedar as fontes localmente (hoje vêm do Google Fonts).
- [ ] Medir antes/depois (tamanho da página, tempo até interativo).

## Fase 4 — SEO / GEO e compartilhamento
Pra aparecer no Google e nas IAs, e pro link ficar bonito no WhatsApp.

- [ ] `og:image` por carro (hoje as tags OG são genéricas) → link no WhatsApp mostra o carro.
- [ ] `meta description` decente e title por página/estado.
- [ ] Dados estruturados schema.org `Vehicle`/`Car` (ajuda Google e IAs a listar os carros).
- [ ] `sitemap.xml` + `robots.txt`.
- [ ] Rodar a skill `/seo` pra pesquisa de palavras-chave do nicho (carros usados / abaixo da FIPE).

## Fase 5 — Conteúdo e marketing (aproveitar as skills existentes)
- [ ] Rodar `/carrossel-oferta` nos 3–5 maiores descontos da semana (post + legenda prontos).
- [ ] Definir rotina semanal: escolher achados → gerar carrossel → postar (usar `/aprovar-post`).
- [ ] Landing das ofertas (`Área de trabalho/AchadoZ/achado land 1`) — decidir se entra no fluxo.

## Fase 6 — Escala (quando o resto estiver sólido)
- [ ] Suportar mais de uma loja (campo `loja` já existe; generalizar a exibição).
- [ ] Decidir sobre `plataformas` (usar pra dizer onde o anúncio está, ou remover o campo morto).
- [ ] Pensar num fluxo simples de cadastro de carro (hoje é editar JSON na mão).

---

## Regras de trabalho neste projeto
- Sempre `git commit` ao terminar uma tarefa relevante (a skill `/salvar` faz isso). Hoje só existe
  1 commit — commitar com frequência.
- Antes de editar o `carros.json`, fazer backup ou confiar no git (repo já rastreia).
- Não reintroduzir dependências pesadas sem necessidade (o PC é um i5-3570K + Intel HD 4000).
- Testar mudanças de layout no site real (`/run` ou abrir `index.html`) antes de commitar.

## Log de progresso
- 2026-07-18 — Plano criado. Auditoria inicial: 151 carros (25 sem FIPE, 5 sem foto), typo de marca,
  1 loja, `plataformas` vazio. Site confirmado no ar.
- 2026-07-18 — **Fase 1 concluída.** Corrigidos 3 typos de marca; descoberto e corrigido o bug que
  escondia TODOS os selos de desconto FIPE (campo `fipePreco` não era lido). Selo agora aparece em 12
  carros. Criado `validar-dados.mjs`.
- 2026-07-18 — **Fase 2 concluída.** Barra de filtros + ordenação na seção de ofertas (ordenar por
  desconto/preço/ano/km; filtrar por marca, preço, desconto FIPE, câmbio; contador + limpar).
  Fases 1 e 2 commitadas e publicadas no ar.
