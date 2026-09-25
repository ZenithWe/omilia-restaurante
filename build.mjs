import { build, transform } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

await mkdir('.build', { recursive: true });
await build({ entryPoints: ['server.tsx'], bundle: true, platform: 'node', format: 'esm', packages: 'external', outfile: '.build/server.mjs', jsx: 'automatic', logLevel: 'warning' });
const { render, structuredData } = await import(pathToFileURL(path.resolve('.build/server.mjs')).href);
const client = await build({ entryPoints: ['client.tsx'], bundle: true, minify: true, write: false, outfile: '.build/client.js', platform: 'browser', format: 'iife', target: ['es2022'], jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'external' });
const css = await transform(await readFile('styles.css', 'utf8'), { loader: 'css', minify: true });
const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#19221e"/><text x="32" y="47" font-family="Georgia,serif" font-size="50" text-anchor="middle" fill="#dea67b">o</text></svg>';
const script = client.outputFiles.find(file => !file.path.endsWith('.LEGAL.txt'))?.text;
if (!script) throw new Error('The client bundle was not generated.');
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#19221e"><title>Omilía Restaurante | Gastronomia mineira na Vila da Serra</title><meta name="description" content="Gastronomia mineira contemporânea no Omilía Restaurante, na Vila da Serra, Nova Lima. Conheça a cozinha, confira horários e consulte sua reserva."><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="Omilía — Minas à mesa. Conversa sem pressa."><meta property="og:description" content="Gastronomia mineira contemporânea na Vila da Serra, Nova Lima. Conheça a casa e consulte sua reserva."><link rel="icon" href="data:image/svg+xml,${encodeURIComponent(svg)}"><style>${css.code}</style><script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script></head><body><div id="root">${render()}</div><script>${script.replace(/<\/script/gi, '<\\/script')}</script></body></html>`;
await writeFile('index.html', html);
const notices = client.outputFiles.filter(file => file.path.endsWith('.LEGAL.txt')).map(file => file.text).join('\n');
await writeFile('THIRD-PARTY-NOTICES.txt', notices || 'React and React DOM are licensed under the MIT license. See package-lock.json for dependency versions.\n');
console.log(`Built index.html: ${(Buffer.byteLength(html)/1024).toFixed(1)} KiB, pre-rendered HTML with React hydration.`);
