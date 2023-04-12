import fs from 'fs';
import { log } from './misc.js';

const toKebab = word => word.replaceAll(' ', '-');

// parseOwnerRepo('icetbr/utils');
// parseOwnerRepo('github:icetbr/utils');
// parseOwnerRepo({ url: 'https://github.com/icetbr/utils.git' });
// console.log(parseOwnerRepo('https://github.com/icetbr/utils'));
const parseOwnerRepo = repository => (repository.url || repository).replace('https://github.com/', '');

// const parseOwnerRepo = repository =>
//     typeof repository === 'string'
//         ? repository.replace('github:', '').replace('https://github.com/', '')
//         : repository.url.replace('.git', '').split('/').slice(-2).join('/')

/** Syncs `description`/`keywords` from `package.json` to Github's **description/topics** sections and README.md first line */
export const syncMetadata = async (has_projects = false, has_wiki = false) => {
    if (!process.env.GITHUB_TOKEN) throw new Error('Missing environment variable GITHUB_TOKEN');

    let { repository, description, keywords } = JSON.parse(fs.readFileSync('./package.json'));
    if (!repository) {
        ({ homepage_url: repository, description, browser_specific_settings: { keywords } } = JSON.parse(fs.readFileSync('./manifest.json')));
    }

    if (!(repository || description || keywords)) throw new Error(`Required: ${{ repository, description, keywords }}`);

    const baseUrl = `https://api.github.com/repos/${parseOwnerRepo(repository)}`;
    log('syncing', { baseUrl, description, keywords });

    const readme = fs.readFileSync('./README.md', 'utf8');
    const newReadme = readme.split('\n');
    if (newReadme[1].trim()) {
        newReadme[1] = description;
    } else {
        newReadme[2] = description;
    }

    fs.writeFileSync('./README.md', newReadme.join('\n'));

    const headers = {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json', // specifying the version in Accept is recommended
    };

    const result = await fetch(`${baseUrl}`, {
        headers,
        method: 'PATCH',
        // body: `{"description":"${get(json, config.descriptionField)}", "has_projects": ${config.has_projects}, "has_wiki": ${config.has_wiki} }`
        body: JSON.stringify({ description, has_projects, has_wiki }),
    });
    if (result.status !== 200) throw new Error(result.statusText);

    const result2 = await fetch(`${baseUrl}/topics`, {
        headers,
        method: 'PUT',
        body: JSON.stringify({ names: keywords.map(toKebab) }),
    });
    if (result2.status !== 200) throw new Error(result2.statusText);
};
// for more advanced tool, see MRM
