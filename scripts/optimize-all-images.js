#!/usr/bin/env node

/**
 * Full Portfolio Image Optimization
 *
 * Optimizes all 175 portfolio images with backup safety.
 * - Creates backup of originals in _originals folder
 * - Generates optimized JPG (75% quality)
 * - Generates WebP variants at multiple sizes
 * - Preserves directory structure
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE_DIR = 'public/images/portfolio/Photos';
const BACKUP_DIR = 'public/images/portfolio/_originals';
const QUALITY = 75;
const WIDTHS = [400, 800, 1600]; // Responsive sizes (skip 2400 to save space)

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getAllImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else if (file.match(/\.(jpg|jpeg)$/i)) {
      results.push(filePath);
    }
  });

  return results;
}

async function optimizeImage(imagePath, index, total) {
  const relativePath = path.relative(BASE_DIR, imagePath);
  const fileName = path.basename(imagePath);
  const dirName = path.dirname(relativePath);
  const originalSize = getFileSize(imagePath);

  console.log(`[${index + 1}/${total}] 📸 ${relativePath}`);
  console.log(`          Original: ${formatBytes(originalSize)}`);

  // Create backup directory structure
  const backupDir = path.join(BACKUP_DIR, dirName);
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Backup original
  const backupPath = path.join(backupDir, fileName);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(imagePath, backupPath);
  }

  // Optimize main JPG (replaces original)
  const tempPath = imagePath + '.tmp';
  await sharp(imagePath)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tempPath);

  fs.renameSync(tempPath, imagePath);
  const optimizedSize = getFileSize(imagePath);
  const jpegSaved = originalSize - optimizedSize;

  console.log(`          Optimized: ${formatBytes(optimizedSize)} (saved ${formatBytes(jpegSaved)} - ${Math.round((jpegSaved/originalSize)*100)}%)`);

  // Generate WebP variants
  const webpDir = path.join(path.dirname(imagePath), '_webp');
  if (!fs.existsSync(webpDir)) {
    fs.mkdirSync(webpDir, { recursive: true });
  }

  const baseName = path.basename(fileName, path.extname(fileName));
  let webpSaved = 0;

  for (const width of WIDTHS) {
    const webpPath = path.join(webpDir, `${baseName}-${width}w.webp`);

    await sharp(imagePath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpSize = getFileSize(webpPath);
    webpSaved += (originalSize - webpSize);
  }

  return {
    originalSize,
    optimizedSize,
    saved: jpegSaved
  };
}

async function run() {
  console.log('🚀 Starting Full Portfolio Image Optimization\n');
  console.log(`Source: ${BASE_DIR}`);
  console.log(`Backup: ${BACKUP_DIR}`);
  console.log(`Quality: ${QUALITY}%`);
  console.log(`WebP sizes: ${WIDTHS.join('px, ')}px\n`);

  // Get all images
  const images = getAllImages(BASE_DIR);
  console.log(`Found ${images.length} images to optimize\n`);
  console.log('='.repeat(60));

  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalSaved = 0;
  let processed = 0;

  // Process images in batches to avoid memory issues
  const BATCH_SIZE = 10;
  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    const batch = images.slice(i, Math.min(i + BATCH_SIZE, images.length));

    for (const imagePath of batch) {
      try {
        const result = await optimizeImage(imagePath, processed, images.length);
        totalOriginal += result.originalSize;
        totalOptimized += result.optimizedSize;
        totalSaved += result.saved;
        processed++;
      } catch (err) {
        console.log(`          ❌ Error: ${err.message}`);
      }
      console.log('');
    }
  }

  // Summary
  console.log('='.repeat(60));
  console.log('📊 OPTIMIZATION COMPLETE\n');
  console.log(`Images processed: ${processed}/${images.length}`);
  console.log(`Total original size: ${formatBytes(totalOriginal)}`);
  console.log(`Total optimized size: ${formatBytes(totalOptimized)}`);
  console.log(`Total saved: ${formatBytes(totalSaved)}`);
  console.log(`Average reduction: ${Math.round((totalSaved / totalOriginal) * 100)}%`);
  console.log(`\n✅ Originals backed up to: ${BACKUP_DIR}`);
  console.log(`✅ WebP variants created in each directory/_webp/`);
  console.log(`\n📝 Next: Update portfolio.ts to reference optimized images`);
}

run().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
