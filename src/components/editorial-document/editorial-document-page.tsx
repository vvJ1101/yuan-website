import Image from 'next/image'
import Link from 'next/link'
import styles from './editorial-document.module.css'
import type { EditorialDocument, EditorialImage, EditorialModule } from './types'

function StaticImage({ image, sizes = '100vw', priority = false }: { image: EditorialImage; sizes?: string; priority?: boolean }) {
  return <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} priority={priority} />
}

function typographyClass(module: EditorialModule) {
  const titleClass = module.titleSize ? styles[`title${module.titleSize[0].toUpperCase()}${module.titleSize.slice(1)}`] : ''
  const bodyClass = module.bodySize ? styles[`body${module.bodySize[0].toUpperCase()}${module.bodySize.slice(1)}`] : ''
  const widthClass = module.width ? styles[`width${module.width[0].toUpperCase()}${module.width.slice(1)}`] : ''
  return `${styles.moduleFrame} ${titleClass} ${bodyClass} ${widthClass}`
}

function renderModule(module: EditorialModule) {
  switch (module.type) {
    case 'contents':
      return <section className={`${styles.module} ${styles.contents}`}><h2>{module.title ?? 'Contents'}</h2><ol>{module.items.map((item) => <li key={item.label}><span>{item.label}</span>{item.page && <span>{item.page}</span>}</li>)}</ol></section>
    case 'editorial-split':
      return <section className={`${styles.module} ${styles.roheSpread} ${module.imageSide === 'right' ? styles.reverseSpread : ''}`}><div className={styles.spreadImage}><Image src={module.image.src} alt={module.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover', objectPosition: module.image.objectPosition }} /></div><div className={styles.spreadCopy}><h2>{module.title}</h2><div>{module.body.map((text) => <p key={text}>{text}</p>)}{module.quote && <blockquote>{module.quote}</blockquote>}</div></div></section>
    case 'floating-pair':
      return <section className={`${styles.module} ${styles.floatingPair}`}>{module.images.map((image, index) => <figure key={`${image.src}-${image.alt}`}><StaticImage image={image} sizes="(min-width: 768px) 38vw, 88vw" />{module.captions?.[index] && <figcaption>{module.captions[index]}</figcaption>}</figure>)}</section>
    case 'founder-feature':
      return <section className={`${styles.module} ${styles.founderFeature} ${module.imageSide === 'left' ? styles.featureReverse : ''}`}><div className={styles.featureCopy}><h2>{module.title}</h2>{module.body.map((text) => <p key={text}>{text}</p>)}<div className={styles.secondaryImage}><StaticImage image={module.secondaryImage} sizes="(min-width: 768px) 24vw, 100vw" /></div></div><div className={styles.featureImage}><Image src={module.featureImage.src} alt={module.featureImage.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover', objectPosition: module.featureImage.objectPosition }} /></div></section>
    case 'text-columns':
      return <section className={`${styles.module} ${styles.textColumns}`}>{module.columns.map((column) => <article key={column.title}><h2>{column.title}</h2>{column.body.map((text) => <p key={text}>{text}</p>)}</article>)}</section>
    case 'values-split':
      return <section className={`${styles.module} ${styles.valuesSplit} ${module.imageSide === 'left' ? styles.valuesReverse : ''}`}><div className={styles.valuesCopy}><h2>{module.title}</h2><ul>{module.values.map((value) => <li key={value}>{value}</li>)}</ul></div><div className={styles.valuesImage}><Image src={module.image.src} alt={module.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover', objectPosition: module.image.objectPosition }} /></div></section>
    case 'collection-index':
      return <section className={`${styles.module} ${styles.collectionIndex}`}><h2>{module.title}</h2><div>{module.collections.map((collection) => <figure key={collection.label}><figcaption>{collection.label}</figcaption><StaticImage image={collection.image} sizes="(min-width: 768px) 23vw, 100vw" /></figure>)}</div></section>
    case 'collection-campaign':
      return <section className={`${styles.module} ${styles.collectionCampaign}`}><div className={styles.campaignLead}><Image src={module.leadImage.src} alt={module.leadImage.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover', objectPosition: module.leadImage.objectPosition }} /><div><h2>{module.title}</h2><p>{module.body}</p></div></div><div className={styles.campaignGrid}>{module.gridImages.map((image) => <div key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 16vw, 33vw" style={{ objectFit: 'cover', objectPosition: image.objectPosition }} /></div>)}</div></section>
    case 'maker-profile':
      return <section className={`${styles.module} ${styles.makerProfile} ${module.imageSide === 'left' ? styles.makerReverse : ''}`}><div className={styles.makerDetails}><div className={styles.makerProcess}>{module.processImages.map((image) => <StaticImage key={image.src} image={image} sizes="(min-width: 768px) 14vw, 30vw" />)}</div><div className={styles.makerCopy}><h2>{module.title}</h2>{module.body.map((text) => <p key={text}>{text}</p>)}{module.quote && <blockquote>{module.quote}</blockquote>}</div></div><div className={styles.makerFeature}><StaticImage image={module.featureImage} sizes="(min-width: 768px) 50vw, 100vw" /></div></section>
    case 'name-gallery':
      return <section className={`${styles.module} ${styles.nameGallery}`}><div><h2>{module.title}</h2><ul>{module.names.map((name) => <li key={name}>{name}</li>)}</ul></div><div className={styles.nameImages}>{module.images.map((image) => <div key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 16vw, 33vw" style={{ objectFit: 'cover', objectPosition: image.objectPosition }} /></div>)}</div></section>
    case 'press-list':
      return <section className={`${styles.module} ${styles.pressList}`}><div className={styles.pressImage}><Image src={module.image.src} alt={module.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover', objectPosition: module.image.objectPosition }} /></div><div className={styles.pressLinks}><h2>{module.title}</h2><ul>{module.links.map((link) => <li key={link.label}>{link.href ? <a href={link.href}>{link.label}</a> : link.label}</li>)}</ul></div></section>
    case 'cover':
      return (
        <section className={`${styles.module} ${styles.cover}`}>
          <Image src={module.image.src} alt={module.image.alt} fill priority className={styles.coverImage} sizes="100vw" style={{ objectPosition: module.image.objectPosition }} />
          <div className={styles.coverCopy}><h2>{module.title}</h2>{module.subtitle && <p>{module.subtitle}</p>}</div>
        </section>
      )
    case 'intro':
      return (
        <section className={`${styles.module} ${styles.intro} ${module.align === 'center' ? styles.introCenter : ''}`}>
          <div className={styles.introInner}><h2>{module.heading}</h2>{module.body.map((text) => <p key={text}>{text}</p>)}</div>
        </section>
      )
    case 'full-image':
      return (
        <section className={`${styles.module} ${styles.fullImage} ${module.inset === 'page' ? styles.insetPage : module.inset === 'narrow' ? styles.insetNarrow : ''}`}>
          <StaticImage image={module.image} />
        </section>
      )
    case 'text-image':
      return (
        <section className={`${styles.module} ${styles.textImage} ${module.imageSide === 'right' ? styles.textImageReverse : ''} ${module.tone === 'mist' ? styles.mist : styles.paper}`}>
          <div className={styles.media}><Image src={module.image.src} alt={module.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover', objectPosition: module.image.objectPosition }} /></div>
          <div className={styles.textCopy}>{module.heading && <h2>{module.heading}</h2>}{module.body.map((text) => <p key={text}>{text}</p>)}</div>
        </section>
      )
    case 'image-pair':
      return (
        <section className={`${styles.module} ${styles.imagePair} ${module.ratio === 'portrait-lead' ? styles.pairPortraitLead : module.ratio === 'landscape-lead' ? styles.pairLandscapeLead : styles.pairEqual}`}>
          {module.images.map((image) => <div className={styles.pairImage} key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover', objectPosition: image.objectPosition }} /></div>)}
        </section>
      )
    case 'image-grid':
      return (
        <section className={`${styles.module} ${styles.imageGrid} ${module.columns === 2 ? styles.gridTwo : styles.gridThree} ${module.imageRatio ? styles[`ratio${module.imageRatio[0].toUpperCase()}${module.imageRatio.slice(1)}`] : ''}`}>
          {module.images.map((image) => <div className={styles.gridImage} key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" style={{ objectPosition: image.objectPosition }} /></div>)}
        </section>
      )
    case 'statement':
      return <section className={`${styles.module} ${styles.statement}`}><div><h2>{module.heading}</h2>{module.body && <p>{module.body}</p>}</div></section>
    case 'credits':
      return <section className={`${styles.module} ${styles.credits}`}><h2>{module.heading ?? 'Credits'}</h2><dl className={styles.creditRows}>{module.rows.map((row) => <div className={styles.creditRow} key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl></section>
  }
}

export function EditorialDocumentPage({ document, showMasthead = true }: { document: EditorialDocument; showMasthead?: boolean }) {
  return (
    <main className={styles.page}>
      {showMasthead && <nav className={styles.masthead} aria-label="详情页导航">
        <Link className={styles.brand} href="/">YUAN SHOWROOM</Link>
        <p className={styles.category}>{document.category}</p>
        <Link className={styles.close} href={document.backHref}>CLOSE</Link>
      </nav>}
      <header className={styles.titleBlock}>
        <h1>{document.title}</h1>
        <p className={styles.archive}>{document.archiveLabel}</p>
      </header>
      <div className={styles.document}>{document.modules.map((module) => <div className={typographyClass(module)} key={module.id}>{renderModule(module)}</div>)}</div>
    </main>
  )
}
