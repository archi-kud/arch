import { Location, State } from 'history';

type SearchType = Record<string, string | null>;

function getUpdatedSearchParams(location: Location<State>, search: SearchType = {}, force: boolean = false): URLSearchParams {
    const currentSearch = force ? '' : location.search;
    const params = new URLSearchParams(currentSearch);

    for (let name in search) {
        const value = search[name];

        if (value === null) {
            params.delete(name);
        } else {
            params.set(name, value);
        }
    }

    return params;
}

export default getUpdatedSearchParams;