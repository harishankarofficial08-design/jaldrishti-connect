const fs = require('fs');
let content = fs.readFileSync('landing-v2.js', 'utf8');
let i = 0;
content = content.replace(/photo:\s*\"https:\/\/picsum\.photos[^\"]+\"/g, () => {
    i++;
    return 'photo: "https://picsum.photos/seed/jd' + i + '/400/250"';
});
fs.writeFileSync('landing-v2.js', content);
console.log('Done');
