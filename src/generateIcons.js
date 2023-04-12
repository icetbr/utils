import sharp from 'sharp';
import fs from 'fs';
const all = Promise.all.bind(Promise);

const resize = (image, outDir) => size =>
    sharp(image)
    .png({ compressionLevel: 9 })
    .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(`${outDir}/${size}.png`);

export const generateIcons = ({ imagePath, outDir, sizes }) => {
    const icon = fs.readFileSync(imagePath);
    fs.mkdirSync(outDir, { recursive: true });
    return all(sizes.map(resize(icon, outDir)));
    // return 'ICONS GENERATED';
};
// export const resize = async (iconPath, outDir, sizes) => {
//     const icon = fs.readFileSync(iconPath);
//     fs.mkdirSync(outDir, { recursive: true });
//     all(sizes.map(resizeTo(icon)))
//     for (const size of [16, 32, 48, 96, 128]) {
//         await generate(icon, size, `${outDir}/${size}.png`);
//     }
// };

// export const resizeToManifestIcons = async () => {
//     const icon = fs.readFileSync('./media/icon.svg');
//     const outDir = 'media/icons';

//     if (!fs.existsSync(outDir)) {
//         fs.mkdirSync(outDir, { recursive: true });
//     }

//     Promise.all([16, 32, 48, 96, 128].map(generate(icon)))
//     for (const size of [16, 32, 48, 96, 128]) {
//         await generate(icon, size, `${outDir}/${size}.png`);
//     }
// };
