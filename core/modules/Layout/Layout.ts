import LayoutUI from '@core/modules/Layout/LayoutUI';
import PAGE_CONFIGS from '@core/modules/Layout/constants/LayoutPageConfigs';
import { PageConfig } from '@core/modules/Layout/types/LayoutPages';

import { Match, matchPath, watchMatch } from '@core/helpers/history';

type ConstructorData = {
    ui: LayoutUI;
};

class Layout {
    private ui: LayoutUI;

    public constructor(data: ConstructorData) {
        const { ui } = data;

        this.ui = ui;

        this.initHistoryWatch();
    }

    private getPagePath(currentMatch: Match): string | null {
        for (const path in PAGE_CONFIGS) {
            const match = matchPath(path, currentMatch.path);
    
            if (match && match.isExact) {
                return path;
            }
        }

        return null;
    }

    private importPage(name: PageConfig['name']): Promise<any> {
        const promise = import(
            /* webpackChunkName: "[request]" */
            `@components/pages/${name}/${name}`
        );

        return promise;
    }

    private loadPage(currentMatch: Match): void {
        const path = this.getPagePath(currentMatch);

        this.ui.removePage();

        if (path) {
            const { name, tag } = PAGE_CONFIGS[path];

            this.ui.startLoad();

            this.importPage(name)
                .then(() => {
                    this.ui.initPage(tag);
                    this.ui.stopLoad();
                });
        }
    }

    private initHistoryWatch(): void {
        watchMatch(match => {
            this.loadPage(match);
        });
    }
}

export default Layout;