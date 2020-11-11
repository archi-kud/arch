import SearchDTO from '@core/modules/Search/SearchDTO';
import ISearchStore from '@core/modules/Search/store/ISearchStore';

class SearchStore implements ISearchStore {
    public searches: SearchDTO[] = [];
    public query: string = '';
    public prevQuery: string = '';
    public currentQuery: string = '';

    updateSearches(searches: SearchDTO[]): void {
        this.searches = searches;
    }

    updateQuery(query: string): void {
        this.prevQuery = this.query;
        this.query = query;
    }

    updateCurrentQuery(currentQuery: string): void {
        this.currentQuery = currentQuery;
    }
}

export default SearchStore;