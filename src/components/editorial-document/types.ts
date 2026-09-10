export type EditorialImage = {
  src: string
  alt: string
  width: number
  height: number
  objectPosition?: string
}

type ModuleBase = {
  id: string
  titleSize?: 'small' | 'medium' | 'large'
  bodySize?: 'small' | 'medium' | 'large'
  width?: 'narrow' | 'standard' | 'wide' | 'full'
}

export type EditorialModule =
  | (ModuleBase & {
      type: 'contents'
      title?: string
      items: { label: string; page?: string }[]
    })
  | (ModuleBase & {
      type: 'editorial-split'
      title: string
      body: string[]
      quote?: string
      image: EditorialImage
      imageSide?: 'left' | 'right'
    })
  | (ModuleBase & {
      type: 'floating-pair'
      images: [EditorialImage, EditorialImage]
      captions?: [string, string]
    })
  | (ModuleBase & {
      type: 'founder-feature'
      title: string
      body: string[]
      featureImage: EditorialImage
      secondaryImage: EditorialImage
      imageSide?: 'left' | 'right'
    })
  | (ModuleBase & {
      type: 'text-columns'
      columns: { title: string; body: string[] }[]
    })
  | (ModuleBase & {
      type: 'values-split'
      title: string
      values: string[]
      image: EditorialImage
      imageSide?: 'left' | 'right'
    })
  | (ModuleBase & {
      type: 'collection-index'
      title: string
      collections: { label: string; image: EditorialImage }[]
    })
  | (ModuleBase & {
      type: 'collection-campaign'
      title: string
      body: string
      leadImage: EditorialImage
      gridImages: [EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage, EditorialImage]
    })
  | (ModuleBase & {
      type: 'maker-profile'
      title: string
      body: string[]
      quote?: string
      processImages: [EditorialImage, EditorialImage, EditorialImage]
      featureImage: EditorialImage
      imageSide?: 'left' | 'right'
    })
  | (ModuleBase & {
      type: 'name-gallery'
      title: string
      names: string[]
      images: EditorialImage[]
    })
  | (ModuleBase & {
      type: 'press-list'
      title: string
      image: EditorialImage
      links: { label: string; href?: string }[]
    })
  | (ModuleBase & {
      type: 'cover'
      image: EditorialImage
      title: string
      subtitle?: string
    })
  | (ModuleBase & {
      type: 'intro'
      heading: string
      body: string[]
      align?: 'left' | 'center'
    })
  | (ModuleBase & {
      type: 'full-image'
      image: EditorialImage
      inset?: 'none' | 'page' | 'narrow'
    })
  | (ModuleBase & {
      type: 'text-image'
      heading?: string
      body: string[]
      image: EditorialImage
      imageSide?: 'left' | 'right'
      tone?: 'paper' | 'mist'
    })
  | (ModuleBase & {
      type: 'image-pair'
      images: [EditorialImage, EditorialImage]
      ratio?: 'equal' | 'portrait-lead' | 'landscape-lead'
    })
  | (ModuleBase & {
      type: 'image-grid'
      images: EditorialImage[]
      columns?: 2 | 3
      imageRatio?: 'landscape' | 'square' | 'portrait'
    })
  | (ModuleBase & {
      type: 'statement'
      heading: string
      body?: string
    })
  | (ModuleBase & {
      type: 'credits'
      heading?: string
      rows: { label: string; value: string }[]
    })

export type EditorialDocument = {
  slug: string
  category: 'POP-UP EVENTS' | 'COLLABORATIONS'
  title: string
  archiveLabel: string
  backHref: string
  modules: EditorialModule[]
}
