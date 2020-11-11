import { Search } from '@core/modules';

import { UIIcon } from '@components/ui';

import './Header.scss';

class CtnrHeader extends HTMLElement {
    private searchIcon: UIIcon | null = null;

    public constructor() {
        super();

        this.openSearch = this.openSearch.bind(this);

        this.initSearchIcon();
    }

    private initSearchIcon(): void {
        this.searchIcon = this.querySelector('ui-icon[name="search"]');

        if (this.searchIcon) {
            this.searchIcon.addEventListener('click', this.openSearch);
        }
    }

    private openSearch(): void {
        Search.openSearch();
    }
}

export default CtnrHeader;