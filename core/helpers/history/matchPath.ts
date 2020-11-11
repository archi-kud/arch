import { pathToRegexp } from 'path-to-regexp';
import { Match } from '@core/helpers/history';

const cache: Record<any, any> = {};
const cacheLimit = 10000;

let cacheCount = 0;

function compilePath(path: any, options: any) {
    const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
    const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

    if (pathCache[path]) return pathCache[path];

    const keys: any[] = [];
    const regexp = pathToRegexp(path, keys, options);
    const result = { regexp, keys };

    if (cacheCount < cacheLimit) {
        pathCache[path] = result;
        cacheCount++;
    }

    return result;
}

function matchPath(pathname: any, options: any = {}): Match | null {
    if (typeof options === "string" || Array.isArray(options)) {
        options = { path: options };
    }

    const { path, exact = false, strict = false, sensitive = false } = options;

    const paths = [].concat(path);

    return paths.reduce((matched: any, path) => {
        if (!path && path !== "") return null;
        if (matched) return matched;

        const { regexp, keys } = compilePath(path, {
            end: exact,
            strict,
            sensitive
        });

        const match = regexp.exec(pathname);

        if (!match) return null;

        const [url, ...values] = match;
        const isExact = pathname === url;

        if (exact && !isExact) return null;

        return {
            path,
            url: path === "/" && url === "" ? "/" : url,
            isExact,
            params: keys.reduce((memo: any, key: any, index: any) => {
                memo[key.name] = values[index];
                return memo;
            }, {})
        };
    }, null);
}

export default matchPath;