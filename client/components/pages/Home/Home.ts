import './Home.scss';

class PageHome extends HTMLElement {
    public constructor() {
        super();
    }

    public connectedCallback(): void {
        this.classList.add('Home'); // TODO когда будет SSR убрать, так как бэк пришлет уже готовый html
        
        this.renderItems();
    }

    private renderItems(): void {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 100; i++) {
            const item = document.createElement('div');

            item.innerText = `${i}`;
            item.classList.add('Home__item');

            fragment.appendChild(item);
        }

        this.appendChild(fragment);
    }
}

customElements.define('page-home', PageHome);

export default PageHome;