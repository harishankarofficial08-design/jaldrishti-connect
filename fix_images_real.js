const fs = require('fs');

const REAL_IMAGES = [
    "assets/real1.jpg.jpeg",
    "assets/real2.jpg.jpeg",
    "assets/real3.jpg.jpeg",
    "assets/real4.jpg.jpeg",
    "assets/real5.jpg.jpeg",
    "assets/real6.jpg.jpeg",
    "assets/real7.jpg.jpeg",
    "assets/real8.jpg.jpeg"
];

function processFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    let idx = 0;
    content = content.replace(/photo:\s*"[^"]+"/g, (match) => {
        let url = REAL_IMAGES[idx % REAL_IMAGES.length];
        idx++;
        return `photo: "${url}"`;
    });
    
    fs.writeFileSync(filename, content);
}

processFile('landing-v2.js');
processFile('admin/dashboard-v5.js');
console.log('Done mapping real images');
