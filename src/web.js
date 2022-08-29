// just playing with a different export style
/* eslint-disable one-var */
export const
    $  = (selector, parent = document) => parent.querySelector(selector),

    $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),

    el = (name, attrs) => Object.assign(document.createElement(name), attrs),

    toBase64 = svg => `data:image/svg+xml;base64,${window.btoa(svg)}`,

    toSearcheable = string => string
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, ''),

    isBrazil = () => window.location.hostname.endsWith('.br');
