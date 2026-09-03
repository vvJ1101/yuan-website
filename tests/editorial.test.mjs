import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

import { collaborations, popUpEvents, eventCategories, collaborationCategories } from '../src/data/editorial.ts'
import { featureFirst, filterProjects, sectionPath } from '../src/lib/editorial.ts'
import { localePath, switchLocalePath, isNavigationItemActive } from '../src/lib/showroom-routing.ts'

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
      if (project.kind === 'event') {
        assert.ok(Number.isFinite(Date.parse(project.startDate)))
        assert.ok(Date.parse(project.endDate) >= Date.parse(project.startDate))
      }
    }
  }
})
