import { getTemplateContent, htmlToNode } from '@core/helpers/dom';

import template from './LayoutLoader.html';

class UILayoutLoader extends HTMLElement {
    private root: ShadowRoot;
    private template: string;

    public constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        this.template = template;

        this.initialRender();
    }

    public show(): void {
        this.setAttribute('hide', 'false');
    }

    public hide(): void {
        this.setAttribute('hide', 'true');
    }

    private initialRender(): void {
        const template = htmlToNode(this.template) as HTMLTemplateElement;
        const content = getTemplateContent(template);

        this.root.appendChild(content);
    }
}

export default UILayoutLoader;