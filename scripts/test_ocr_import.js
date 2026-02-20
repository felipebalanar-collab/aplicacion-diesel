const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

// Usage: node scripts/test_ocr_import.js [imagePath] [baseUrl] [token]
// Example: node scripts/test_ocr_import.js ./public/test-images/sample.jpg http://localhost:3000 mytoken

async function main() {
  const args = process.argv.slice(2);
  const imagePath = args[0] || path.join(__dirname, '..', 'public', 'uploads', 'calibration-images', 'sample.jpg');
  const baseUrl = args[1] || 'http://localhost:3000';
  const token = args[2] || '';

  if (!fs.existsSync(imagePath)) {
    console.error('Image not found:', imagePath);
    process.exit(1);
  }

  console.log('Using image:', imagePath);

  const form = new FormData();
  form.append('image', fs.createReadStream(imagePath));

  console.log('Posting to OCR endpoint...');
  const ocrRes = await fetch(`${baseUrl}/api/calibration/ocr`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form
  });

  const ocrJson = await ocrRes.json();
  console.log('OCR response:', JSON.stringify(ocrJson, null, 2));

  if (!ocrJson.success) {
    console.error('OCR failed or returned no data. Stop.');
    process.exit(2);
  }

  if (!ocrJson.injectorNumber) {
    console.warn('No injector number detected; you may want to edit before import.');
  }

  // Attempt import test (will create injector if missing)
  console.log('Posting to import endpoint...');
  const importRes = await fetch(`${baseUrl}/api/calibration/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ injectorNumber: ocrJson.injectorNumber || 'TEST-UNKNOWN', data: ocrJson.data })
  });

  const importJson = await importRes.json();
  console.log('Import response:', JSON.stringify(importJson, null, 2));

  if (importRes.ok) {
    console.log('✅ Import test succeeded');
  } else {
    console.error('❌ Import test failed');
    process.exit(3);
  }
}

main().catch((err) => {
  console.error('Test script error:', err);
  process.exit(99);
});
