const fs = require('fs');
const path = require('path');

const cssFiles = ['styles.css', 'landing.css'];
const jsFiles = ['landing.js', 'admin/dashboard.js'];

// 1. Process CSS files
cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace dark navy colors with white/light gray
    content = content.replace(/rgba\((11,\s*18,\s*36|15,\s*23,\s*42|10,\s*16,\s*32|10,\s*16,\s*34|6,\s*10,\s*22|30,\s*41,\s*59|22,\s*32,\s*56)/g, 'rgba(255, 255, 255');
    
    // Replace white faint borders/backgrounds with black faint ones
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*(0\.0[0-9]|0\.1[0-9]?)\)/g, 'rgba(0, 0, 0, $1)');

    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
});

// 2. Process JS files for map tiles
jsFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/dark_all/g, 'light_all');
    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
});

// 3. Fix bubble color in landing.js
let landingJs = fs.readFileSync('landing.js', 'utf8');
landingJs = landingJs.replace(/fillStyle = `rgba\\(255, 255, 255, \\$\{this\.alpha\}\\)`/g, 'fillStyle = `rgba(14, 165, 233, ${this.alpha})`');
fs.writeFileSync('landing.js', landingJs);
console.log('Fixed bubbles in landing.js');
