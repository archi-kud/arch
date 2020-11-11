import SearchDTO from '@core/modules/Search/SearchDTO';

interface ISearchStore {
    searches: SearchDTO[];
    query: string;
    prevQuery: string;
    currentQuery: string;

    updateSearches: (searches: SearchDTO[]) => void;
    updateQuery: (query: string) => void;
    updateCurrentQuery: (currentQuery: string) => void;
}

export default ISearchStore;