import SearchDTO from '@core/modules/Search/SearchDTO';

interface ISearchUI {
    updateCurrentQuery: (currentQuery: string) => void;
    updateSearches: (searches: SearchDTO[]) => void;
    openSearch: () => void;
    closeSearch: () => void;
    onSearchingChange: (searhing: string) => void;
    onCurrentQueryChange: (currentQuery: string) => void;
}

export default ISearchUI;