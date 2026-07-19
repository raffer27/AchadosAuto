// Validador do carros.json — aponta problemas de dados e simula os selos FIPE
// exatamente com a mesma lógica de parseValorBR do index.html.
import { readFileSync } from 'node:fs';
const carros = JSON.parse(readFileSync(new URL('./carros.json', import.meta.url)));

function parseValorBR(valor) {
  if (valor === null || valor === undefined) return null;
  if (typeof valor === 'number') return valor;
  const limpo = String(valor).replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(,|$))/g, '').replace(',', '.');
  const n = parseFloat(limpo);
  return Number.isNaN(n) ? null : n;
}
const MIN = 8;

const semFipe = [], semFoto = [], selos = [], acimaFipe = [];
const marcas = new Map();
for (const c of carros) {
  marcas.set(c.marca, (marcas.get(c.marca) || 0) + 1);
  if (!c.fipePreco) semFipe.push(c.id);
  if (!c.fotos || !c.fotos.length) semFoto.push(c.id);
  const fipe = parseValorBR(c.fipePreco), preco = parseValorBR(c.preco);
  if (fipe && preco) {
    const pct = (fipe - preco) / fipe * 100;
    if (pct >= MIN) selos.push({ id: c.id, titulo: c.titulo, pct: pct.toFixed(0) });
    else if (pct < 0) acimaFipe.push(c.id);
  }
}
console.log(`Total de carros: ${carros.length}`);
console.log(`Sem fipePreco: ${semFipe.length}`, semFipe.length ? `(ids: ${semFipe.join(', ')})` : '');
console.log(`Sem foto: ${semFoto.length}`, semFoto.length ? `(ids: ${semFoto.join(', ')})` : '');
console.log(`Carros ACIMA da Fipe (sem selo, ok): ${acimaFipe.length}`);
console.log(`\nSELOS que vão aparecer (>= ${MIN}% abaixo da Fipe): ${selos.length}`);
selos.sort((a,b)=>b.pct-a.pct).slice(0,12).forEach(s => console.log(`  ${s.pct}%  ${s.titulo}`));
const typos = [...marcas.keys()].filter(m => /^[a-z]/.test(m) || /volsk|mercedes-benz$/i.test(m) && m!=='Mercedes-Benz');
console.log(`\nMarcas suspeitas (minúsculas/typos): ${typos.length ? typos.join(', ') : 'nenhuma'}`);
