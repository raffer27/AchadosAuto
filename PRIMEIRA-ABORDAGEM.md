# PRIMEIRA ABORDAGEM — AchadoZ / RH Motors

Como transformar o primeiro cliente pagante. Data: 20/07/2026.
Números do `achadozauto.db` real (161 carros, coleta de 20/07).

> **Por que a RH Motors e por que agora:** o AchadoZ já raspa o catálogo deles
> de 8 em 8 horas e já compara com a FIPE. São lead quente e não sabem.

## 0. Duas coisas que quase foram ditas erradas (ler antes de tudo)

A primeira versão deste documento tinha dois erros graves. Ficam registrados
porque o mesmo engano é fácil de repetir:

**1. "77% do estoque está acima da FIPE" não é um achado.** É o normal do setor.
A FIPE é média de mercado e inclui venda entre particulares; loja soma margem,
garantia, revisão e custo de pátio. A mediana de ágio da RH Motors é **6,1%**
(Q1 0,5% · Q3 11,5%) — precificação de manual. Levar isso como crítica é
anunciar que não se entende o negócio do cliente.

**2. A Saveiro `id 158` provavelmente NÃO está com preço errado.** Nossa
correspondência FIPE é que falhou. Um Saveiro CD Robust 2024 com FIPE de
R$ 76.175 não existe — comparáveis 2024 no próprio banco dão R$ 117-163 mil.
O campo `fipeConfianca` marcava **"alta"** nessa linha, então **a métrica de
confiança não é confiável**. O `CLAUDE.md` do scraper registrava a conclusão
oposta (culpando o preço da loja); foi corrigido.

**Nunca abrir uma conversa comercial apontando erro de preço sem conferir a
FIPE na fonte.** Lojista sabe FIPE de cabeça — errar isso queima o lead na
primeira frase.

## 1. A dor que se vende

Loja de carro não tem dor de "aparecer no Google". Tem dor de **capital parado**.
Carro encalhado custa duas vezes: o valor imobilizado e a desvalorização
mensal. E a loja normalmente descobre quais encalharam depois de 90 dias.

## 2. A alavanca: os 4 outliers

Aplicando cerca de Tukey (Q3 + 1,5×IQR = **28%** de ágio) sobre os 136 veículos
com FIPE:

| Veículo | Preço | Ágio |
|---|---|---|
| Chevrolet Onix 1.0 (2022/23, 58 mil km) | R$ 91.999 | +37,2% |
| Chevrolet Prisma 1.4 LTZ (2015, 136 mil km) | R$ 69.890 | +36,6% |
| Mitsubishi L200 Triton HPE-S (2022, 157 mil km) | R$ 200.990 | +35,1% |
| Fiat Mobi 1.0 Like (2024, 17 mil km) | R$ 71.990 | +28,1% |

*(a Saveiro sai da lista até a FIPE ser conferida na fonte)*

**O enquadramento correto:** "131 dos seus 136 carros estão precificados dentro
do padrão de mercado. Esses 4 estão bem fora da curva — vale um olhar."

Isso elogia 96% do estoque e sinaliza 4. É consultoria, não crítica.

Os dois com km alto (Prisma 136 mil, L200 157 mil) são os mais defensáveis como
alerta: quilometragem alta com ágio alto é a combinação clássica de encalhe.

## 2.5 A estrutura em duas etapas (porteiro → decisor)

Na RH Motors o caminho passa por um **amigo vendedor**, que precisa abrir a porta
do dono. São **duas conversas diferentes**, e usar o mesmo discurso nas duas é o
jeito mais rápido de perder as duas.

### Por que os interesses não são os mesmos

| | O dono quer | O vendedor quer |
|---|---|---|
| Dor | capital parado, giro do estoque, margem | comissão, e cliente que chega já decidido |
| Mede sucesso por | carro que sai do pátio | venda que **ele** fechou |
| Medo | gastar com coisa que não dá retorno | trabalho a mais, e passar vergonha com o chefe |

**Consequência prática:** a análise dos 4 outliers de preço **não pode aparecer
na conversa com o vendedor**. Preço não é decisão dele, e levar isso pra ele
soa como "vim dizer que vocês precificam errado" — dito pela boca do amigo que
o apresentou. Ele vira porteiro fechado, não campeão.

Essa análise é munição da **Etapa 2**, com o dono.

### Etapa 1 — a conversa com o amigo (objetivo: acesso + informação)

**Não é pitch.** São dois objetivos, nessa ordem:

**a) Informação que você não tem e ele tem de graça:**
- Quem decide de fato? O dono assina sozinho ou tem sócio/gerente?
- Como chega cliente hoje? (OLX, Instagram, indicação, passagem na rua)
- Já tentaram vender alguma coisa parecida pra ele? Deu o quê?
- O que o dono anda reclamando ultimamente?
- Qual carro está encalhado há mais tempo? — **essa é a melhor pergunta.** Se a
  resposta bater com algum dos 4 outliers, sua Etapa 2 fica imbatível: você
  previu, pelo dado, o que ele já sente na pele.

**b) O que o vendedor ganha** — tem que ser dito, não subentendido:

> "O site manda gente que já pesquisou FIPE e já sabe qual carro quer. É
> comprador mais adiantado que o da OLX. E eu consigo mandar o contato direto
> pra você, não pro balcão geral."

Lead qualificado indo direto pra ele é comissão. Isso é motivo real pra ele
querer que dê certo — e não custa nada pra você prometer, porque é verdade.

**c) O pedido, pequeno e fácil de recusar:**

> "Você me apresenta? Não precisa vender nada pra ele, só falar que sou de
> confiança e que vale 15 minutos. O resto eu faço."

Pedir apresentação é barato. Pedir que ele venda por você é caro e ele não
sabe fazer — vai fazer mal e a culpa parece sua.

### O custo de misturar amizade com negócio (não pular)

Você vai gastar capital social de um amigo. Isso é real e tem duas regras:

1. **Deixa fácil ele dizer não.** Frase literal: *"se for te dar dor de cabeça
   com o teu chefe, me fala que eu procuro outro caminho, sem problema nenhum."*
   Amigo que se sente encurralado ajuda mal e depois some.
2. **Se a venda acontecer, ele soube antes.** Nada pior que o vendedor descobrir
   pelo chefe que o amigo dele fechou algo. Combina de avisar ele primeiro.

### Etapa 2 — a conversa com o dono

Aí sim entra tudo que está nos itens 2, 4 e 5 deste documento: os outliers, o
relatório de graça, os R$ 300.

Abre reconhecendo o vendedor: *"o [nome] falou que valia a pena te mostrar"* —
transfere um pouco da confiança dele pra você e paga o favor publicamente.

## 2.6 O molde pras próximas lojas

Isso se repete. Duas situações:

**Com alguém dentro** (como a RH Motors): usa as duas etapas acima. O contato
interno serve pra **informação e acesso**, nunca pra vender.

**Sem ninguém dentro** (loja fria): inverte — o relatório de graça vira a porta,
porque você não tem quem te apresente. Manda o dado antes de pedir a reunião. É
mais lento e converte menos, por isso a RH Motors vem primeiro: é onde a chance
é maior, e o primeiro "sim" é o que você precisa pra ter caso pro segundo.

**Regra que vale sempre:** descobrir quem decide **antes** de fazer o pitch.
Vender pra quem não pode dizer sim é a forma mais comum de perder tempo em B2B.

## 3. A mensagem pro DONO (Etapa 2, ou loja fria)

> ⚠️ **Não mandar essa pro amigo vendedor.** Ela fala de precificação, que não é
> decisão dele. Pro vendedor, usar o roteiro da Etapa 1 (item 2.5).
>
> Na RH Motors, o ideal é nem usar por escrito: se o amigo apresentar, isso vira
> conversa presencial. O texto abaixo serve como roteiro do que dizer, e como
> mensagem pronta pras lojas onde você não tem ninguém dentro.

> Boa tarde! Aqui é o Raffer, eu toco o AchadoZ — site de ofertas de carro aqui
> de Cuiabá que cruza os anúncios com a tabela FIPE.
>
> O catálogo de vocês já está no meu sistema. Rodei uma análise dos 136 carros e
> a precificação está bem consistente — a mediana fica 6% acima da FIPE, que é o
> normal pra loja.
>
> Mas 4 fugiram bastante do padrão, os que mais chamaram atenção foram o Prisma
> 2015 e a L200 2022 — os dois com km alto e ágio acima de 35%. São os
> candidatos naturais a ficar parados no pátio.
>
> Te mando a planilha completa de graça se quiser dar uma olhada, sem
> compromisso nenhum.

**Por que funciona:** abre reconhecendo que eles fazem bem o trabalho, entrega
um número específico e verificável, e não pede nada.

## 4. A oferta (só depois que responderem)

**De graça, na hora:** o relatório dos 136 (`npm run relatorio -- "RH Motors"`).

**Pago, R$ 300/mês:**
- Destaque dos carros deles no AchadoZ
- Relatório semanal de precificação, com alerta quando um carro sai da curva
- Carrosséis de oferta prontos pra postar (a skill `/carrossel` já gera)

**R$ 300 é barato de propósito.** O objetivo é sair do `clientes.json = []`. O
primeiro cliente vale pelo que destrava, não pelo que paga.

## 5. Objeções prováveis

| Ele diz | Você responde |
|---|---|
| "Já tenho site/OLX" | "Não substitui, soma. Mando comprador que pesquisa FIPE antes — é outro público." |
| "Quanto de resultado?" | "Não prometo lead. 30 dias por R$ 300 e você vê o número. Se não vier nada, para." |
| "De onde vêm meus dados?" | Verdade, sempre: o catálogo é público no site deles. Dizer de frente evita problema depois. |
| "Sua FIPE tá errada" | **Pode estar mesmo.** Agradecer, corrigir e voltar com o dado certo — isso constrói mais confiança que acertar de primeira. |

## 6. O que isso expõe do próprio AchadoZ

Se só **31 dos 136** carros estão abaixo da FIPE, o site não pode prometer
"achados" e listar o catálogo inteiro. Prometer achado e entregar preço comum
queima a marca no primeiro acesso.

Ação ligada: `exportar-site-json.js` deveria destacar (ou filtrar) os de
`fipeDescontoPct > 0`.

**Ação mais urgente:** auditar a correspondência FIPE. Se a Saveiro passou com
`confianca: alta` estando errada, outros erraram também — e cada erro desses é
um tiro na credibilidade do produto inteiro. **É o bug mais caro da holding
hoje**, porque o produto é justamente a comparação.

## 7. Próximo passo concreto

1. **Conferir a FIPE do Saveiro CD Robust 2024 na fonte** (fipe.org.br) e ver
   qual código o matcher deveria ter usado.
2. Rodar uma amostra de 10 carros conferindo FIPE na mão — medir a taxa de erro real.
3. Só então mandar a mensagem do item 3.
4. Se responderem: relatório de graça, sem cobrar.
5. Só depois falar em R$ 300.
