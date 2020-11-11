import './Trending.scss';

class PageTrending extends HTMLElement {
    public constructor() {
        super();
    }

    public connectedCallback(): void {
        this.classList.add('Trending'); // TODO когда будет SSR убрать, так как бэк пришлет уже готовый html
        
        this.renderItems();
    }

    private renderItems(): void {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 100; i++) {
            const item = document.createElement('div');

            item.innerText = `${i}`;
            item.classList.add('Trending__item');

            fragment.appendChild(item);
        }

        this.appendChild(fragment);
    }
}

customElements.define('page-trending', PageTrending);

export default PageTrending;