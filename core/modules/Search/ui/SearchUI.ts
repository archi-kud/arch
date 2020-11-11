import SearchDTO from '@core/modules/Search/SearchDTO';
import ISearchUI from '@core/modules/Search/ui/ISearchUI';

import { getUpdatedSearchParams, history } from '@core/helpers/history';

import { CtnrSearch, CtnrSearchList } from '@client/components/containers';

class SearchUI implements ISearchUI {
    private search: CtnrSearch | null = null;
    private searchList: CtnrSearchList | null = null;

    public constructor() {
        this.search = document.querySelector('ctnr-search');
        this.searchList = document.querySelector('[is="ctnr-search-list"]');
    }

    public updateCurrentQuery(currentQuery: string): void {
        const search = { searching: null, query: currentQuery };
        const params = getUpdatedSearchParams(history.location, search);

        history.replace({
            pathname: '/results',
            search: `?${params}`
        });
    }

    public updateSearches(searches: SearchDTO[]): void {
        if (this.searchList) {
            this.searchList.renderSearches(searches);
        }
    }

    public openSearch(): void {
        const search = { searching: 'true' };
        const params = getUpdatedSearchParams(history.location, search);

        history.push({
            search: `?${params}`
        });
    }

    public closeSearch(): void {
        const search = { searching: null };
        const params = getUpdatedSearchParams(history.location, search);

        history.replace({
            search: params.values.length > 0 ? `?${params}` : ''
        });
    }

    public onSearchingChange(searhing: string): void {
        if (this.search) {
            this.search.updateSearching(searhing);
        }
    }

    public onCurrentQueryChange(currentQuery: string): void {
        if (this.search) {
            this.search.updateCurrentQuery(currentQuery);
        }
    }
}

export default SearchUI;