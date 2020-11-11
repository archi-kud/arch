import SearchDTO from '@core/modules/Search/SearchDTO';
import ISearchRepository from '@core/modules/Search/repositories/ISearchRepository';

import { randomNumber } from '@core/helpers/common';

class MockSearchRepository implements ISearchRepository {
    public async getSearches(query: string): Promise<SearchDTO[]> {
        if (query === '') {
            return [];
        }

        const searches: SearchDTO[] = [];
        const count = randomNumber(0, 20);
        
        for (let i = 0; i < count; i++) {
            const search: SearchDTO = {
                id: `${i}`,
                name: `${query} ${i}`
            };

            searches.push(search);
        }

        return searches;
    }
}

export default MockSearchRepository;