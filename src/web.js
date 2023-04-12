// just playing with a different export style
/* eslint-disable one-var */
export const
    $  = (selector, parent = document) => parent.querySelector(selector),

    $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),

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

    onMutation = fn => new MutationObserver(fn)
        .observe(document.body, { childList: true, subtree: true });
