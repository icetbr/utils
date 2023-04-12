import { marked } from 'marked';
import { readFileSync } from 'fs';
import child_process from 'child_process';

const read = jsonFilename => JSON.parse(fs.readFileSync(`./${jsonFilename}.json`));
const parseOwnerRepo = repository => (repository.url || repository).replace('https://github.com/', '');

export const openOpenuserReadme = ({ default_branch = 'main', imgFolder = 'media' } = {}) => {
    const { homepage_url } = read('manifest');
    const rawUrl = `https://raw.githubusercontent.com/${parseOwnerRepo(homepage_url)}/${default_branch}`;

    const readme = readFileSync('./README.md', 'utf8').toString();
    const newReadme = readme.replace(new RegExp(`${imgFolder}/`, 'g'), `${rawUrl}/${imgFolder}/` )

    child_process.exec(`echo "${newReadme}" | xclip -selection clipboard`);

    const { downloadURL } = read('metablock');
    const readmeUrl = downloadURL.replace('src/', '').replace('.user.js','');
    child_process.exec(`xdg-open ${readmeUrl}`);
    child_process.exec('wmctrl -a firefox');
    process.exit(1);
}

export const openFirefoxReadme = () => {
    const readme = fs.readFileSync('./README.md', 'utf8').toString()
    const newReadme = marked.parse(readme, { headerIds: false }).
        replaceAll('<p>', '').
        replaceAll('</p>', '').
        replaceAll('<h2>', '\n<b>').
        replaceAll('</h2>', '</b>').
        replaceAll('<h3>', '\n<b>').
        replaceAll('</h3>', '</b>');

    child_process.exec(`echo "${newReadme}" | xclip -selection clipboard`);

    const { browser_specific_settings: { addonIds } } = read('manifest');
    const isFirstRun = !addonIds?.[0];

    const readmeUrl = isFirstRun
        ? 'https://addons.mozilla.org/en-US/developers/addon/submit/upload-listed'
        : `https://addons.mozilla.org/en-US/developers/addon/${addonIds[0]}/edit`;

    child_process.exec(`xdg-open ${readmeUrl}`);
    child_process.exec('wmctrl -a firefox');
    process.exit(1);
}

export const openChromeReadme = () => {
    const readme = fs.readFileSync('./README.md', 'utf8').toString().
        replaceAll('- ', '• ').
        replace(/\*\*(.+)\*\*/mg, x => x.toUpperCase()).
        replace(/###\s(.+)/mg, x => x.toUpperCase()).
        replace(/##\s(.+)/mg, x => x.toUpperCase()).
        replaceAll('**', '').
        replaceAll('### ', '').
        replaceAll('## ', '')

    child_process.exec(`echo "${readme}" | xclip -selection clipboard`);

    // const { browser_specific_settings: { chromeAddonId } } = read('manifest');

    const readmeUrl = 'https://chrome.google.com/webstore/devconsole/c4ec6523-288c-42f0-a95d-3de279bccd4c';

    child_process.exec(`xdg-open ${readmeUrl}`);
    child_process.exec('wmctrl -a firefox');
    process.exit(1);
}

// chromeUploadUrl=https://chrome.google.com/webstore/devconsole/c4ec6523-288c-42f0-a95d-3de279bccd4c
// openuserReadmeUrl=https://openuserjs.org/scripts/icetbr/Google_Cleaner


// function pbcopy(data) {
//     var proc = require('child_process').spawn('pbcopy');
//     proc.stdin.write(data); proc.stdin.end();
// }


