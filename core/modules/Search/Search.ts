import SearchDTO from '@core/modules/Search/SearchDTO';
import ISearchRepository from '@core/modules/Search/repositories/ISearchRepository';
import ISearchUI from '@core/modules/Search/ui/ISearchUI';
import ISearchStore from '@core/modules/Search/store/ISearchStore';

import { watchMatch } from '@core/helpers/history';

type ConstructorData = {
    repository: ISearchRepository;
    ui: ISearchUI;
    store: ISearchStore;
};

class Search {
    private repository: ISearchRepository;
    private ui: ISearchUI;
    private store: ISearchStore;

    public constructor(data: ConstructorData) {
        const { repository, ui, store } = data;

        this.repository = repository;
        this.ui = ui;
        this.store = store;

        this.initHistoryWatch();
    }

    public async fetchSearches(query: string): Promise<SearchDTO[]> {
        const searches = await this.repository.getSearches(query);
        
        this.store.updateSearches(searches);
        this.ui.updateSearches(this.store.searches);

        return searches;
    }

    public updateCurrentQuery(): void {
        const { query } = this.store;

        if (query !== '') {
            this.store.updateCurrentQuery(query);
            this.ui.updateCurrentQuery(this.store.currentQuery);
        }
    }

    public updateQuery(newQuery: string): void {
        this.store.updateQuery(newQuery);

        const { query, prevQuery } = this.store;

        if (query !== prevQuery) {
            this.fetchSearches(query);
        }
    }

    public openSearch(): void {
        this.ui.openSearch();
    }

    public closeSearch(): void {
        this.ui.closeSearch();
    }

    private onSearchingChange(searhing: string): void {
        this.ui.onSearchingChange(searhing);
    }

    private onCurrentQueryChange(currentQuery: string = ''): void {
        this.store.updateCurrentQuery(currentQuery);
        this.ui.onCurrentQueryChange(currentQuery);
    }

    private initHistoryWatch(): void {
        watchMatch(match => {
            const { search } = match;
            const { searching, query } = search;

            this.onSearchingChange(searching);
            this.onCurrentQueryChange(query);
        });
    }
}

export default Search;