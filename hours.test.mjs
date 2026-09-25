import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const bundle = await build({ entryPoints: ['business.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { openingStatus } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
test('uses São Paulo opening boundaries and closes at midnight', () => {
  for (const [instant, expected] of [
    ['2026-09-25T14:59:00Z', false], ['2026-09-25T15:00:00Z', true],
    ['2026-09-26T02:59:00Z', true], ['2026-09-26T03:00:00Z', false],
    ['2026-09-27T19:59:00Z', true], ['2026-09-27T20:00:00Z', false],
    ['2026-09-28T16:00:00Z', false], ['2026-09-29T15:00:00Z', true],
  ]) assert.equal(openingStatus(new Date(instant)).open, expected, instant);
});
