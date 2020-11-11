import { Search } from '@core/modules';

import { UIIcon } from '@components/ui';

import { getTemplateContent, htmlToNode, stopEventDefault } from '@core/helpers/dom';

import template from './SearchHeader.html';

type ObservedAttributes = 'is-opened' | 'current-query';

class CtnrSearchHeader extends HTMLElement {
    private root: ShadowRoot;

    private isOpened: boolean = false;

    private input: HTMLInputElement | null = null;
    private form: HTMLFormElement | null = null;
    private backIcon: UIIcon | null = null;

    public constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.closeSearch = this.closeSearch.bind(this);

        this.initialRender();
        this.afterInitialRender();
    }

    static get observedAttributes(): ObservedAttributes[] {
        return ['is-opened', 'current-query'];
    }

    public attributeChangedCallback(name: ObservedAttributes, _prevValue: string, value: string): void {
        switch (name) {
            case 'is-opened':
                this.isOpened = value === 'true';

                this.onIsOpenedChange();

                break;
            case 'current-query':
                this.onCurrentQueryChange(value);

                break;
        }
    }

    private closeSearch(): void {
        Search.closeSearch();
    }

    private onIsOpenedChange(): void {
        if (this.isOpened && this.input) {
            this.input.focus();
        }
    }

    private onCurrentQueryChange(query: string): void {
        if (this.input) {
            this.input.value = query;
        }
    }

    private onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim();

        Search.updateQuery(value);
    }

    private onFormSubmit(event: Event): void {
        event.preventDefault();

        Search.updateCurrentQuery();
    }

    private initHost(): void {
        this.addEventListener('click', stopEventDefault);
    }

    private initInput(): void {
        this.input = this.root.querySelector('.SearchHeader__input');

        if (this.input) {
            this.input.addEventListener('input', this.onInputChange);
        }
    }

    private initForm(): void {
        this.form = this.root.querySelector('.SearchHeader__form');

        if (this.form) {
            this.form.addEventListener('submit', this.onFormSubmit);
        }
    }

    private initBackIcon(): void {
        this.backIcon = this.root.querySelector('ui-icon[name="arrow"]');

        if (this.backIcon) {
            this.backIcon.addEventListener('click', this.closeSearch);
        }
    }

    private afterInitialRender(): void {
        this.initHost();
        this.initInput();
        this.initForm();
        this.initBackIcon();
    }

    private initialRender(): void {
        const templateTag = htmlToNode(template) as HTMLTemplateElement;
        const content = getTemplateContent(templateTag);

        this.root.appendChild(content);
    }
}

export default CtnrSearchHeader;