import { PageConfig } from '@core/modules/Layout/types/LayoutPages';

import { CtnrLayout } from '@client/components/containers';
import { UILayoutLoader } from '@client/components/ui';

class LayoutUI {
    private layout: CtnrLayout | null = null;
    private layoutLoader: UILayoutLoader | null = null;

    public constructor() {
        this.initLayout();
        this.initLayoutLoader();
    }

    public startLoad(): void {
        if (this.layoutLoader) {
            this.layoutLoader.show();
        }
    }

    public stopLoad(): void {
        if (this.layout && this.layoutLoader) {
            this.layoutLoader.hide();
        }
    }

    public initPage(tag: PageConfig['tag']): void {
        if (this.layout) {
            this.layout.initPage(tag);
        }
    }

    public removePage(): void {
        if (this.layout) {
            this.layout.removePage();
        }
    }

    private initLayoutLoader(): void {
        this.layoutLoader = document.querySelector('ui-layout-loader');
    }

    private initLayout(): void {
        this.layout = document.querySelector('main[is="ctnr-layout"]');
    }
}

export default LayoutUI;