import { UILink } from '@client/components/ui';

import { watchMatch, Match, matchPath } from '@core/helpers/history';

import './BottomMenu.scss';

const LINK_ACTIVE_CLASSNAME = 'BottomMenu__link--active';

class CtnrBottomMenu extends HTMLDivElement {
    private links: UILink[] = []; 

    public connectedCallback(): void {
        this.getLinks();
    }

    private getLinks(): void {
        setTimeout(() => {
            this.links = [...this.querySelectorAll<UILink>('.BottomMenu__link')];

            this.initHistoryWatch();
        }, 0);
    }

    private setLinkActiveClassname(currentMatch: Match): void {
        this.links.forEach(link => {
            const href = link.getAttribute('href') ?? '';
            const match = matchPath(href, currentMatch.path);

            if (match && match.isExact) {
                link.classList.add(LINK_ACTIVE_CLASSNAME);
            } else {
                link.classList.remove(LINK_ACTIVE_CLASSNAME);
            }
        });
    }

    private initHistoryWatch(): void {
        watchMatch(match => {
            this.setLinkActiveClassname(match);
        });
    }
}

export default CtnrBottomMenu;