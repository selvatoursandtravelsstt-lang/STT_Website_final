import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { extname, isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const galleryDirectory = fileURLToPath(new URL('./public/images/gallery', import.meta.url))
const galleryImageExtensions = new Set([
  '.jpg', '.jpeg', '.jpe', '.jfif', '.pjpeg', '.pjp',
  '.png', '.apng', '.webp', '.gif', '.avif', '.bmp', '.dib',
  '.tif', '.tiff', '.svg', '.ico',
])
const galleryManifestId = 'virtual:gallery-images'
const resolvedGalleryManifestId = '\0virtual:gallery-images'

function getGalleryImagePaths() {
  const seenHashes = new Set()

  return readdirSync(galleryDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && galleryImageExtensions.has(extname(entry.name).toLowerCase()))
    .map((entry) => {
      const contents = readFileSync(resolve(galleryDirectory, entry.name))
      return {
        name: entry.name,
        path: `/images/gallery/${entry.name}`,
        hash: createHash('sha256').update(contents).digest('hex'),
      }
    })
    .filter(({ hash }) => {
      if (seenHashes.has(hash)) return false
      seenHashes.add(hash)
      return true
    })
    .sort((first, second) => first.name.localeCompare(second.name, undefined, { numeric: true, sensitivity: 'base' }))
    .map(({ path }) => path)
}

function galleryManifestPlugin() {
  return {
    name: 'gallery-image-manifest',
    resolveId(id) {
      if (id === galleryManifestId) return resolvedGalleryManifestId
    },
    load(id) {
      if (id === resolvedGalleryManifestId) {
        return `export default ${JSON.stringify(getGalleryImagePaths())}`
      }
    },
    configureServer(server) {
      server.watcher.add(galleryDirectory)
    },
    handleHotUpdate({ file, server }) {
      const pathFromGallery = relative(galleryDirectory, resolve(file))
      if (pathFromGallery.startsWith('..') || isAbsolute(pathFromGallery)) return

      const module = server.moduleGraph.getModuleById(resolvedGalleryManifestId)
      if (!module) return

      server.moduleGraph.invalidateModule(module)
      return [module]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), galleryManifestPlugin()],
  base: '/selva-tours-travels/',
})
