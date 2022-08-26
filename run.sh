#!/bin/bash

createTypes () { npx -p typescript tsc src/* --declaration --allowJs --emitDeclarationOnly --outDir types ;}
test        () { mocha --inline-diffs --bail --leaks --reporter min -r chai/register-expect.js ;}
testi       () { mocha --inline-diffs --bail --leaks --reporter min -r chai/register-expect.js --inspect-brk=9231 ;}

"$@"
