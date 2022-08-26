// taken from [Eric Ellitot](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
export const asyncPipe = (...fns) => x => (fns.reduce(async (y, f) => f(await y), x));

export const split = value => value ? value.split(' ') : [];
// const toObject = arr => (o = {}, [o.register, o.date, o.startTime, o.endTime, o.occurrenceCode] = arr, o);
