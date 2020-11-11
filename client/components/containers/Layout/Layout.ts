import { PageConfig } from '@core/modules/Layout/types/LayoutPages';

class CtnrLayout extends HTMLElement {
    private layoutContent: HTMLDivElement | null = null;

    public constructor() {
        super();

        this.initLayoutContent();
    }

    public initPage(tag: PageConfig['tag']): void {
        if (this.layoutContent) {
            const pageElement = document.createElement(tag);

            this.layoutContent.appendChild(pageElement);
        }
    }

    public removePage(): void {
        if (this.layoutContent) {
            this.layoutContent.innerHTML = '';
        }
    }

    private initLayoutContent(): void {
        this.layoutContent = this.querySelector('.Layout__content');
    }
}

export default CtnrLayout;