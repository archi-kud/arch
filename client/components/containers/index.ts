import CtnrContainer from '@components/containers/Container/Container';
import CtnrHeader from '@components/containers/Header/Header';
import CtnrSearch from '@components/containers/Search/Search';
import CtnrSearchHeader from '@components/containers/Search/SearchHeader/SearchHeader';
import CtnrSearchList from '@components/containers/Search/SearchList/SearchList';
import CtnrLayout from '@components/containers/Layout/Layout';
import CtnrBottomMenu from '@components/containers/BottomMenu/BottomMenu';

customElements.define('ctnr-container', CtnrContainer);
customElements.define('ctnr-header', CtnrHeader, { extends: 'header' });
customElements.define('ctnr-search', CtnrSearch);
customElements.define('ctnr-search-header', CtnrSearchHeader);
customElements.define('ctnr-search-list', CtnrSearchList, { extends: 'ul' });
customElements.define('ctnr-layout', CtnrLayout, { extends: 'main' });
customElements.define('ctnr-bottom-menu', CtnrBottomMenu, { extends: 'div' });

export {
    CtnrContainer,
    CtnrHeader,
    CtnrSearch,
    CtnrSearchHeader,
    CtnrSearchList,
    CtnrLayout,
    CtnrBottomMenu
};