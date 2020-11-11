import { getTemplateContent, htmlToNode } from '@core/helpers/dom';

import template from './Container.html';

class CtnrContainer extends HTMLElement {
    private root: ShadowRoot;
    private template: string;

    public constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        this.template = template;
        
        this.initialRender();
    }

    private initialRender(): void {
        const template = htmlToNode(this.template) as HTMLTemplateElement;
        const content = getTemplateContent(template);

        this.root.appendChild(content);
    }
}

export default CtnrContainer;