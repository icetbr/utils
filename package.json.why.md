- fields are ordered by importance, description comes first
- anything bellow the dotted line is used for app purposes

| FIELD       | REASON            |
| ----------- | ----------------- |
| description | github, readme    |
| keywords    | github            |
| name        | npmjs             |
| version     | npmjs             |
| repository  | npmjs, githubSync |
| author      | npmjs             |
| license     | npmjs             |
| type        | esm               |
| exports     | npmjs             |
| files       | npmjs             |


## Clarifications

- **exports**: somewhat `types`, `typesVersions`, `main`
  - use `compilerOptions.moduleResolution: "NodeNext"` in `jsconfig.json` to benefit from `exports` (Go To Definition, types, jsdoc)
- **files**: what will be present in the published package, otherwise puts everything!
  - use `npm publish --dry-run` to preview the resulting package
- **scripts**: I favor run.sh, this section contains a reminder


<!-- https://stackoverflow.com/questions/58990498/new-package-json-exports-field-not-working-with-typescript -->