const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeHeroImage() {
  const inputPath = path.join(__dirname, '../public/hero.png');
  const publicDir = path.join(__dirname, '../public');
  
  try {
    // Create WebP version - higher resolution and quality
    await sharp(inputPath)
      .resize(1024, 1024, { fit: 'cover' })
      .webp({ quality: 95 })
      .toFile(path.join(publicDir, 'hero-optimized.webp'));
    
    // Create mobile version - still good quality
    await sharp(inputPath)
      .resize(768, 768, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(path.join(publicDir, 'hero-mobile.webp'));
    
    // Create optimized PNG fallback
    await sharp(inputPath)
      .resize(1024, 1024, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'hero-optimized.png'));
    
    console.log('✅ Images optimized successfully!');
    console.log('Created:');
    console.log('- hero-optimized.webp (1024x1024, 95% quality)');
    console.log('- hero-mobile.webp (768x768, 90% quality)');
    console.log('- hero-optimized.png (1024x1024 fallback)');
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

optimizeHeroImage();