import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

async function convertToWebp(pngPath, webpPath, label) {
  if (!existsSync(pngPath)) return false
  const sharp = (await import('sharp')).default
  const buffer = readFileSync(pngPath)
  await sharp(buffer)
    .webp({ quality: 85, effort: 6 })
    .toFile(webpPath)
  console.log(label)
  return true
}

async function main() {
  const botPng = join(publicDir, 'bot.png')
  const botWebp = join(publicDir, 'bot.webp')
  if (existsSync(botPng)) {
    await convertToWebp(botPng, botWebp, 'Generated public/bot.webp from bot.png.')
  } else {
    console.warn('scripts/optimize-images.js: bot.png not found (optional).')
  }

  const logoPng = join(publicDir, 'logo.png')
  const logoWebp = join(publicDir, 'logo.webp')
  if (existsSync(logoPng)) {
    await convertToWebp(logoPng, logoWebp, 'Generated public/logo.webp from logo.png.')
  }
}

main().catch((err) => {
  console.error('optimize-images failed:', err)
  process.exit(1)
})
