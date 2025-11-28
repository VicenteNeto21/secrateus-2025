const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../assets/img/galeria');
const jsonPath = path.join(__dirname, '../assets/js/gallery.json');

const daysConfig = [
    { folder: 'dia_01', day: 26, label: 'Foto do dia 26' },
    { folder: 'dia_02', day: 27, label: 'Foto do dia 27' }
];

let data = [];
try {
    if (fs.existsSync(jsonPath)) {
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        data = JSON.parse(fileContent);
    }
} catch (err) {
    console.log('Error reading file, starting fresh.');
}

const existingSrcs = new Set(data.map(item => item.src));
let addedCount = 0;

daysConfig.forEach(config => {
    const dirPath = path.join(galleryDir, config.folder);

    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);

        files.forEach(filename => {
            if (filename.match(/\.(jpg|jpeg|png|gif)$/i)) {
                const src = `assets/img/galeria/${config.folder}/${filename}`;

                if (!existingSrcs.has(src)) {
                    data.push({
                        src: src,
                        alt: `${config.label} - ${filename}`,
                        span: "",
                        day: config.day
                    });
                    addedCount++;
                    existingSrcs.add(src); // Prevent duplicates if file appears twice in scan
                }
            }
        });
    } else {
        console.warn(`Directory not found: ${dirPath}`);
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Process complete. Added ${addedCount} new entries to gallery.json`);
