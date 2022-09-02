# Utils

Useful functions for my personal projects

> **Everybody should have a shared utils project!** See [why](#why).

## Install
`npm i @icetbr/utils`

### Local (recommended)
`npm i ../utils`

generates
```json
    "dependencies": {
        "@icetbr/utils": "file:../utils"
    }
```

Note that the "linked" project must have a `package.json` with a `name`. If the code is inside `src`, it also needs `"main": "src"`.

## Usage
```js
import { $, $$, el, toBase64, toSearcheable, isBrazil } from '@icetbr/utils/web';
```


## Why
For **learning** and to a minor degree, **efficiency**. No reinvention of the wheel intended.

You may priorize known libraries, like [lodash](https://lodash.com), but for everything you don't know where to find, and keep repeating yourself the same things, place them in a separate project.

### Advantages
- better than CTRL + C, CTRL + V
- every fix and addition you make is instantly available to all projects
- ctrl + click takes to the source code, and you can quickly add/fix whatever you need
- easy to switch to a tagged release before publishing, or use a bundler like [rollup](https://rollupjs.org)
- encourages contribution to the community as any of your `utils` functions may become a **library** by itself!

### Learning
I use a minimal implemention that suits my current problem. When they become insufficient or present a bug, I **study the reasons** and look online for solutions, usualy exploring the source code of other npm libraries.


### Efficiency
The minimal code also helps with **performance** and reduces **cognitive load** when trying to analyze the source code.

This package is meant to be used with **tree shaking** or some automatic copy/pasting perhaps, if size is really an issue.
