import { Location, State } from 'history';

import { getUpdatedSearchParams } from '@core/helpers/history';

type SearchType = Record<string, string>;

function getPathWithSearchParams(location: Location<State>, search: SearchType, force?: boolean): string {
    const { pathname } = location;

    const params = getUpdatedSearchParams(location, search, force);

    return params.toString() !== '' ? `${pathname}?${params}` : pathname;
}

export default getPathWithSearchParams;