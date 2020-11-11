import { history } from '@core/helpers/history';

class UILink extends HTMLAnchorElement {
    public constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    public connectedCallback(): void {
        this.addEventListener('click', this.onClick);
    }

    private onClick(event: Event): void {
        event.preventDefault();

        const target = event.currentTarget as HTMLAnchorElement;

        if (target) {
            const replace = target.getAttribute('replace');
            const href = target.href;

            if (replace === 'true') {
                history.replace(href);
            } else {
                history.push(href);
            }
        }
    }
}

export default UILink;