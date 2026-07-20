const fs = require('fs');
let content = fs.readFileSync('admin/dashboard-v5.js', 'utf8');
let i = 0;
content = content.replace(/photo:\s*\"https:\/\/picsum\.photos[^\"]+\"/g, () => {
    i++;
    return 'photo: "https://picsum.photos/seed/jd_dash_' + i + '/400/250"';
});
fs.writeFileSync('admin/dashboard-v5.js', content);
console.log('Done');
