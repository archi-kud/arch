import { getTemplateContent, htmlToNode } from '@core/helpers/dom';

import search from '@static/icons/search.svg';
import arrow from '@static/icons/arrow.svg';
import home from '@static/icons/home.svg';
import fire from '@static/icons/fire.svg';
import library from '@static/icons/library.svg';
import profile from '@static/icons/profile.svg';

import template from './Icon.html';

type IconNames = 'search' | 'arrow' | 'home' | 'fire' | 'library' | 'profile';

const iconTemplates: Record<IconNames, string> = {
    search,
    arrow,
    home,
    fire,
    library,
    profile
};

type ObservedAttributes = 'name';

class UIIcon extends HTMLElement {
    private root: ShadowRoot;
    private template: string;

    public constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        this.template = template;

        this.initialRender();
    }

    static get observedAttributes(): ObservedAttributes[] {
        return ['name'];
    }

    public attributeChangedCallback(name: ObservedAttributes, _prevValue: string, value: string): void {
        switch (name) {
            case 'name':
                this.updateIconTemplate(value as IconNames);

                break;
        }
    }

    private updateIconTemplate(name: IconNames): void {
        const template = iconTemplates[name];
        const svg = htmlToNode(template);

        if (svg) {
            svg.classList.add('Icon');

            if (this.root.firstChild) {
                this.root.replaceChild(svg, this.root.firstChild);
            } else {
                this.root.append(svg);
            }
        }
    }

    private initialRender(): void {
        const template = htmlToNode(this.template) as HTMLTemplateElement;
        const content = getTemplateContent(template);

        this.root.appendChild(content);
    }
}

export default UIIcon;