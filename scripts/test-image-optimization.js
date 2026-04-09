#!/usr/bin/env node

/**
 * Test Image Optimization Script
 *
 * Safely tests image optimization on 3 sample images without touching originals.
 * Creates optimized versions in a test directory for comparison.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Test images (the 3 largest files identified in analysis)
const TEST_IMAGES = [
  'public/images/portfolio/Photos/5 Small and coverups/Moon Tattoo.jpg',
  'public/images/portfolio/Photos/2 Realism and portraits/Warcraft Theme Tattoo.jpg',
  'public/images/portfolio/Photos/2 Realism and portraits/Baby Foot Tattoo.jpg',
];

const OUTPUT_DIR = 'public/images/_test-optimized';
const QUALITY = 75; // 75% quality - good balance between size and quality
const WIDTHS = [400, 800, 1600, 2400]; // Responsive sizes

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function optimizeImage(imagePath) {
  const fileName = path.basename(imagePath, '.jpg');
  const dirName = path.basename(path.dirname(imagePath));
  const originalSize = getFileSize(imagePath);

  console.log(`\n📸 Processing: ${fileName}`);
  console.log(`   Original: ${formatBytes(originalSize)}`);

  // Create output directory structure
  const outputSubDir = path.join(OUTPUT_DIR, dirName);
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  let totalSaved = 0;
  const results = [];

  // Generate optimized versions at different widths
  for (const width of WIDTHS) {
    const outputPath = path.join(outputSubDir, `${fileName}-${width}w.webp`);

    await sharp(imagePath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const optimizedSize = getFileSize(outputPath);
    const saved = originalSize - optimizedSize;
    totalSaved += saved;

    results.push({
      width,
      size: formatBytes(optimizedSize),
      saved: formatBytes(saved),
      reduction: Math.round((saved / originalSize) * 100)
    });
  }

  // Also create a JPEG version at 75% quality (same size as original)
  const jpegOutputPath = path.join(outputSubDir, `${fileName}-optimized.jpg`);
  await sharp(imagePath)
    .jpeg({ quality: QUALITY })
    .toFile(jpegOutputPath);

  const jpegSize = getFileSize(jpegOutputPath);
  const jpegSaved = originalSize - jpegSize;

  console.log(`\n   ✅ Optimized JPG: ${formatBytes(jpegSize)} (saved ${formatBytes(jpegSaved)} - ${Math.round((jpegSaved/originalSize)*100)}%)`);

  console.log(`\n   📊 WebP Variants:`);
  results.forEach(r => {
    console.log(`      ${r.width}px: ${r.size} (${r.reduction}% reduction)`);
  });

  console.log(`\n   💾 Total potential savings: ${formatBytes(totalSaved + jpegSaved)}`);

  return {
    original: fileName,
    originalSize,
    jpegSize,
    jpegSaved,
    webpResults: results,
    totalSaved: totalSaved + jpegSaved
  };
}

async function runTest() {
  console.log('🚀 Starting Image Optimization Test\n');
  console.log(`Testing ${TEST_IMAGES.length} images...`);
  console.log(`Quality: ${QUALITY}%`);
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let totalOriginal = 0;
  let totalSaved = 0;
  const allResults = [];

  // Process each test image
  for (const imagePath of TEST_IMAGES) {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Skipping ${imagePath} - file not found`);
      continue;
    }

    const result = await optimizeImage(imagePath);
    allResults.push(result);
    totalOriginal += result.originalSize;
    totalSaved += result.totalSaved;
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nTotal original size: ${formatBytes(totalOriginal)}`);
  console.log(`Total optimized size: ${formatBytes(totalOriginal - totalSaved)}`);
  console.log(`Total saved: ${formatBytes(totalSaved)}`);
  console.log(`Average reduction: ${Math.round((totalSaved / totalOriginal) * 100)}%`);

  console.log(`\n✅ Test complete! Check ${OUTPUT_DIR} to compare quality.`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review optimized images in ${OUTPUT_DIR}`);
  console.log(`   2. If quality looks good, run full optimization`);
  console.log(`   3. If not, adjust QUALITY setting and re-test`);
}

// Run the test
runTest().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
