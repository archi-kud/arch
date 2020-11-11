import { Location, State } from 'history';

import { convertSearchParamsToObject, history, matchPath } from '@core/helpers/history';

type Match = {
    url: string;
    path: string;
    isExact: boolean;
    params: Record<string, string | undefined>;
    search: Record<string, string>;
};

const cache: Record<string, Match> = {};

function watchMatch(callback: (match: Match) => void, ): void {
    setTimeout(() => onHistoryChange(history.location), 0);

    history.listen(update => onHistoryChange(update.location));

    function onHistoryChange(location: Location<State>) {
        const { pathname, search } = location;
        
        const path = `${pathname}${search}`;
        const cacheMatch = cache[path];

        if (cacheMatch) {
            callback(cacheMatch);
        } else {
            const escapedReg = /([.+*?=^!:${}()[\]|/\\])/g;
            const escapedPath = pathname && pathname.replace(escapedReg, '\\$1');

            const match = matchPath(pathname, escapedPath);
            const params = new URLSearchParams(search);
            const searchObject = convertSearchParamsToObject(params);

            if (match) {
                const fullMatch = {
                    ...match,
                    search: searchObject
                }
                
                cache[path] = fullMatch;
        
                callback(fullMatch);
            }
        }
    }
}

export { watchMatch, Match };