import fs from 'fs';

const keys = o => o ? Object.keys(o) : [];

export const listPackagesNames = toFile => {
    const { dependencies, devDependencies } = JSON.parse(fs.readFileSync('./package.json'));
    const packages = keys(dependencies).concat(keys(devDependencies));
    const packagesNames = packages.reduce((acc, p) => [...acc, ...p.replace('@', '').split('/')] , []);
    fs.writeFileSync(toFile, packagesNames.join('\n'));
};
