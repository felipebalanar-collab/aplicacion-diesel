#!/usr/bin/env node
/**
 * Manual Electron App Packager - Simple executable creation
 * This creates a portable executable without electron-builder complexity
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const APP_NAME = 'BancoDePruebas';
const VERSION = '1.0.0';
const APP_DIR = process.cwd();
const BUILD_DIR = path.join(APP_DIR, '.next');
const DIST_DIR = path.join(APP_DIR, 'dist');
const ELECTRON_DIR = path.join(DIST_DIR, 'win-unpacked');
const APP_RESOURCES = path.join(ELECTRON_DIR, 'resources', 'app');

console.log('🔨 Starting manual Electron packaging...\n');

// 1. Ensure .next build exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Error: .next build directory not found. Run "npm run build" first.');
  process.exit(1);
}

console.log('✅ Found Next.js build');

// 2. Create distribution directories
console.log('📁 Creating distribution directories...');
if (fs.existsSync(DIST_DIR)) {
  // Use Node.js to remove instead of PowerShell to avoid path issues
  const removeDir = (dir) => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          removeDir(fullPath);
        } else {
          fs.unlinkSync(fullPath);
        }
      });
      fs.rmdirSync(dir);
    }
  };
  removeDir(DIST_DIR);
}
fs.mkdirSync(ELECTRON_DIR, { recursive: true });
fs.mkdirSync(APP_RESOURCES, { recursive: true });

console.log('✅ Created distribution structure');

// 3. Copy necessary files
console.log('📋 Copying application files...');
const filesToCopy = [
  { src: 'electron-main.js', dest: path.join(ELECTRON_DIR, 'electron-main.js') },
  { src: 'package.json', dest: path.join(APP_RESOURCES, 'package.json') },
  { src: 'prisma', dest: path.join(APP_RESOURCES, 'prisma') },
  { src: '.next', dest: path.join(APP_RESOURCES, '.next') },
  { src: 'public', dest: path.join(APP_RESOURCES, 'public') },
  { src: 'node_modules', dest: path.join(APP_RESOURCES, 'node_modules') },
];

function copyRecursively(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  Skipping missing: ${src}`);
    return;
  }

  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      copyRecursively(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

filesToCopy.forEach(({ src, dest }) => {
  const srcPath = path.join(APP_DIR, src);
  try {
    copyRecursively(srcPath, dest);
    console.log(`  ✓ ${src}`);
  } catch (err) {
    console.warn(`  ⚠️  Could not copy ${src}: ${err.message}`);
  }
});

console.log('✅ Files copied');

// 4. Create minimal package.json for app resources
console.log('📝 Creating application configuration...');
const appPackage = {
  name: 'banco-de-pruebas',
  version: VERSION,
  private: true,
  type: 'commonjs',
  main: 'electron-main.js'
};

fs.writeFileSync(
  path.join(APP_RESOURCES, 'package.json'),
  JSON.stringify(appPackage, null, 2)
);

console.log('✅ Configuration created');

// 5. Create nsis installer configuration
console.log('⚙️  Creating installer configuration...');
const nsisConfig = `
!include "MUI2.nsh"

; Installer attributes
Name "BancoDePruebas"
OutFile "..\\BancoDePruebas-${VERSION}-installer.exe"
InstallDir "$PROGRAMFILES\\BancoDePruebas"

; Pages
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_LANGUAGE "Spanish"

; Installer sections
Section "Install"
  SetOutPath "$INSTDIR"
  File /r "win-unpacked\\*.*"
  CreateShortCut "$SMPROGRAMS\\BancoDePruebas.lnk" "$INSTDIR\\BancoDePruebas.exe"
  CreateShortCut "$DESKTOP\\BancoDePruebas.lnk" "$INSTDIR\\BancoDePruebas.exe"
SectionEnd

; Uninstaller section
Section "Uninstall"
  Delete "$DESKTOP\\BancoDePruebas.lnk"
  Delete "$SMPROGRAMS\\BancoDePruebas.lnk"
  RMDir /r "$INSTDIR"
SectionEnd
`;

fs.writeFileSync(path.join(DIST_DIR, 'installer.nsi'), nsisConfig);
console.log('✅ Installer configuration created');

console.log('\n✨ Packaging complete!');
console.log(`📦 Portable app created at: ${ELECTRON_DIR}`);
console.log(`💾 NSIS installer config: ${path.join(DIST_DIR, 'installer.nsi')}`);
console.log('\nNext steps:');
console.log('1. Ensure Electron portable executable is available');
console.log('2. Copy electron.exe to the dist directory');
console.log('3. Run the application with: .\\dist\\win-unpacked\\BancoDePruebas.exe');
