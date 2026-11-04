import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { business } from '../src/config/business.js'
import { getPageMeta, getPageStructuredData, indexableSeoRoutes } from '../src/config/seo.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = resolve(projectRoot, 'dist')
const siteUrl = business.websiteUrl.replace(/\/+$/, '')
const template = readFileSync(resolve(outputDirectory, 'index.html'), 'utf8')
const metadataRoutes = [...indexableSeoRoutes, '/reviews', '/booking-summary']
const encodeAttribute = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')

function replaceTag(html, pattern, replacement, description) {
  if (!pattern.test(html)) throw new Error(`Could not find ${description} in the built HTML template.`)
  return html.replace(pattern, replacement)
}

function renderSeoShell(pathname) {
  const page = getPageMeta(pathname)
  const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`
  let html = template

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${encodeAttribute(page.title)}</title>`, 'title')
  html = replaceTag(html, /<meta name="description"[^>]*\/?>/i, `<meta name="description" content="${encodeAttribute(page.description)}" />`, 'description')
  html = replaceTag(
    html,
    /<meta name="robots"[^>]*\/?>/i,
    `<meta name="robots" content="${page.robots || 'index, follow, max-image-preview:large'}" />`,
    'robots directive',
  )
  html = replaceTag(
    html,
    /<link rel="canonical"[^>]*\/?>/i,
    page.robots?.includes('noindex') ? '' : `<link rel="canonical" href="${canonicalUrl}" />`,
    'canonical link',
  )
  html = replaceTag(html, /<meta property="og:title"[^>]*\/?>/i, `<meta property="og:title" content="${encodeAttribute(page.title)}" />`, 'Open Graph title')
  html = replaceTag(html, /<meta property="og:description"[^>]*\/?>/i, `<meta property="og:description" content="${encodeAttribute(page.description)}" />`, 'Open Graph description')
  html = replaceTag(html, /<meta property="og:url"[^>]*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`, 'Open Graph URL')
  html = replaceTag(html, /<meta name="twitter:title"[^>]*\/?>/i, `<meta name="twitter:title" content="${encodeAttribute(page.title)}" />`, 'Twitter title')
  html = replaceTag(html, /<meta name="twitter:description"[^>]*\/?>/i, `<meta name="twitter:description" content="${encodeAttribute(page.description)}" />`, 'Twitter description')
  html = replaceTag(
    html,
    /<script type="application\/ld\+json" id="site-structured-data">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" id="site-structured-data">${JSON.stringify(getPageStructuredData(pathname, page))}</script>`,
    'structured data',
  )

  return html
}

const routeRewrites = []
for (const pathname of metadataRoutes) {
  if (pathname === '/') continue
  const routeFileName = `${pathname.slice(1)}.html`
  const pageFile = resolve(outputDirectory, routeFileName)
  mkdirSync(dirname(pageFile), { recursive: true })
  writeFileSync(pageFile, renderSeoShell(pathname), 'utf8')
  routeRewrites.push(`${pathname} /${routeFileName} 200`)
}

const sitemapUrls = indexableSeoRoutes
  .map((pathname) => `${siteUrl}${pathname === '/' ? '/' : pathname}`)
  .map((url) => `  <url><loc>${url}</loc></url>`)
  .join('\n')
writeFileSync(
  resolve(outputDirectory, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
  'utf8',
)
writeFileSync(
  resolve(outputDirectory, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  'utf8',
)
writeFileSync(
  resolve(outputDirectory, '_redirects'),
  [
    '/tariff /tariff/local-hours 301',
    '/tour-packages /tour-packages/one-day 301',
    ...routeRewrites,
    '/* /index.html 200',
    '',
  ].join('\n'),
  'utf8',
)

console.log(`Generated SEO metadata pages and sitemap for ${indexableSeoRoutes.length} indexable routes.`)
