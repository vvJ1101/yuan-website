export function normalizeLookIndex(index: number, length: number): number {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}

export type CampaignReelDirection = 'forward' | 'backward'
export type LookbookChapter = 'campaign' | 'index'

export function getLookbookChapterLabel(
  chapter: LookbookChapter,
  locale: 'cn' | 'en',
  season: string,
  lookCount: number,
): string {
  if (chapter === 'campaign') return `${locale === 'cn' ? '视觉大片' : 'CAMPAIGN'} · ${season}`
  return `${locale === 'cn' ? '造型索引' : 'LOOK INDEX'} · ${String(lookCount).padStart(2, '0')} LOOKS`
}

export function getCampaignReelDirection(current: number, target: number, length: number): CampaignReelDirection {
  if (length <= 1) return 'forward'
  const forwardDistance = normalizeLookIndex(target - current, length)
  const backwardDistance = normalizeLookIndex(current - target, length)
  return forwardDistance <= backwardDistance ? 'forward' : 'backward'
}

export function getCampaignReelTapTarget(
  clientX: number,
  frameLeft: number,
  frameWidth: number,
  current: number,
  length: number,
): number {
  if (frameWidth <= 0) return normalizeLookIndex(current, length)
  const offset = clientX - frameLeft < frameWidth / 2 ? -1 : 1
  return normalizeLookIndex(current + offset, length)
}

export function buildLookbookStageSlots(length: number, slotCount: number): number[] {
  if (length <= 0 || slotCount <= 0) return []
  return Array.from({ length: Math.min(length, slotCount) }, (_, index) => index)
}

export function buildLookbookLeadStrip(length: number, selected: number): number[] {
  if (length <= 1) return []
  const active = normalizeLookIndex(selected, length)
  return Array.from({ length }, (_, index) => index).filter(index => index !== active)
}

export function buildLookbookStageWings(length: number): { left: number[]; right: number[] } {
  const count = Math.max(0, Math.min(18, Math.floor(length)))
  const leftCount = Math.min(6, Math.ceil(count / 2))
  const indices = Array.from({ length: count }, (_, index) => index)

  return {
    left: indices.slice(0, leftCount),
    right: indices.slice(leftCount),
  }
}

export function getLookbookCutoutPath(image: string): string {
  const filename = image.match(/\/([^/]+)\.webp$/)?.[1]
  if (!filename?.startsWith('womenswear-upload-')) return image
  return `/images/showroom/now/lookbook/cutouts/${filename}.png`
}

export function getLookbookIndexInitialSelection(length: number): number {
  return length > 1 ? 1 : 0
}

export type LookbookStageMediaKind = 'full' | 'detail'

export function getLookbookStageMediaKind(image: string): LookbookStageMediaKind {
  return image.endsWith('/womenswear-upload-12.webp') ? 'detail' : 'full'
}
