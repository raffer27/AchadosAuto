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

## 3. A mensagem (WhatsApp)

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
