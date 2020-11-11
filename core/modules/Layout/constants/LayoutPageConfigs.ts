import { PageNames, PageTags, PageConfig } from '@core/modules/Layout/types/LayoutPages';

const PAGE_CONFIGS: Record<string, PageConfig> = {
    '/': {
        name: PageNames.Home,
        tag: PageTags.Home
    },

    '/trending': {
        name: PageNames.Trending,
        tag: PageTags.Trending
    }
};

export default PAGE_CONFIGS;