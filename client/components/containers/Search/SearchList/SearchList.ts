import SearchDTO from '@core/modules/Search/SearchDTO';

import { getTemplateContent, htmlToNode } from '@core/helpers/dom';
import { getUpdatedSearchParams, history } from '@core/helpers/history';

import template from './SearchList.html';
import './SearchList.scss';

class CtnrSearchList extends HTMLUListElement {
    private itemTemplate: HTMLLIElement | null = null;

    public constructor() {
        super();

        this.initTemplate();
    }

    public renderSearches(searches: SearchDTO[]): void {
        if (this.itemTemplate) {
            const fragment = document.createDocumentFragment();

            for (const search of searches) {
                const { name } = search;

                const item = this.itemTemplate.cloneNode(true) as HTMLLIElement;
                const link = item.querySelector<HTMLAnchorElement>('.SearchList__itemLink');

                if (link) {
                    const search = { query: name };
                    const params = getUpdatedSearchParams(history.location, search, true);

                    link.href = `/results?${params}`;
                    link.textContent = name;

                    fragment.appendChild(item);
                }
            }

            this.innerHTML = '';
            this.appendChild(fragment);
        }
    }

    private initTemplate(): void {
        const templateTag = htmlToNode(template) as HTMLTemplateElement;
        const content = getTemplateContent(templateTag);
        
        this.itemTemplate = content.querySelector('.SearchList__item');
    }
}

export default CtnrSearchList;