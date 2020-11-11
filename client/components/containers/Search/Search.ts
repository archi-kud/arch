import { Search } from '@core/modules';

import { getTemplateContent, htmlToNode } from '@core/helpers/dom';

import { CtnrSearchHeader } from '@components/containers';

import template from './Search.html';

class CtnrSearch extends HTMLElement {
    private root: ShadowRoot;
    private searchHeader: CtnrSearchHeader | null = null;

    public constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });

        this.onOutsideClick = this.onOutsideClick.bind(this);

        this.initialRender();
        this.afterInitialRender();
    }

    public updateCurrentQuery(currentQuery: string): void {
        if (this.searchHeader) {
            this.searchHeader.setAttribute('current-query', currentQuery);
        }
    }

    public updateSearching(searching: string): void {
        if (searching === 'true') {
            this.setOpenedAttribute('true');
        } else {
            this.setOpenedAttribute('false');
        }
    }

    private setOpenedAttribute(value: string): void {
        this.setAttribute('is-opened', value);

        if (this.searchHeader) {
            this.searchHeader.setAttribute('is-opened', value);
        }
    }

    private onOutsideClick(event: MouseEvent): void {
        if (!event.defaultPrevented) {
            Search.closeSearch();
        }
    }

    private initHost(): void {
        this.addEventListener('click', this.onOutsideClick);
    }

    private initSearchHeader(): void {
        this.searchHeader = this.root.querySelector('ctnr-search-header');
    }

    private afterInitialRender(): void {
        this.initHost();
        this.initSearchHeader();
    }

    private initialRender(): void {
        const templateTag = htmlToNode(template) as HTMLTemplateElement;
        const content = getTemplateContent(templateTag);

        this.root.appendChild(content);
    }
}

export default CtnrSearch;