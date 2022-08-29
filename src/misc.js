import { inspect } from 'util';

const bold     = msg => `\x1b[30;1m${msg}\x1b[0m`;
const green    = msg => `\x1b[32m${msg}\x1b[0m`;
const greenBg  = msg => `\x1b[42m${msg}\x1b[0m`;
const red      = msg => `\x1b[31m${msg}\x1b[0m`;
const redBg    = msg => `\x1b[37;41m${msg}\x1b[0m`;
const purple   = msg => `\x1b[35m${msg}\x1b[0m`;
const dim      = msg => `\x1b[2m${ msg}\x1b[0m`;

// taken from [Eric Ellitot](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
export const asyncPipe = (...fns) => x => (fns.reduce(async (y, f) => f(await y), x));

export const split = value => value ? value.split(' ') : [];
// const toObject = arr => (o = {}, [o.register, o.date, o.startTime, o.endTime, o.occurrenceCode] = arr, o);

// used in dxest
export const stringify = o => inspect(o, { compact: false, depth: Infinity, maxArrayLength: Infinity, breakLength: 120, sorted: true });