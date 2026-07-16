import { createHash } from 'node:crypto'
import { readFile, readdir, unlink } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()

async function filesUnder(relativeDirectory) {
  const absoluteDirectory = path.join(root, relativeDirectory)
  const entries = await readdir(absoluteDirectory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const relativePath = path.posix.join(relativeDirectory, entry.name)
    return entry.isDirectory() ? filesUnder(relativePath) : [relativePath]
  }))
  return files.flat().sort()
}

const sourceFiles = (await filesUnder('src')).filter((file) => /\.(ts|tsx)$/.test(file))
const referenced = new Set()

for (const file of sourceFiles) {
  const source = await readFile(path.join(root, file), 'utf8')
  for (const match of source.matchAll(/["'](\/images\/[^"']+)["']/g)) {
    referenced.add(match[1])
  }
}

const publicFiles = (await filesUnder('public/images'))
  .filter((file) => !path.basename(file).startsWith('._'))
const published = new Set(publicFiles.map((file) => `/${file.replace(/^public\//, '')}`))
const used = [...referenced].filter((file) => published.has(file)).sort()
const missing = [...referenced].filter((file) => !published.has(file)).sort()
const unused = [...published].filter((file) => !referenced.has(file)).sort()
const hashes = new Map()

for (const file of publicFiles) {
  const digest = createHash('sha256')
    .update(await readFile(path.join(root, file)))
    .digest('hex')
  const paths = hashes.get(digest) ?? []
  paths.push(`/${file.replace(/^public\//, '')}`)
  hashes.set(digest, paths)
}

const duplicates = [...hashes.values()]
  .filter((paths) => paths.length > 1)
  .map((paths) => paths.sort())

console.log(JSON.stringify({ used, unused, missing, duplicates }, null, 2))
if (missing.length > 0) process.exitCode = 1

if (process.argv.includes('--remove-unused')) {
  if (process.env.ASSET_BACKUP_VERIFIED !== '1') {
    throw new Error('Refusing cleanup without ASSET_BACKUP_VERIFIED=1')
  }
  if (missing.length > 0) {
    throw new Error('Refusing cleanup while referenced assets are missing')
  }
  await Promise.all(unused.map((file) => unlink(path.join(root, 'public', file))))
  console.error(`Removed ${unused.length} unused assets`)
}
