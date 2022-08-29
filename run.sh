#!/bin/bash

PATH=$PATH:node_modules/.bin
# . ./.env

# make variables from .env accessible to node
# the || condition is needed to circumvent files without empty last line
while read -r line || [[ -n "$line" ]]; do export "$line"; done < .env

_node () { NODE_NO_WARNINGS=1 node --experimental-fetch "$@" ;}
createTypes () { npx -p typescript tsc src/* --declaration --allowJs --emitDeclarationOnly --outDir types ;}
test        () { mocha --inline-diffs --bail --leaks --reporter min -r chai/register-expect.js ;}
testi       () { mocha --inline-diffs --bail --leaks --reporter min -r chai/register-expect.js --inspect-brk=9231 ;}
test2       () { _node src/deploy.js ;}
test2i       () { _node --inspect-brk=9231 src/deploy.js ;}

# updateGithub () {
#     description=grep -Po '"description":.*?[^\\]",' package.json
#     keywords=grep -Po '"keywords":.*?[^\\]",' package.json

#     curl \
#     -X PATCH \
#     -H "Accept: application/vnd.github+json" \
#     -H "Authorization: token $GITHUB_TOKEN" \
#     https://api.github.com/repos/icetbr/utils \
#     -d '{"description":"$description", "has_projects": false, "has_wiki": false }'

#     curl \
#     -X PUT \
#     -H "Accept: application/vnd.github+json" \
#     -H "Authorization: token $GITHUB_TOKEN" \
#     https://api.github.com/repos/OWNER/REPO/topics \
#     -d '{"names":$keywords}'
#     # -d '{"names":["octocat","atom","electron","api"]}'
# };

"$@"


# node -e "import('./src/deploy.js').then(m => m.x('da'))"