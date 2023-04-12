import fs from 'fs';
import { log } from './misc.js';
import {encode} from 'html-entities';

const toFormData = object => Object.entries(object).reduce((d,e) => (d.append(...e),d), new FormData())

// "namespace": "https://github.com/icetbr/userscripts",
// "downloadURL": "https://openuserjs.org/src/scripts/icetbr/Shopee_Advanced_Search.user.js"
export const publish = async ({ user, repo, default_branch = 'master', path = 'scripts', pathname, pathext = '.user.js' } = {}) => {
    const { namespace, downloadURL } = JSON.parse(fs.readFileSync('./metablock.json'));
    user = user || namespace.split('/').at(-2);
    repo = repo || namespace.split('/').at(-1);
    pathname = pathname || downloadURL.split('/').at(-1).replace(pathext, '');
    path = `${path}/${pathname}${pathext}`;

    const repoInfo = { user, repo, default_branch, path, pathname, pathext };
    if (!(user && repo && default_branch && path && pathname && pathext)) throw new Error(`Required: ${repoInfo}`);

    log('publishing', { repoInfo });

    const result = await fetch(`https://openuserjs.org/users/${user}/github/import`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        // "referrer": "https://openuserjs.org/scripts/icetbr/Clearer_EffectiveAltruism.org_Forum/edit",
        "body": toFormData(repoInfo),
        "method": "POST",
        "mode": "cors"
    });

    const response = await result.text();
    if (response.includes('Enter your username')) throw new Error('Error authenticating');
    if (result?.status !== 200) throw new Error(result.statusText);

//     https://openuserjs.org
//     <form action="/users/icetbr/github/import" method="post" target="_blank">
//     <input type="hidden" name="user" value="icetbr">
//     <input type="hidden" name="repo" value="userscripts">
//     <input type="hidden" name="default_branch" value="master">
//     <input type="hidden" name="path" value="scripts/Clearer_EffectiveAltruism.org_Forum.user.js">
//     <input type="hidden" name="pathname" value="Clearer_EffectiveAltruism.org_Forum">
//     <input type="hidden" name="pathext" value=".user.js">
//     <button type="submit" class="btn btn-sm btn-success pull-right "><i class="octicon octicon-fw octicon-repo-clone"></i> Import

// </button></form>
}

const parseOwnerRepo = repository => (repository.url || repository).replace('https://github.com/', '');

// "namespace": "https://github.com/icetbr/userscripts",
// "downloadURL": "https://openuserjs.org/src/scripts/icetbr/Shopee_Advanced_Search.user.js"
// export const sync = async ({ user, default_branch = 'main', pathname, pathext = '.user.js', imgFolder = 'media' } = {}) => {
export const getReadme = ({ user, default_branch = 'main', pathname, pathext = '.user.js', imgFolder = 'media' } = {}) => {
    const { namespace, downloadURL } = JSON.parse(fs.readFileSync('./metablock.json'));
    user = user || namespace.split('/').at(-2);
    pathname = pathname || downloadURL.split('/').at(-1).replace(pathext, '');

    const { homepage_url: repository, description, browser_specific_settings: { keywords } } = JSON.parse(fs.readFileSync('./manifest.json'));
    const rawUrl = `https://raw.githubusercontent.com/${parseOwnerRepo(repository)}/${default_branch}`;

    const repoInfo = { user, pathname, pathext, rawUrl, imgFolder };
    if (!(user || pathname)) throw new Error(`Required: ${repoInfo}`);

    log('syncing', { repoInfo });
    const readme = fs.readFileSync('./README.md', 'utf8').toString();
    // const newReadme = readme.replaceAll(/${imgFolder}\//g, `${rawUrl}/${imgFolder}/` )
    const newReadme = readme.replace(new RegExp(`${imgFolder}/`, 'g'), `${rawUrl}/${imgFolder}/` )
    return newReadme;
    // log('syncing', newReadme);

    const body = new URLSearchParams();
    body.append('about', newReadme);



    // log('syncing', a.toString());
    // log('syncing', encodeURIComponent(readme));

    // log('syncing', body.toString());
    // return
    // log('syncing', encode(readme, { mode: 'extensive'}));
    // log('syncing', encodeURI(readme));
    // log('syncing', readme);

    // https://raw.githubusercontent.com/icetbr/webext-clearer-effective-altruism-org-forum/main/media/before.png
    // https://raw.githubusercontent.com/icetbr/webext-clearer-effective-altruism-org-forum/main/media/after.png





    // const result = await fetch(`https://openuserjs.org/scripts/${user}/${pathname}/edit`, {
    //     "credentials": "include",
    //     "headers": {
    //         "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0",
    //         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    //         "Accept-Language": "en-US,en;q=0.5",
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Upgrade-Insecure-Requests": "1",
    //         "Sec-Fetch-Dest": "document",
    //         "Sec-Fetch-Mode": "navigate",
    //         "Sec-Fetch-Site": "same-origin",
    //         "Sec-Fetch-User": "?1"
    //     },
    //     // "referrer": "https://openuserjs.org/scripts/icetbr/Clearer_EffectiveAltruism.org_Forum/edit",
    //     // "body": "about=%23+Clearer+EffectiveAltruism.org+Forum%0D%0AMore+familiar%2C+clean+and+compact+forum+UX%2C+with+an+improved+topics+organization.%0D%0A%0D%0A%23%23+Before%0D%0A%21%5BBefore%5D%28https%3A%2F%2Fraw.githubusercontent.com%2Ficetbr%2Fwebext-clearer-effective-altruism-org-forum%2Fmain%2Fmedia%2Fbefore.png%29%0D%0A%0D%0A%23%23+After%0D%0A%21%5BAfter%5D%28https%3A%2F%2Fraw.githubusercontent.com%2Ficetbr%2Fwebext-clearer-effective-altruism-org-forum%2Fmain%2Fmedia%2Fafter.png%29%0D%0A%0D%0A%23%23+After+%28original+font%29%0D%0A%21%5BAfter%5D%28media%2Fafter_original_font.png%29%0D%0A%0D%0A%23%23+Install%0D%0A%5BUserscript%5D%5B1%5D%0D%0A%0D%0AIncoming%3A+Firefox%2C+Chrome%0D%0A%0D%0A%0D%0A%23%23+Why%0D%0AThe+design+of+https%3A%2F%2Fforum.effectivealtruism.org+is+very+different+from+other+popular+online+communities.+This+makes+for+an+awkward+first+impression%2C+users+like+familiarity+in+their+UI.%0D%0A%0D%0A-+compact+layout%0D%0A-+less+clutter+through+hiding%2C+repositioning%2C+styling%2C+collapsing%0D%0A-+no+gray+backgrounds+with+%22gray%22ish+fonts%0D%0A-+no+title+trimming%2C+breaking+a+line+when+needed%0D%0A-+easier+topics+navigation+%28TODO%29%0D%0A-+less+annoying+popups+%28WIP%29&groups=",
    //     "body": body.toString(),
    //     "method": "POST",
    //     "mode": "cors"
    // });

    // if (result.status !== 200) throw new Error(result.statusText);
    // const text = await result.text();
    // if (text.includes('Enter your username for our site to use with your preferred')) throw new Error('Login failed');
    // // log(text);
}
