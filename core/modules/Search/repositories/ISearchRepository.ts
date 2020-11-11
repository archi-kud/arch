import SearchDTO from '@core/modules/Search/SearchDTO';

interface ISearchRepository {
    getSearches: (query: string) => Promise<SearchDTO[]>;
}

export default ISearchRepository;