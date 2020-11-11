import Search from '@core/modules/Search/Search';
import SearchUI from '@core/modules/Search/ui/SearchUI';
import SearchStore from '@core/modules/Search/store/SearchStore';
// import SearchRepository from '@core/modules/repositories/SearchRepository';
import MockSearchRepository from '@core/modules/Search/repositories/MockSearchRepository';

const repository = new MockSearchRepository();
const ui = new SearchUI();
const store = new SearchStore();

const moduleData = {
    repository,
    ui,
    store
};

const search = new Search(moduleData);

export default search;