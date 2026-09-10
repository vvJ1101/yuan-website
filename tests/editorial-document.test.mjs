import test from 'node:test'
import assert from 'node:assert/strict'

async function loadEditorialDocument() {
  try {
    return await import('../src/lib/editorial-document.mjs')
  } catch (error) {
    assert.fail(`editorial document module should load: ${error.message}`)
  }
}

test('editorial modules keep the exact order selected by the editor', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()
  const document = prepareEditorialDocument({
    slug: 'sample',
    title: 'Sample',
    category: 'POP-UP EVENTS',
    modules: [
      { id: 'cover', type: 'cover', image: '/cover.jpg', alt: 'Cover' },
      { id: 'story', type: 'text-image', heading: 'Story', body: ['Body'], image: '/story.jpg', alt: 'Story' },
      { id: 'closing', type: 'full-image', image: '/closing.jpg', alt: 'Closing' },
    ],
  })

  assert.deepEqual(document.modules.map((module) => module.id), ['cover', 'story', 'closing'])
})

test('editorial modules reject duplicate ids before rendering', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()

  assert.throws(
    () => prepareEditorialDocument({
      slug: 'sample',
      title: 'Sample',
      category: 'COLLABORATIONS',
      modules: [
        { id: 'same', type: 'full-image', image: '/one.jpg', alt: 'One' },
        { id: 'same', type: 'full-image', image: '/two.jpg', alt: 'Two' },
      ],
    }),
    /Duplicate editorial module id: same/,
  )
})

test('editorial modules reject missing image content', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()

  assert.throws(
    () => prepareEditorialDocument({
      slug: 'sample',
      title: 'Sample',
      category: 'POP-UP EVENTS',
      modules: [{ id: 'empty', type: 'full-image', image: '', alt: 'Empty' }],
    }),
    /requires an image/,
  )
})

test('Röhe collection campaign requires one lead image and exactly nine grid images', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()
  const image = (name) => ({ src: `/${name}.jpg`, alt: name, width: 100, height: 120 })

  assert.throws(
    () => prepareEditorialDocument({
      slug: 'sample',
      title: 'Sample',
      category: 'COLLABORATIONS',
      modules: [{
        id: 'campaign',
        type: 'collection-campaign',
        title: 'Spring Summer',
        body: 'Collection copy',
        leadImage: image('lead'),
        gridImages: Array.from({ length: 8 }, (_, index) => image(`grid-${index}`)),
      }],
    }),
    /requires exactly 9 grid images/,
  )
})

test('Röhe maker profile requires exactly three process images', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()
  const image = (name) => ({ src: `/${name}.jpg`, alt: name, width: 100, height: 120 })

  assert.throws(
    () => prepareEditorialDocument({
      slug: 'sample',
      title: 'Sample',
      category: 'COLLABORATIONS',
      modules: [{
        id: 'maker',
        type: 'maker-profile',
        title: 'Maker',
        body: ['Profile'],
        quote: 'Quote',
        processImages: [image('one'), image('two')],
        featureImage: image('feature'),
      }],
    }),
    /requires exactly 3 process images/,
  )
})

test('logo pages are not available as editorial content modules', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()

  assert.throws(
    () => prepareEditorialDocument({
      slug: 'sample',
      title: 'Sample',
      category: 'POP-UP EVENTS',
      modules: [{ id: 'logo', type: 'logo-page', logo: 'YUAN SHOWROOM' }],
    }),
    /Unknown editorial module type: logo-page/,
  )
})

test('the former DATT route resolves to the PIETON x HUG pop-up', async () => {
  const { popUpEvents } = await import('../src/data/editorial.ts')
  const event = popUpEvents.find((item) => item.slug === 'sample-next-season')

  assert.equal(event.title.en, 'PIETON × HUG | SHAPED BY TIME')
  assert.equal(event.contentPending, false)
  assert.equal(event.coverImage.src, '/images/editorial/events/pieton-hug/facade-cover-portrait.png')
  assert.deepEqual(event.participatingBrands, ['PIETON', 'HUG'])
})

test('editorial modules reject unsupported typography presets from the CMS', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()

  assert.throws(
    () => prepareEditorialDocument({
      slug: 'sample',
      title: 'Sample',
      category: 'POP-UP EVENTS',
      modules: [{
        id: 'intro',
        type: 'intro',
        heading: 'Introduction',
        body: ['Body'],
        titleSize: 'huge',
        bodySize: 'medium',
      }],
    }),
    /Unsupported title size: huge/,
  )
})

test('editorial modules reject unsupported width and image-ratio presets from the CMS', async () => {
  const { prepareEditorialDocument } = await loadEditorialDocument()
  const base = {
    slug: 'sample',
    title: 'Sample',
    category: 'POP-UP EVENTS',
  }

  assert.throws(
    () => prepareEditorialDocument({
      ...base,
      modules: [{ id: 'intro', type: 'intro', heading: 'Intro', body: ['Body'], width: 'oversized' }],
    }),
    /Unsupported module width: oversized/,
  )

  assert.throws(
    () => prepareEditorialDocument({
      ...base,
      modules: [{ id: 'grid', type: 'image-grid', images: [{ src: '/one.jpg', alt: 'One' }], imageRatio: 'cinematic' }],
    }),
    /Unsupported image ratio: cinematic/,
  )
})
