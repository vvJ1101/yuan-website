import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

import { collaborations, popUpEvents, eventCategories, collaborationCategories } from '../src/data/editorial.ts'
import { featureFirst, filterProjects, sectionPath } from '../src/lib/editorial.ts'
import { localePath, switchLocalePath, isNavigationItemActive } from '../src/lib/showroom-routing.ts'

test('collaboration sample provides ordered, uniquely keyed content modules with usable media', () => {
  const blocks = collaborations[0].blocks
  assert.ok(Array.isArray(blocks), 'sample must provide content modules')
  assert.deepEqual(new Set(blocks.map(block => block.type)), new Set(['text', 'image', 'pair', 'image-text', 'gallery']))
  assert.equal(new Set(blocks.map(block => block.id)).size, blocks.length)
  for (const block of blocks) {
    if (block.type === 'pair') assert.equal(block.images.length, 2)
    for (const image of [...(block.images ?? []), ...(block.image ? [block.image] : [])]) {
      assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)))
      assert.ok(image.alt.cn && image.alt.en)
      const [width, height] = image.ratio.split('/').map(Number)
      assert.ok(width > 0 && height > 0)
    }
  }
})

test('editorial categories filter the supplied records without mutating them', () => {
  for (const [projects, categories, field] of [[popUpEvents, eventCategories, 'status'], [collaborations, collaborationCategories, 'category']]) {
    assert.equal(filterProjects(projects).length, projects.length)
    for (const category of categories) {
      assert.deepEqual(filterProjects(projects, category), projects.filter((project) => project[field] === category))
    }
    assert.deepEqual(filterProjects(projects, 'UNKNOWN'), [])
    const { featured, remaining } = featureFirst(projects)
    assert.ok(featured.featured)
    assert.equal(remaining.length + 1, projects.length)
    assert.ok(!remaining.includes(featured))
  }
  assert.deepEqual(featureFirst([]), { featured: undefined, remaining: [] })
})

test('project routes retain section selection and language switching', () => {
  for (const project of [...popUpEvents, ...collaborations]) {
    const section = sectionPath(project)
    const path = `/${section}/${project.slug}`
    assert.equal(switchLocalePath(localePath('en', path), 'cn'), path)
    assert.ok(isNavigationItemActive(localePath('en', path), section))
  }
})

test('editorial records have unique slugs, valid dates and available captioned images', () => {
  for (const projects of [popUpEvents, collaborations]) {
    assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length)
    for (const project of projects) {
      for (const image of [project.coverImage, ...project.gallery]) {
        assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)))
        assert.ok(image.alt.cn && image.alt.en)
      }
      if (project.kind === 'event' && project.startDate !== null) {
        assert.ok(Number.isFinite(Date.parse(project.startDate)))
        assert.ok(Date.parse(project.endDate) >= Date.parse(project.startDate))
      } else if (project.kind === 'event') {
        assert.equal(project.endDate, null)
      }
    }
  }
})

test('unverified event schedules stay out of status filters', () => {
  const pending = popUpEvents.filter((project) => project.contentPending)
  assert.ok(pending.length > 0)
  for (const project of pending) {
    assert.equal(project.startDate, null)
    assert.equal(project.endDate, null)
    assert.equal(project.status, null)
    for (const category of eventCategories) assert.ok(!filterProjects(popUpEvents, category).includes(project))
  }
})
