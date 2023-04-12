import { inspect } from 'util';

// this is a repository for code ideas, unused code may appear, a bundler will delete this on demand
/* eslint-disable no-unused-vars */

const bold     = msg => `\x1b[30;1m${msg}\x1b[0m`;
const green    = msg => `\x1b[32m${msg}\x1b[0m`;
const greenBg  = msg => `\x1b[42m${msg}\x1b[0m`;
const red      = msg => `\x1b[31m${msg}\x1b[0m`;
const redBg    = msg => `\x1b[37;41m${msg}\x1b[0m`;
const purple   = msg => `\x1b[35m${msg}\x1b[0m`;
const dim      = msg => `\x1b[2m${msg}\x1b[0m`;

// taken from [Eric Elliot](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
export const asyncPipe = (...fns) => x => (fns.reduce(async (y, f) => f(await y), x));

export const split = value => value ? value.split(' ') : [];
// const toObject = arr => (o = {}, [o.register, o.date, o.startTime, o.endTime, o.occurrenceCode] = arr, o);

// used in dxest
export const stringify = o => inspect(o, { compact: false, depth: Infinity, maxArrayLength: Infinity, breakLength: 120, sorted: true });

export const log = (header, obj) => process.stdout.write(`\n${bold(header)}\n` +
    inspect(obj, { depth: Infinity, maxArrayLength: Infinity, numericSeparator: true, colors: true })
    .replace(/[{}]/g, '')       // no curly
    .replace(/^ {2}/gm, '')     // unindent
    // .trim()
    .replace(/^\s*\n/gm, '')
    // .replace(/^\s*\n/gm, '')
     + '\n'); // no empty lines

// export const replaceLast = (string, needle, haystack) => .replace(/(,)(?!.*\1)/, ' at')

// 'Mar 8, 2018 at 17:49'
export const prettyDate = date =>
    date.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric", hour12: false}).replace(/(,)(?!.*\1)/, ' at')

export const isoishDate = date =>
    date.toISOString().substring(0, 16).replace('T', ' ') + 'Z';

// export const { flow, N, D, A } = require('@mobily/ts-belt');
// export { N, D, A } from '@mobily/ts-belt';

// TODO import from ts-belt when it's working
// export function memoize(fn) {
//     var lastResult = {
//       contents: void 0
//     };
//     return function(...restArgs) {
//       var result = lastResult.contents;
//       if (result !== void 0) {
//         return valFromOption(result);
//       }
//       var result$1 = fn(...restArgs);
//       lastResult.contents = some(result$1);
//       return result$1;
//     };
//   }

export const memoize = fn => {
    const cache = {};
    return x => cache[x] ?? (cache[x] = fn(x));
};
// export const memoize = () => {
//     let cache = {};
//     return (n) => {
//     if (n in cache) {
//     console.log('Fetching from cache');
//     return cache[n];
//     }
//     else {
//     console.log('Calculating result');
//     let result = n + 10;
//     cache[n] = result;
//     return result;
//     }
//     }
//     }

// const stringify = o => {
//     const formatter = new Formatter();
//     formatter.maxInlineLength = 120;
//     return formatter.serialize(o).replace(/"/g, "");
// };
