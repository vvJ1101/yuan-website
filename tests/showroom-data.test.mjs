import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const read = (relativePath) => readFile(new URL(relativePath, root), 'utf8')

test('brand categories match the approved matrix', async () => {
  const source = await read('src/data/showroom.ts')
  const brandBlock = source.match(/export const brands: Brand\[\] = \[([\s\S]*?)\n\]\n\nconst editorialLookbook/)?.[1]
  assert.ok(brandBlock)

  const actual = [...brandBlock.matchAll(/\{ slug: '([^']+)', name: '[^']+', category: '(RTW|FTW|ACC)'/g)]
    .map((match) => [match[1], match[2]])

  assert.deepEqual(actual, [
    ['ranyepersonal', 'RTW'],
    ['maison-ther', 'RTW'],
    ['nhoj', 'RTW'],
    ['playply', 'RTW'],
    ['alwools', 'RTW'],
    ['tenspher', 'RTW'],
    ['4mile', 'RTW'],
    ['datt', 'RTW'],
    ['pieton-episode', 'FTW'],
    ['lucia-tacci', 'FTW'],
    ['helen-kaminski', 'ACC'],
    ['reindeer', 'ACC'],
  ])
})

test('every brand room has exactly three images', async () => {
  const source = await read('src/data/showroom.ts')
  const roomImageLists = [...source.matchAll(/roomImages: \[([^\]]+)\]/g)]

  assert.equal(roomImageLists.length, 12)
  for (const [, imageList] of roomImageLists) {
    assert.equal([...imageList.matchAll(/showroomImage\(/g)].length, 3)
  }
})

test('NHOJ introduction has four bilingual semantic paragraphs', async () => {
  const source = await read('src/data/showroom.ts')
  const nhoj = source.split("{ slug: 'nhoj'")[1].split("{ slug: 'playply'")[0]

  assert.equal([...nhoj.matchAll(/\\n\\n/g)].length, 6)
  assert.match(nhoj, /2014 年创立。\\n\\n品牌以建筑与空间为思考起点/)
  assert.match(nhoj, /中性的美学，构建出独立且一致的衣着系统。\\n\\n品牌在全球多个高端零售与展厅中呈现/)
  assert.match(nhoj, /founded by designer Jung Jinwoo in 2014\.\\n\\nTaking architecture and space as its point of departure/)
  assert.match(nhoj, /gender-neutral aesthetic\.\\n\\nPresented through select retailers and showrooms worldwide/)
})

test('every public content record carries cn and en copy', async () => {
  const source = await read('src/data/showroom.ts')
  assert.match(source, /cn:/)
  assert.match(source, /en:/)
  assert.doesNotMatch(source, /TODO|TBD|待翻译/)
})

test('current event is Shanghai Fashion Week and has no published dates', async () => {
  const source = await read('src/data/showroom.ts')
  const event = source.slice(source.indexOf('export const currentEvent'), source.indexOf('export const onSiteServices'))

  assert.match(event, /city:\s*\{ cn: '上海', en: 'Shanghai' \}/)
  assert.match(event, /title:\s*\{ cn: '上海时装周', en: 'Shanghai Fashion Week' \}/)
  assert.doesNotMatch(event, /巴黎|Paris|dates:/)
})

test('current event independently initializes the twelve approved exhibition brands', async () => {
  const source = await read('src/data/showroom.ts')
  const event = source.slice(source.indexOf('export const currentEvent'), source.indexOf('export const onSiteServices'))
  const names = [...event.matchAll(/name: '([^']+)', poster:/g)].map((match) => match[1])

  assert.deepEqual(names, [
    'RANYEPERSONAL', 'MAISON THER', 'NHOJ', 'PLAYPLY', 'ALWOOLS', 'TENSPHER',
    '4MILE', 'DATT', 'PIÉTON ÉPISODE', 'LUCIA TACCI', 'HELEN KAMINSKI', 'REINDEER',
  ])
  assert.doesNotMatch(event, /brands\.map|exhibitionBrandSlugs|A\.NOUR|LE17SEPTEMBRE/)
})

test('event brands retain their initial images with an independent RANYEPERSONAL preview', async () => {
  const source = await read('src/data/showroom.ts')
  const lookbook = source.slice(source.indexOf('const editorialLookbook'), source.indexOf('export const currentEvent'))
  const event = source.slice(source.indexOf('export const currentEvent'), source.indexOf('export const onSiteServices'))

  assert.equal([...lookbook.matchAll(/now\/lookbook\/editorial-\d{2}\.png/g)].length, 12)
  assert.equal([...event.matchAll(/items: editorialLookbook/g)].length, 9)
  assert.match(event, /slug: 'ranyepersonal'.*items: ranyePreviewLookbook/)
  assert.doesNotMatch(lookbook, /styleNumber|name:/)
})

test('recap initializes ten seasons for a balanced five-by-two desktop grid', async () => {
  const source = await read('src/data/showroom.ts')
  const recapBlock = source.slice(source.indexOf('export const recaps'), source.length)
  assert.equal([...recapBlock.matchAll(/\bslug:/g)].length, 10)
  assert.match(recapBlock, /order: 10/)
})
