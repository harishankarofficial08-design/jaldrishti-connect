const fs = require('fs');

function processFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    let i = 0;
    
    // Replace logic: We match the category and the photo line.
    content = content.replace(/category:\s*"([^"]+)"([\s\S]*?)photo:\s*"[^"]+"/g, (match, category, middle) => {
        i++;
        // Create a simple keyword from the category
        let keyword = 'pollution';
        const catLower = category.toLowerCase();
        
        if (catLower.includes('chemical') || catLower.includes('effluent')) keyword = 'chemical';
        else if (catLower.includes('garbage') || catLower.includes('waste')) keyword = 'garbage';
        else if (catLower.includes('water') || catLower.includes('sewage')) keyword = 'sewage';
        else if (catLower.includes('fish') || catLower.includes('lake')) keyword = 'deadfish,lake';
        else if (catLower.includes('dust') || catLower.includes('smoke') || catLower.includes('air')) keyword = 'smog';
        else if (catLower.includes('tree') || catLower.includes('wetland')) keyword = 'deforestation';
        else if (catLower.includes('plastic')) keyword = 'plastic,trash';
        
        return `category: "${category}"${middle}photo: "https://loremflickr.com/400/250/${keyword}?lock=${i}"`;
    });
    
    fs.writeFileSync(filename, content);
}

processFile('landing-v2.js');
processFile('admin/dashboard-v5.js');
console.log('Done');
