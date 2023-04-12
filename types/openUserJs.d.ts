export function publish({ user, repo, default_branch, path, pathname, pathext }?: {
    user: any;
    repo: any;
    default_branch?: string;
    path?: string;
    pathname: any;
    pathext?: string;
}): Promise<void>;
export function getReadme({ user, default_branch, pathname, pathext, imgFolder }?: {
    user: any;
    default_branch?: string;
    pathname: any;
    pathext?: string;
    imgFolder?: string;
}): any;
