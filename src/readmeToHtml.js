import nmd from 'nano-markdown';

export const readmeToHtml = () =>
    nmd(fs.readFileSync('./README.md', 'utf8').toString()).
    replaceAll('<p>', '').
    replaceAll('</p>', '').
    replaceAll('<h2>', '<b>').
    replaceAll('</h2>', '</b>').
    replaceAll('<h3>', '<b>').
    replaceAll('</h3>', '</b>')

// export const readmeToChrome = () =>
//     fs.readFileSync('./README.md', 'utf8').
//     toString().
//     replaceAll('- ', '• ').
//     replace(/**(.+)**/mg, '$1.uppercase()').
//     replaceAll('<h2>', IDEM ACIMA).
//     replaceAll('</h2>', '</b>').
//     replaceAll('<h3>', '<b>').
//     replaceAll('</h3>', '</b>')
// );
// •
