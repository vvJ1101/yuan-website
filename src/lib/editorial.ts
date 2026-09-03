import type { EditorialProject, EditorialSection } from '../types/editorial'

export function projectCategory(project: EditorialProject): string {
  return project.kind === 'event' ? project.status : project.category
}

export function filterProjects<T extends EditorialProject>(projects: readonly T[], category?: string): readonly T[] {
  return category ? projects.filter((project) => projectCategory(project) === category) : projects
}

export function sectionPath(project: EditorialProject): EditorialSection {
  return project.kind === 'event' ? 'pop-up-events' : 'collaborations'
}

export function featureFirst<T extends EditorialProject>(projects: readonly T[]): { featured: T | undefined; remaining: T[] } {
  const featured = projects.find((project) => project.featured) ?? projects[0]
  return { featured, remaining: projects.filter((project) => project !== featured) }
}
