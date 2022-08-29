import fs from 'fs';
import { inspect } from 'util';

const bold     = msg => `\x1b[1m${msg}\x1b[0m`;

// const stringify = o => inspect(o, { compact: true, depth: Infinity, maxArrayLength: Infinity, breakLength: 120, sorted: true });
const log = (header, obj) => process.stdout.write(`\n${bold(header)}\n` +
    inspect(obj, { depth: Infinity, maxArrayLength: Infinity, numericSeparator: true, colors: true })
    .replace(/[{}]/g, '')       // no curly
    .replace(/^ {2}/gm, '')
    // .trim()
    .replace(/^\s*\n/gm, '')
    // .replace(/^\s*\n/gm, '')
     + '\n'); // no emty lines

/**
 * @example
 * parseOwnerRepo('icetbr/utils');
 * parseOwnerRepo('github:icetbr/utils');
 * parseOwnerRepo({ url: 'https://github.com/icetbr/utils.git' });
 */
const parseOwnerRepo = repository =>
    typeof repository === 'string'
        ? repository.replace('github:', '')
        : repository.url.replace('.git', '').split('/').slice(-2).join('/')

/** Syncs `description`/`keywords` from `package.json` to Github's **description/topics** sections and README.md first line */
export const syncMetadata = async (has_projects = false, has_wiki = false) => {
    if (!process.env.GITHUB_TOKEN) throw new Error('Misssing environment variable GITHUB_TOKEN');

    const { repository, description, keywords } = JSON.parse(fs.readFileSync('./package.json'));
    const baseUrl = `https://api.github.com/repos/${parseOwnerRepo(repository)}`;

    log('syncing', { baseUrl, description, keywords });

    const readme = fs.readFileSync('./README.md', 'utf8');
    const newReadme = readme.split('\n');
    newReadme[2] = description;
    fs.writeFileSync('./README.md', newReadme.join('\n'));

    const headers = {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json', // specifiying the version in Accept is recommended
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
        body: JSON.stringify({ names: keywords }),
    });
    if (result2.status !== 200) throw new Error(result2.statusText);
};

// await syncMetadata();
// for more advanced tool, see MRM