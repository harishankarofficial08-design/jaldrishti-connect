const fs = require('fs');

const IMAGES = {
    chemical: "https://images.unsplash.com/photo-1611273426858-450d87f9d509?auto=format&fit=crop&q=80&w=400",
    garbage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
    sewage: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=400",
    deforestation: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400",
    lake: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=400"
};

function processFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    
    content = content.replace(/category:\s*"([^"]+)"([\s\S]*?)photo:\s*"[^"]+"/g, (match, category, middle) => {
        let catLower = category.toLowerCase();
        let url = IMAGES.lake;
        
        if (catLower.includes('chemical') || catLower.includes('effluent') || catLower.includes('smoke') || catLower.includes('odor') || catLower.includes('dust')) {
            url = IMAGES.chemical;
        } else if (catLower.includes('garbage') || catLower.includes('waste') || catLower.includes('plastic')) {
            url = IMAGES.garbage;
        } else if (catLower.includes('water') || catLower.includes('sewage') || catLower.includes('discharge')) {
            url = IMAGES.sewage;
        } else if (catLower.includes('tree') || catLower.includes('wetland')) {
            url = IMAGES.deforestation;
        }
        
        return `category: "${category}"${middle}photo: "${url}"`;
    });
    
    fs.writeFileSync(filename, content);
}

processFile('landing-v2.js');
processFile('admin/dashboard-v5.js');
console.log('Done');
