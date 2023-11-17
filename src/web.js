// just playing with a different export style
/* eslint-disable one-var */
export const
    $ = (selector, parent = document) => parent.querySelector(selector),

    $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),
    // $$1 = (selector, parent = document) => Array.from(parent.querySelectorAll(selector)), // alias to overcome FF bug

    // insertAdjacentHTML, innerHTML can't use because unsafe:
    el = (name, attrs) => {
        var $e = document.createElement(name);

        for (let prop in attrs) {
            $e.setAttribute(prop, attrs[prop]);
        }

        return $e;
    },

    el2 = str => {
        const element = new DOMParser().parseFromString(str, 'text/html');
        const child = element.documentElement.querySelector('body').firstChild;
        return child;
    },

    el3 = (name, attrs) => Object.assign(document.createElement(name), attrs),

    loadFromSession = key => JSON.parse(sessionStorage.getItem(key)),

    saveToSession = (key, object) => sessionStorage.setItem(key, JSON.stringify(object)),

    style = (styles, id = 'style') => Object.assign(el('style', { type: 'text/css', id }), { textContent: styles }),

    addStyle = (styles, id) => document.body.append(style(styles, id)),

    updateState = (state, newState, value) => {
        if (newState[value] !== undefined && newState[value] !== state[value]) {
            state[value] = newState[value];
            return true;
        }
        return false;
    },

    updateDom = (selector, updateFn) => {
        const element = $(selector);
        if (element) updateFn(element);
    },

    switchStyle = styles => {
        const keys = Object.keys(styles);
        const styleA = $(`#${keys[0]}Style`);

        if (styleA) {
            styleA.remove();
            addStyle(styles[keys[1]], `${keys[1]}Style`);
        } else {
            const styleB = $(`#${keys[1]}Style`);
            styleB && styleB.remove();
            addStyle(styles[keys[0]], `${keys[0]}Style`);
        }
    },

    toggleStyle = style => {
        const key = Object.keys(style)[0];
        const styleA = $(`#${key}Style`);

        if (styleA) {
            styleA.remove();
        } else {
            addStyle(style[key], `${key}Style`);
        }
    },

    toBase64 = svg => `data:image/svg+xml;base64,${window.btoa(svg)}`,

    toSearchable = string => string
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, ''),

    isBrazil = () => window.location.hostname.endsWith('.br'),

    waitForEl = selector => new Promise(resolve => {
        if ($(selector)) return resolve($(selector));

        const observer = new MutationObserver(() => {
            if (!$(selector)) return;

            resolve($(selector));
            observer.disconnect();
        })

        observer.observe(document.documentElement, { childList: true, subtree: true });
        return observer;
    }),

    onMutation = (fn, parent = document.body) => new MutationObserver(fn)
        .observe(parent, { childList: true, subtree: true }),

    onChildrenChanged = (fn, parent = document.body) => new MutationObserver(fn)      // we don't need to know about attributes, this is jsut to prevent recursive behavior when adding children to this element
        .observe(parent, { attributes: true }),

    onEnter = fn => event => event.key === 'Enter' && fn(event),

    download = (content, filename) => {
        const a = document.createElement('a');
        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        a.click();
    },

    upload = () => new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => resolve(readerEvent.target.result);

            reader.onerror = event => {
                console.error(event, `Error occurred reading file: ${file.name}`);
                reject(`Error occurred reading file: ${file.name}`);
            }
        };

        input.click();
    }),

    createLink = (parent, onclick, attrs) => {
        const link = el3('div', attrs);
        link.addEventListener('click', onclick, false);
        parent.append(link);
        return link;
    };
