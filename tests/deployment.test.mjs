import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('package exposes safe fast and full production deployment commands', async () => {
  const pkg = JSON.parse(await read('package.json'))

  assert.equal(pkg.scripts['check:fast'], 'bash scripts/check-fast.sh')
  assert.equal(pkg.scripts['deploy:fast'], 'bash scripts/deploy-production.sh fast')
  assert.equal(pkg.scripts['deploy:full'], 'bash scripts/deploy-production.sh full')
})

test('fast checks retain tests lint and a production build', async () => {
  const script = await read('scripts/check-fast.sh')

  assert.match(script, /npm run test/)
  assert.match(script, /npm run lint/)
  assert.match(script, /npm run build/)
  assert.match(script, /wait/)
})

test('production deployment stages releases and rolls back failed health checks', async () => {
  const script = await read('scripts/deploy-production.sh')

  assert.match(script, /\.next\.stage-/)
  assert.match(script, /public\.stage-/)
  assert.match(script, /\.next\.backup\./)
  assert.match(script, /\.public\.backup\./)
  assert.match(script, /curl[^\n]*127\.0\.0\.1:\$PORT/)
  assert.match(script, /PUBLIC_URL=\$\{YUAN_PUBLIC_URL:-https:\/\/yuanshowroom\.cn\}/)
  assert.match(script, /curl[^\n]*\$PUBLIC_URL/)
  assert.match(script, /deployment_failed_rolled_back/)
  assert.match(script, /tail -n \+4/)
})

test('production deployment never targets the academy service', async () => {
  const script = await read('scripts/deploy-production.sh')

  assert.doesNotMatch(script, /yuan-academy|3001|\/var\/www\/yuan-academy/)
})
